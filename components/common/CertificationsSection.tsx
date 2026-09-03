"use client";

import { AnimatePresence } from "framer-motion";
import { Paperclip } from "lucide-react";
import { useState } from "react";
import type { CertificationItem } from "@/types/certification";
import CertificateModal from "./CertificateModal";

interface Props {
  items: CertificationItem[];
}

export default function CertificationsSection({ items }: Props) {
  const [selected, setSelected] = useState<CertificationItem | null>(null);

  return (
    <div>
      <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-3">
        Certifications
      </p>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => {
          const clickable = Boolean(item.attachment);
          return (
            <button
              key={item.name}
              type="button"
              disabled={!clickable}
              onClick={() => clickable && setSelected(item)}
              className={`flex items-center gap-2.5 px-3.5 py-2 rounded-xl border text-left transition-colors ${
                clickable
                  ? "bg-accent/5 border-accent/20 hover:border-accent/40 hover:bg-accent/10 cursor-pointer"
                  : "bg-accent2/5 border-accent2/20 border-dashed cursor-default"
              }`}
            >
              <div>
                <p className="text-sm font-semibold leading-tight">{item.name}</p>
                <p className="text-xs text-muted-foreground font-mono">{item.date}</p>
              </div>
              {clickable && <Paperclip size={13} className="text-accent/70 shrink-0" />}
            </button>
          );
        })}
      </div>

      <AnimatePresence>
        {selected && <CertificateModal data={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </div>
  );
}
