"use client";

import { motion } from "framer-motion";
import { ExternalLink, X } from "lucide-react";
import { useKeyDown } from "@/hooks/useKeyDown";
import { useScrollLock } from "@/hooks/useScrollLock";
import type { CertificationItem } from "@/types/certification";

interface CertificateModalProps {
  data: CertificationItem;
  onClose: () => void;
}

export default function CertificateModal({ data, onClose }: CertificateModalProps) {
  useScrollLock();
  useKeyDown("Escape", onClose);

  if (!data.attachment) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 8 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-lg glass rounded-2xl overflow-hidden flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-4 p-4 border-b border-border/40 shrink-0">
          <div>
            <p className="text-sm font-semibold leading-tight">{data.name}</p>
            <p className="text-xs text-muted-foreground font-mono">{data.date}</p>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <a
              href={data.attachment.url}
              target="_blank"
              rel="noopener noreferrer"
              title="새 탭에서 열기"
              className="w-7 h-7 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all border border-border/40 hover:border-border"
            >
              <ExternalLink size={13} />
            </a>
            <button
              type="button"
              onClick={onClose}
              className="w-7 h-7 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all border border-border/40 hover:border-border"
            >
              <X size={14} />
            </button>
          </div>
        </div>

        {/* Preview */}
        <div className="flex-1 overflow-y-auto bg-black/20">
          {data.attachment.type === "image" ? (
            // biome-ignore lint: next/image 대신 원본 파일을 그대로 미리보기
            <img src={data.attachment.url} alt={`${data.name} 증명서`} className="w-full h-auto" />
          ) : (
            <iframe
              src={data.attachment.url}
              title={`${data.name} 증명서`}
              className="w-full h-[70vh]"
            />
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
