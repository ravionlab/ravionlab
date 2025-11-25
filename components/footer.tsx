export function Footer() {
  const navigation = [
    { label: "Capabilities", href: "#capabilities" },
    { label: "Research Philosophy", href: "#research" },
    { label: "Creator Lab", href: "#creators" },
    { label: "Business Solutions", href: "#business" },
    { label: "Contact", href: "#contact" },
  ]

  const resources = [
    { label: "Documentation", href: "#" },
    { label: "API Access", href: "#" },
    { label: "Research Papers", href: "#" },
    { label: "Case Studies", href: "#" },
    { label: "Blog", href: "#" },
  ]

  const social = [
    { label: "Twitter / X", href: "#" },
    { label: "LinkedIn", href: "#" },
    { label: "GitHub", href: "#" },
    { label: "Discord", href: "#" },
  ]

  return (
    <footer className="relative border-t border-[#0A21C0]/20">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <a href="#" className="text-xl font-bold tracking-tight">
              <span className="gradient-text">RAVION</span>
              <span className="text-[#B3B4BD]"> LAB</span>
            </a>
            <p className="mt-4 text-sm text-[#B3B4BD]/50">Building the intelligence layer of the future.</p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm font-semibold text-[#F5F7FA] mb-4">Navigation</h4>
            <ul className="space-y-3">
              {navigation.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-[#B3B4BD]/50 hover:text-[#D9B08C] transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-semibold text-[#F5F7FA] mb-4">Resources</h4>
            <ul className="space-y-3">
              {resources.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-[#B3B4BD]/50 hover:text-[#D9B08C] transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-sm font-semibold text-[#F5F7FA] mb-4">Connect</h4>
            <ul className="space-y-3">
              {social.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-[#B3B4BD]/50 hover:text-[#D9B08C] transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-[#B3B4BD]/10">
          <p className="text-sm text-[#B3B4BD]/60 mb-4">
            Have a question? Reach out to us at:{" "}
            <a
              href="mailto:ravionlab.tech@gmail.com"
              className="text-[#22D3EE] hover:text-[#3B82F6] transition-colors font-semibold"
            >
              ravionlab.tech@gmail.com
            </a>
          </p>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-[#B3B4BD]/40">© 2025 Ravion Lab. Building the intelligence layer.</p>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-[#B3B4BD]/40 hover:text-[#B3B4BD]/60 transition-colors">
              Privacy
            </a>
            <a href="#" className="text-sm text-[#B3B4BD]/40 hover:text-[#B3B4BD]/60 transition-colors">
              Terms
            </a>
            <a href="#" className="text-sm text-[#B3B4BD]/40 hover:text-[#B3B4BD]/60 transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
