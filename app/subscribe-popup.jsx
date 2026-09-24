"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

import { CONSENT_TEXT } from "../lib/consent.mjs";

// The subscribe popup, mounted once in the root layout.
//
// It opens by itself after a short delay on ordinary pages, straight away on
// /subscribe, and whenever something marked data-open-subscribe is clicked.
// A visitor who closes it is not asked again for a week; one who subscribes
// is not asked again at all. That memory lives in localStorage, which can be
// missing or blocked, so every access is guarded and the popup still works
// without it (it simply asks again next visit).

const STORE_KEY = "meritbyte-subscribe";
const AUTO_OPEN_MS = 8000;
const SNOOZE_MS = 7 * 24 * 60 * 60 * 1000;
const NEVER_AUTO = ["/unsubscribe", "/free-website"];

const ERRORS = {
  business: "Please enter your business name.",
  email: "That email address does not look right. Please check it and try again.",
  consent: "Please tick the box to confirm you want to subscribe.",
  server: "We could not save your subscription just now. Please try again in a minute.",
  network: "We could not reach the server. Check your connection and try again."
};

function readState() {
  try {
    return JSON.parse(localStorage.getItem(STORE_KEY) || "{}") || {};
  } catch {
    return {};
  }
}

function writeState(state) {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(state));
  } catch {
    // Private mode or blocked storage: nothing to remember, nothing breaks.
  }
}

export default function SubscribePopup() {
  const pathname = usePathname() || "/";
  const dialogRef = useRef(null);
  const [status, setStatus] = useState("idle"); // idle | sending | done
  const [error, setError] = useState("");

  const open = useCallback(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();
  }, []);

  const close = useCallback(() => {
    const dialog = dialogRef.current;
    if (dialog && dialog.open) dialog.close();
  }, []);

  // Automatic opening.
  useEffect(() => {
    if (pathname === "/subscribe") {
      open();
      return undefined;
    }
    if (NEVER_AUTO.some((p) => pathname.startsWith(p))) return undefined;
    const saved = readState();
    if (saved.subscribed) return undefined;
    if (saved.dismissedAt && Date.now() - saved.dismissedAt < SNOOZE_MS) return undefined;
    const timer = setTimeout(open, AUTO_OPEN_MS);
    return () => clearTimeout(timer);
  }, [pathname, open]);

  // Any element with data-open-subscribe opens the popup.
  useEffect(() => {
    const onClick = (event) => {
      const trigger = event.target.closest?.("[data-open-subscribe]");
      if (!trigger) return;
      event.preventDefault();
      open();
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [open]);

  // Closing without subscribing (button, Esc or backdrop) snoozes it for a week.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return undefined;
    const onClose = () => {
      const saved = readState();
      if (!saved.subscribed) writeState({ ...saved, dismissedAt: Date.now() });
    };
    dialog.addEventListener("close", onClose);
    return () => dialog.removeEventListener("close", onClose);
  }, []);

  const onBackdrop = (event) => {
    if (event.target === dialogRef.current) close();
  };

  async function onSubmit(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const business = String(form.get("business") || "").trim();
    const email = String(form.get("email") || "").trim();
    const consent = form.get("consent") === "yes";

    if (!business) return setError(ERRORS.business);
    if (!/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(email)) return setError(ERRORS.email);
    if (!consent) return setError(ERRORS.consent);

    setError("");
    setStatus("sending");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ business, email, consent, website: form.get("website") || "" })
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        setStatus("idle");
        setError(ERRORS[data.error] || ERRORS.server);
        return;
      }
      writeState({ ...readState(), subscribed: true });
      setStatus("done");
    } catch {
      setStatus("idle");
      setError(ERRORS.network);
    }
  }

  return (
    <dialog
      ref={dialogRef}
      className="subscribe"
      aria-labelledby="subscribe-title"
      onClick={onBackdrop}
    >
      <div className="subscribe__box">
        <button type="button" className="subscribe__close" onClick={close} aria-label="Close">
          ×
        </button>

        {status === "done" ? (
          <div className="signup__state" role="status">
            <p className="label">Subscribed</p>
            <h2 id="subscribe-title">Thank you for subscribing.</h2>
            <p>
              We will email your business now and then with ideas for websites and apps. Every
              email has an unsubscribe link.
            </p>
            <button type="button" className="button" onClick={close}>
              Close
            </button>
          </div>
        ) : (
          <form className="signup__form" onSubmit={onSubmit} noValidate>
            <p className="label">Meritbyte Technologies</p>
            <h2 id="subscribe-title">Subscribe for website and app ideas</h2>
            <p className="subscribe__lead">
              Practical ideas for getting your business online, sent to your inbox. No spam.
            </p>

            {error ? (
              <p className="signup__error" role="alert">
                {error}
              </p>
            ) : null}

            <label>
              Business name
              <input
                name="business"
                type="text"
                maxLength={120}
                autoComplete="organization"
                autoFocus
                required
              />
            </label>
            <label>
              Email
              <input name="email" type="email" maxLength={254} autoComplete="email" required />
            </label>

            <label className="signup__trap" aria-hidden="true">
              Website
              <input name="website" type="text" tabIndex={-1} autoComplete="off" />
            </label>

            <label className="signup__consent">
              <input name="consent" type="checkbox" value="yes" required />
              <span>
                <strong>Are you sure you want to subscribe?</strong> {CONSENT_TEXT}
              </span>
            </label>

            <button type="submit" className="button" disabled={status === "sending"}>
              {status === "sending" ? "Subscribing…" : "Subscribe"}
            </button>
            <p className="signup__fine">
              We never sell or share your email. Unsubscribe any time from any email we send.
            </p>
          </form>
        )}
      </div>
    </dialog>
  );
}
