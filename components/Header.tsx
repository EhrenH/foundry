import Link from "next/link";

const navLinks = [
  { href: "/consulting", label: "Consulting" },
  { href: "/web", label: "Web" },
  { href: "/referral", label: "Referral" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-foundry-white border-b border-foundry-mist flex items-center justify-between px-8 py-5 md:px-16">
      <Link
        href="/"
        className="text-foundry-ochre font-medium text-xl tracking-tight"
      >
        foundry
      </Link>

      <nav className="hidden md:flex items-center gap-8">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-foundry-ink text-sm hover:text-foundry-stone transition-colors duration-300"
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <Link
        href="/book"
        className="bg-foundry-ochre text-white text-sm font-medium px-5 py-2.5 rounded-[6px] hover:bg-foundry-ochre-hover transition-colors duration-300"
      >
        Book a call →
      </Link>
    </header>
  );
}
