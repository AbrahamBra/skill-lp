import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { metier, repetes, clone, email, source } = data;

    const isAgence = source === "agence";

    const text = [
      isAgence ? `Nouveau lead Agence` : `Nouveau lead — Encode ton expertise`,
      ``,
      `Metier / contexte: ${metier}`,
      ...(repetes ? [`Ce qu'il repete: ${repetes}`] : []),
      ...(clone ? [`Clone ideal: ${clone}`] : []),
      `Email: ${email}`,
      ``,
      `Date: ${new Date().toISOString()}`,
    ].join("\n");

    if (resend) {
      await resend.emails.send({
        from: "Web Kit <onboarding@resend.dev>",
        to: "a.brakha@challengerslab.com",
        replyTo: email,
        subject: isAgence ? `Agence — ${metier}` : `Nouveau lead: ${metier}`,
        text,
      });
    } else {
      console.log("[contact] RESEND_API_KEY not set — logging form data:");
      console.log(text);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] Error:", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
