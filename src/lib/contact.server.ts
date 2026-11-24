import type { ContactInput } from "./contact.schema";

const OWNER_EMAIL = "girimahendra7989@gmail.com";
const GATEWAY_URL = "https://connector-gateway.lovable.dev/resend";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Emails the submission to the portfolio owner through Resend.
 * Returns false (without throwing) when Resend isn't connected yet.
 */
export async function notifyOwner(input: ContactInput): Promise<boolean> {
  const lovableKey = process.env["LOVABLE_API_KEY"];
  const resendKey = process.env["RESEND_API_KEY"];
  if (!lovableKey || !resendKey) return false;

  const html = `
    <div style="font-family:Arial,sans-serif;font-size:14px;color:#111827;line-height:1.6">
      <h2 style="margin:0 0 12px">New portfolio message</h2>
      <p><strong>Name:</strong> ${escapeHtml(input.fullName)}</p>
      <p><strong>Email:</strong> ${escapeHtml(input.email)}</p>
      <p><strong>Subject:</strong> ${escapeHtml(input.subject)}</p>
      <p style="white-space:pre-wrap;border-left:3px solid #4169E1;padding-left:12px">${escapeHtml(input.message)}</p>
    </div>`;

  const res = await fetch(`${GATEWAY_URL}/emails`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${lovableKey}`,
      "X-Connection-Api-Key": resendKey,
    },
    body: JSON.stringify({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: [OWNER_EMAIL],
      reply_to: input.email,
      subject: `Portfolio: ${input.subject}`,
      html,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    console.error(`Resend request failed [${res.status}]: ${body}`);
    return false;
  }
  return true;
}
