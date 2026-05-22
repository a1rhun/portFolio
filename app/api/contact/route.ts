import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const TO_EMAIL = "gongja124@gmail.com";

export async function POST(req: Request) {
  const { subject, message, from } = await req.json();

  if (!subject?.trim() || !message?.trim()) {
    return NextResponse.json({ error: "제목과 본문을 입력해주세요." }, { status: 400 });
  }

  const { error } = await resend.emails.send({
    from: "Portfolio Contact <onboarding@resend.dev>",
    to: TO_EMAIL,
    subject: `[포트폴리오 문의] ${subject}`,
    text: `보낸 사람: ${from || "익명"}\n\n${message}`,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
