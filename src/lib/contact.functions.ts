import { createServerFn } from "@tanstack/react-start";
import { contactPayloadSchema, isLikelyBot } from "./contact.schema";
import { notifyOwner } from "./contact.server";

export const submitContact = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => contactPayloadSchema.parse(data))
  .handler(async ({ data }) => {
    if (isLikelyBot(data)) {
      // Pretend nothing happened for bots, but store nothing.
      return { ok: true as const, emailed: false };
    }

    const { fullName, email, subject, message } = data;
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { data: row, error } = await supabaseAdmin
      .from("contact_submissions")
      .insert({ full_name: fullName, email, subject, message })
      .select("id")
      .single();

    if (error || !row) {
      console.error("contact insert failed", error);
      throw new Error("We couldn't save your message. Please try again or email me directly.");
    }

    let emailed = false;
    try {
      emailed = await notifyOwner({ fullName, email, subject, message });
    } catch (e) {
      console.error("contact email failed", e);
    }

    if (emailed) {
      await supabaseAdmin.from("contact_submissions").update({ email_delivered: true }).eq("id", row.id);
    }

    return { ok: true as const, emailed };
  });
