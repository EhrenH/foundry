"use client";

import { useEffect, useRef } from "react";

export default function CalEmbed({ calLink }: { calLink: string }) {
  const loaded = useRef(false);

  useEffect(() => {
    if (loaded.current) return;
    loaded.current = true;

    const script = document.createElement("script");
    script.src = "https://app.cal.com/embed/embed.js";
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const Cal = (window as any).Cal;
      if (!Cal) return;
      Cal("init", { origin: "https://app.cal.com" });
      Cal("inline", {
        elementOrSelector: "#cal-booking-embed",
        calLink,
        layout: "month_view",
      });
      Cal("ui", {
        styles: { branding: { brandColor: "#C9A96E" } },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    };

    return () => {
      if (document.head.contains(script)) document.head.removeChild(script);
    };
  }, [calLink]);

  return (
    <div
      id="cal-booking-embed"
      style={{ width: "100%", minHeight: 600, overflow: "auto" }}
    />
  );
}
