"use client";

export default function CalEmbed({ calLink }: { calLink: string }) {
  return (
    <iframe
      src={`https://cal.com/${calLink}?embed=true&theme=light&brandColor=C9A96E&hideEventTypeDetails=true`}
      style={{
        width: "100%",
        height: 700,
        border: "none",
        borderRadius: 8,
      }}
      title="Book a call with Foundry"
    />
  );
}
