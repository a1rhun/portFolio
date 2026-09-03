import Image from "next/image";
import ActivitiesSection from "@/components/common/ActivitiesSection";
import AnimatedSection from "@/components/common/AnimatedSection";
import CertificationsSection from "@/components/common/CertificationsSection";
import ContactSection from "@/components/common/ContactSection";
import { certifications } from "@/components/common/data/certificationsData";
import { whatIDo } from "@/components/common/data/homeData";
import HeroSection from "@/components/common/HeroSection";
import ParticleBackground from "@/components/common/ParticleBackground";
import ProjectsSection from "@/components/common/ProjectsSection";
import SkillsSection from "@/components/common/SkillsSection";
import WhatIDoCard from "@/components/common/WhatIDoCard";
import { getActivities, getProjects } from "@/lib/notion";

export const revalidate = 3600;

export default async function Home() {
  const [projects, activities] = await Promise.all([getProjects(), getActivities()]);

  return (
    <div className="min-h-screen">
      <ParticleBackground />
      <HeroSection />

      {/* ── About ─────────────────────────────────────────── */}
      <section id="about" className="py-24 px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <AnimatedSection className="mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
              사용자를 먼저 생각하는
              <br />
              <span className="gradient-text">프론트엔드 개발자</span>
            </h2>
          </AnimatedSection>

          {/* Profile + Bio */}
          <AnimatedSection className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-12 mb-20 items-start">
            {/* Profile image */}
            <div className="flex flex-col items-center md:items-start">
              <div className="relative">
                <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-accent/20 via-accent2/10 to-transparent blur-2xl pointer-events-none" />
                <div className="relative w-[200px] h-[240px] md:w-[240px] md:h-[300px] rounded-2xl overflow-hidden ring-1 ring-accent/25 shadow-xl shadow-black/40">
                  <Image
                    src="/profile.jpg"
                    alt="공기훈 프로필 사진"
                    fill
                    className="object-cover object-top"
                    sizes="(min-width: 768px) 240px, 200px"
                  />
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="flex flex-col gap-5">
              <div className="relative pl-5 border-l-2 border-accent/40">
                <p className="text-foreground/75 text-base leading-[1.9] tracking-wide">
                  안녕하세요,{" "}
                  <span className="text-accent font-semibold">프론트엔드 개발자 공기훈</span>
                  입니다. 사용자의 입장에서 생각하고, 더 나은 경험을 만들기 위해 고민합니다. React와
                  Next.js를 중심으로 모던 웹 개발에 집중하고 있으며, 깔끔한 코드와 접근성을 중시하는
                  개발을 지향합니다. 새로운 기술을 배우는 것을 즐기며, 꾸준한 성장을 목표로 합니다.
                </p>
              </div>

              {/* 구직 중 칩 */}
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium text-emerald-400 bg-emerald-400/10 border border-emerald-400/25">
                  <span className="relative flex h-1.5 w-1.5 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
                  </span>
                  구직 중
                </span>
              </div>

              {/* 자격증 */}
              <CertificationsSection items={certifications} />
            </div>
          </AnimatedSection>

          {/* What I Do */}
          <div>
            <AnimatedSection className="mb-10">
              <h3 className="text-3xl font-bold">이렇게 일합니다</h3>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
              {whatIDo.map((item, i) => (
                <WhatIDoCard key={item.title} {...item} index={i} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Projects ──────────────────────────────────────── */}
      <ProjectsSection initialProjects={projects} />

      {/* ── Activities ────────────────────────────────────── */}
      <ActivitiesSection initialActivities={activities} />

      <SkillsSection />

      {/* ── Contact ───────────────────────────────────────── */}
      <ContactSection />
    </div>
  );
}
