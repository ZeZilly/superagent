import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-blue-950 text-white py-8 border-t border-blue-900">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <h3 className="text-lg font-bold">A-IdentityZ</h3>
            <p className="text-sm text-blue-200">
              Create your virtual identity on the blockchain, participate in the decentralized world, and earn rewards through gamified experiences.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-3">Ecosystem</h3>
            <ul className="space-y-2">
              <li>
                <Link className="text-sm text-blue-200 hover:text-white" href="/dashboard">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link className="text-sm text-blue-200 hover:text-white" href="/identity">
                  Identity
                </Link>
              </li>
              <li>
                <Link className="text-sm text-blue-200 hover:text-white" href="/marketplace">
                  Marketplace
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-3">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link className="text-sm text-blue-200 hover:text-white" href="/docs">
                  Documentation
                </Link>
              </li>
              <li>
                <Link className="text-sm text-blue-200 hover:text-white" href="/whitepaper">
                  Whitepaper
                </Link>
              </li>
              <li>
                <Link className="text-sm text-blue-200 hover:text-white" href="/faq">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-3">Community</h3>
            <ul className="space-y-2">
              <li>
                <a
                  className="text-sm text-blue-200 hover:text-white"
                  href="https://twitter.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Twitter
                </a>
              </li>
              <li>
                <a
                  className="text-sm text-blue-200 hover:text-white"
                  href="https://discord.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Discord
                </a>
              </li>
              <li>
                <a
                  className="text-sm text-blue-200 hover:text-white"
                  href="https://telegram.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Telegram
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-blue-900 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-blue-300">&copy; {new Date().getFullYear()} A-IdentityZ. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link className="text-xs text-blue-300 hover:text-white" href="/privacy">
              Privacy Policy
            </Link>
            <Link className="text-xs text-blue-300 hover:text-white" href="/terms">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
