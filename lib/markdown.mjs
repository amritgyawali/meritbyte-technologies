// A small Markdown renderer for the content in /content.
//
// It supports exactly what the content style guide allows (content/README.md):
// ## and ### headings, paragraphs, - and 1. lists, pipe tables, > quotes,
// **bold**, *italic*, `code` and [links](/path). Anything else is either
// rendered as plain text or rejected by scripts/check-content.mjs, so the
// output stays predictable and there is no dependency to keep patched.

const FAQ_HEADING = /^frequently asked questions$/i;

export function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function slugify(text) {
  return String(text)
    .toLowerCase()
    .replace(/[`*_[\]()]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/[\s-]+/g, "-")
    .slice(0, 80);
}

// Markdown inline syntax removed, for headings in a table of contents, schema
// text and word counts.
export function plainText(markdown) {
  return String(markdown)
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .trim();
}

export function renderInline(text) {
  const codes = [];
  let out = String(text).replace(/`([^`]+)`/g, (_, code) => {
    codes.push(code);
    return `\u0000${codes.length - 1}\u0000`;
  });
  out = escapeHtml(out);
  out = out.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, label, href) => {
    const external = /^https?:\/\//.test(href);
    const attrs = external ? ' rel="noopener noreferrer" target="_blank"' : "";
    return `<a href="${href}"${attrs}>${label}</a>`;
  });
  out = out.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  out = out.replace(/(^|[^*\w])\*([^*\s][^*]*?)\*(?!\w)/g, "$1<em>$2</em>");
  return out.replace(/\u0000(\d+)\u0000/g, (_, i) => `<code>${escapeHtml(codes[i])}</code>`);
}

function splitRow(line) {
  return line
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => cell.trim());
}

// Turns Markdown into a list of blocks: { type, text | items | rows }.
export function parseBlocks(markdown) {
  const lines = String(markdown).replace(/\r\n?/g, "\n").split("\n");
  const blocks = [];
  let para = [];

  const flush = () => {
    if (para.length) blocks.push({ type: "p", text: para.join(" ") });
    para = [];
  };

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    const trimmed = line.trim();

    if (!trimmed) {
      flush();
      continue;
    }

    const heading = trimmed.match(/^(#{1,6})\s+(.*)$/);
    if (heading) {
      flush();
      blocks.push({ type: `h${heading[1].length}`, text: heading[2].trim() });
      continue;
    }

    if (/^[-*]\s+/.test(trimmed) || /^\d+[.)]\s+/.test(trimmed)) {
      flush();
      const ordered = /^\d/.test(trimmed);
      const items = [];
      while (i < lines.length) {
        const current = lines[i].trim();
        const match = ordered
          ? current.match(/^\d+[.)]\s+(.*)$/)
          : current.match(/^[-*]\s+(.*)$/);
        if (match) {
          items.push(match[1]);
        } else if (current && items.length && !/^(#|>|\|)/.test(current)) {
          // A wrapped line continues the previous item.
          items[items.length - 1] += ` ${current}`;
        } else {
          break;
        }
        i += 1;
      }
      i -= 1;
      blocks.push({ type: ordered ? "ol" : "ul", items });
      continue;
    }

    if (trimmed.startsWith("|")) {
      flush();
      const rows = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) {
        rows.push(lines[i].trim());
        i += 1;
      }
      i -= 1;
      const isRule = (row) => /^\|?\s*:?-{2,}:?\s*(\|\s*:?-{2,}:?\s*)*\|?$/.test(row);
      const body = rows.filter((row) => !isRule(row)).map(splitRow);
      const hasHead = rows.length > 1 && isRule(rows[1]);
      blocks.push({
        type: "table",
        head: hasHead ? body[0] : null,
        rows: hasHead ? body.slice(1) : body
      });
      continue;
    }

    if (trimmed.startsWith(">")) {
      flush();
      const quoted = [];
      while (i < lines.length && lines[i].trim().startsWith(">")) {
        quoted.push(lines[i].trim().replace(/^>\s?/, ""));
        i += 1;
      }
      i -= 1;
      blocks.push({ type: "quote", text: quoted.join(" ") });
      continue;
    }

    para.push(trimmed);
  }
  flush();
  return blocks;
}

function renderBlock(block) {
  switch (block.type) {
    case "p":
      return `<p>${renderInline(block.text)}</p>`;
    case "ul":
    case "ol":
      return `<${block.type}>${block.items
        .map((item) => `<li>${renderInline(item)}</li>`)
        .join("")}</${block.type}>`;
    case "quote":
      return `<blockquote><p>${renderInline(block.text)}</p></blockquote>`;
    case "table": {
      const head = block.head
        ? `<thead><tr>${block.head.map((c) => `<th scope="col">${renderInline(c)}</th>`).join("")}</tr></thead>`
        : "";
      const rows = block.rows
        .map((row) => `<tr>${row.map((c) => `<td>${renderInline(c)}</td>`).join("")}</tr>`)
        .join("");
      return `<div class="table-wrap"><table>${head}<tbody>${rows}</tbody></table></div>`;
    }
    default:
      return `<p>${renderInline(block.text || "")}</p>`;
  }
}

// Renders Markdown and returns the HTML with what the pages need around it:
// the headings (table of contents), the FAQ pairs (FAQPage schema) and a word
// count (reading time).
export function renderMarkdown(markdown) {
  const blocks = parseBlocks(markdown);
  const headings = [];
  const faqs = [];
  const ids = new Set();
  const html = [];
  let inFaq = false;
  let currentFaq = null;
  let words = 0;

  const uniqueId = (text) => {
    const base = slugify(plainText(text)) || "section";
    let id = base;
    let n = 2;
    while (ids.has(id)) id = `${base}-${n++}`;
    ids.add(id);
    return id;
  };

  const closeFaq = () => {
    if (inFaq) html.push("</section>");
    inFaq = false;
    currentFaq = null;
  };

  for (const block of blocks) {
    const text = block.text || (block.items || []).join(" ") || "";
    const tableText = block.type === "table" ? [block.head || [], ...block.rows].flat().join(" ") : "";
    words += plainText(text || tableText).split(/\s+/).filter(Boolean).length;

    if (block.type === "h2" || block.type === "h1") {
      closeFaq();
      const label = plainText(block.text);
      const id = FAQ_HEADING.test(label) ? uniqueId("faq") : uniqueId(block.text);
      headings.push({ level: 2, id, text: label });
      if (FAQ_HEADING.test(label)) {
        inFaq = true;
        html.push(`<section class="faq" aria-labelledby="${id}">`);
      }
      html.push(`<h2 id="${id}">${renderInline(block.text)}</h2>`);
      continue;
    }

    if (/^h[3-6]$/.test(block.type)) {
      const id = uniqueId(block.text);
      headings.push({ level: 3, id, text: plainText(block.text) });
      html.push(`<h3 id="${id}">${renderInline(block.text)}</h3>`);
      if (inFaq) {
        currentFaq = { question: plainText(block.text), answer: [] };
        faqs.push(currentFaq);
      }
      continue;
    }

    const rendered = renderBlock(block);
    if (currentFaq) currentFaq.answer.push(rendered);
    html.push(rendered);
  }
  closeFaq();

  return {
    html: html.join("\n"),
    headings,
    faqs: faqs.map((faq) => ({
      question: faq.question,
      answerHtml: faq.answer.join(""),
      answerText: faq.answer
        .join(" ")
        .replace(/<[^>]+>/g, "")
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/\s+/g, " ")
        .trim()
    })),
    words
  };
}
