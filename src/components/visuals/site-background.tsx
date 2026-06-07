"use client";

import LineWaves from "@/components/visuals/line-waves";

export function SiteBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#05060a]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_28%),radial-gradient(circle_at_50%_-10%,rgba(56,189,248,0.24),transparent_24%),radial-gradient(circle_at_80%_20%,rgba(168,85,247,0.2),transparent_18%)]" />

      <div className="absolute inset-0 opacity-100">
        <LineWaves
          speed={0.24}
          innerLineCount={32}
          outerLineCount={36}
          warpIntensity={1.05}
          rotation={-45}
          edgeFadeWidth={0.08}
          colorCycleSpeed={0.7}
          brightness={0.16}
          color1="#ffffff"
          color2="#c4b5fd"
          color3="#7dd3fc"
          enableMouseInteraction={true}
          mouseInfluence={1.8}
        />
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(5,6,10,0.18)_0%,rgba(5,6,10,0.5)_40%,rgba(5,6,10,0.96)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_28%,rgba(5,6,10,0.58)_100%)]" />
    </div>
  );
}