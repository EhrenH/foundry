import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-foundry-mist px-8 py-12 md:px-16">
      <div className="max-w-[1200px] mx-auto flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
        <div className="flex flex-col gap-2">
          <span className="text-foundry-ochre font-medium text-lg tracking-tight">
            foundry
          </span>
          <p className="text-foundry-stone text-sm">
            For ambitious businesses, everywhere.
          </p>
        </div>

        <div className="flex flex-col gap-3 md:items-end">
          <Link
            href="/contact"
            className="text-foundry-ink text-sm hover:text-foundry-stone transition-colors duration-300"
          >
            Contact us
          </Link>
          <div className="flex gap-6">
            <Link href="/expertise" className="text-foundry-stone text-sm hover:text-foundry-ink transition-colors duration-300">
              Expertise
            </Link>
            <Link href="/insights" className="text-foundry-stone text-sm hover:text-foundry-ink transition-colors duration-300">
              Insights
            </Link>
            <Link href="/about" className="text-foundry-stone text-sm hover:text-foundry-ink transition-colors duration-300">
              About
            </Link>
            <Link href="/book" className="text-foundry-stone text-sm hover:text-foundry-ink transition-colors duration-300">
              Book
            </Link>
            {/* Referral programme — hidden pending business decision
            <Link href="/refer" className="text-foundry-stone text-sm hover:text-foundry-ink transition-colors duration-300">
              Refer & earn
            </Link>
            */}
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto mt-10 pt-6 border-t border-foundry-mist">
        <p className="text-foundry-stone text-xs">
          © 2024 Foundry.
        </p>
      </div>
    </footer>
  );
}
