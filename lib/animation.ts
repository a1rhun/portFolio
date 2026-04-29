// y: 140 → 32: 큰 translate는 페인트/합성 영역을 키워 모바일 jank 유발.
// 32px로 줄이면 동등한 시각 효과 + 합성 비용 대폭 감소.
export const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] as const },
  }),
};
