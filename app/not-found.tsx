import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex-1 flex items-center justify-center px-8 py-[6rem] bg-foundry-white">
      <div className="max-w-[480px]">
        <p className="text-foundry-ochre text-xs font-medium tracking-[0.2em] uppercase mb-5">
          404
        </p>
        <h1 className="text-[3rem] font-medium tracking-[-0.025em] text-foundry-ink leading-[1.05] mb-4">
          This page doesn&rsquo;t exist.
        </h1>
        <p className="text-foundry-stone text-lg leading-relaxed mb-10">
          It may have moved, or the link might be wrong. Either way, let&rsquo;s get you somewhere useful.
        </p>
        <div className="flex gap-6 items-center">
          <Link
            href="/"
            className="bg-foundry-ink text-white text-sm font-medium px-5 py-3 rounded-[6px] hover:opacity-80 transition-opacity duration-200"
          >
            Back to home
          </Link>
          <Link
            href="/expertise"
            className="text-foundry-ink text-sm font-medium hover:text-foundry-stone transition-colors duration-200"
          >
            Explore Expertise
          </Link>
        </div>
      </div>
    </main>
  );
}
