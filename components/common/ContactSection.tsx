"use client";

import { CheckCircle, Loader2, Mail, Send, XCircle } from "lucide-react";
import { useState } from "react";
import AnimatedSection from "@/components/common/AnimatedSection";

type Status = "idle" | "loading" | "success" | "error";

export default function ContactSection() {
  const [subject, setSubject] = useState("");
  const [from, setFrom] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject, from, message }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || "이메일 전송에 실패했습니다.");
        setStatus("error");
        return;
      }
      setStatus("success");
      setSubject("");
      setFrom("");
      setMessage("");
    } catch {
      setErrorMsg("네트워크 오류가 발생했습니다.");
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-24 px-4 relative z-10">
      <div className="max-w-2xl mx-auto w-full">
        <AnimatedSection className="mb-12 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">함께 일해요</h2>
          <p className="text-muted-foreground text-lg">
            새로운 프로젝트나 기회에 대해 이야기 나눠요.
          </p>
        </AnimatedSection>

        <AnimatedSection>
          <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="from"
                className="text-xs font-mono text-muted-foreground uppercase tracking-widest"
              >
                보내는 분
              </label>
              <input
                id="from"
                type="text"
                placeholder="이름 또는 이메일 (선택)"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="subject"
                className="text-xs font-mono text-muted-foreground uppercase tracking-widest"
              >
                제목 <span className="text-destructive">*</span>
              </label>
              <input
                id="subject"
                type="text"
                placeholder="문의 제목을 입력해주세요"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="message"
                className="text-xs font-mono text-muted-foreground uppercase tracking-widest"
              >
                본문 <span className="text-destructive">*</span>
              </label>
              <textarea
                id="message"
                rows={6}
                placeholder="내용을 입력해주세요"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all resize-none"
              />
            </div>

            {status === "error" && (
              <div className="flex items-center gap-2 text-sm text-destructive">
                <XCircle size={16} />
                {errorMsg}
              </div>
            )}

            {status === "success" && (
              <div className="flex items-center gap-2 text-sm text-accent2">
                <CheckCircle size={16} />
                이메일이 성공적으로 전송되었습니다!
              </div>
            )}

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <div className="flex gap-3">
                <a
                  href="mailto:gongja124@naver.com"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border text-foreground text-sm font-medium hover:bg-foreground/5 transition-colors"
                >
                  <Mail size={15} />
                  직접 이메일
                </a>
                <a
                  href="https://www.linkedin.com/in/airhun"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border text-foreground text-sm font-medium hover:bg-foreground/5 transition-colors"
                >
                  LinkedIn
                </a>
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-gradient-accent text-white font-medium text-sm hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    전송 중...
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    이메일 보내기
                  </>
                )}
              </button>
            </div>
          </form>
        </AnimatedSection>
      </div>
    </section>
  );
}
