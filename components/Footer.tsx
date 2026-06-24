import Link from "next/link";
import { CONTACT_EMAIL } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="border-t border-foundry-mist px-8 py-12 md:px-16">
      <div className="max-w-[1200px] mx-auto flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
        <div className="flex flex-col gap-2">
          <span className="text-foundry-ochre font-medium text-lg tracking-tight">
            foundry
          </span>
          <p className="text-foundry-stone text-sm">
            Built in Cape Town. Made for businesses everywhere.
          </p>
        </div>

        <div className="flex flex-col gap-3 md:items-end">
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-foundry-ink text-sm hover:text-foundry-stone transition-colors duration-300"
          >
            {CONTACT_EMAIL}
          </a>
          <div className="flex gap-6">
            <Link href="/consulting" className="text-foundry-stone text-sm hover:text-foundry-ink transition-colors duration-300">
              Consulting
            </Link>
            <Link href="/web" className="text-foundry-stone text-sm hover:text-foundry-ink transition-colors duration-300">
              Web
            </Link>
            <Link href="/referral" className="text-foundry-stone text-sm hover:text-foundry-ink transition-colors duration-300">
              Referral
            </Link>
            <Link href="/book" className="text-foundry-stone text-sm hover:text-foundry-ink transition-colors duration-300">
              Book
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto mt-10 pt-6 border-t border-foundry-mist">
        <p className="text-foundry-stone text-xs">
          © {new Date().getFullYear()} Foundry
        </p>
      </div>
    </footer>
  );
}
