"use client";

import { useEffect, useState } from "react";

// The contact page is static; the form's result comes back as ?sent=1 or
// ?error=... and is read here, in the browser.
const MESSAGES = {
  sent: "Thank you. Your message is with us and a person will reply within one business day.",
  missing: "Please add your name and a few lines about the project.",
  email: "That email address does not look right. Please check it and try again.",
  send: "We could not send your message just now. Please email hello@meritbyte.com instead, or try again in a few minutes."
};

export default function FormStatus() {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("sent") === "1") setStatus({ ok: true, text: MESSAGES.sent });
    else if (params.get("error")) {
      setStatus({ ok: false, text: MESSAGES[params.get("error")] || MESSAGES.send });
    }
  }, []);

  if (!status) return null;
  return (
    <p className={status.ok ? "form-status form-status--ok" : "signup__error"} role={status.ok ? "status" : "alert"}>
      {status.text}
    </p>
  );
}
