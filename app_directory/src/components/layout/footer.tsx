import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-900">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between flex-col sm:flex-row">
          {/* Logo - centered on mobile */}
          <div className="w-full sm:w-auto flex justify-center sm:justify-start mb-4 sm:mb-0">
            <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
              <img
                src="/logos/gptchart.webp"
                className="h-8"
                alt="TradeMind Logo"
              />
              <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
                Trademind
              </span>
            </Link>
          </div>

          {/* Navigation Links - centered on mobile */}
          <ul className="w-full sm:w-auto flex flex-wrap justify-center gap-4 sm:gap-6 text-sm font-medium text-gray-400 mb-6 sm:mb-0">
            <li>
              <Link href="/about" className="hover:underline hover:text-white transition-colors">
                About
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:underline hover:text-white transition-colors">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:underline hover:text-white transition-colors">
                Terms
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:underline hover:text-white transition-colors">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <hr className="my-6 sm:mx-auto border-gray-700 lg:my-8" />

        {/* Copyright - centered on all screens */}
        <div className="w-full text-center">
          <span className="text-sm text-gray-400">
            © 2025{" "}
            <Link href="/" className="hover:underline hover:text-white transition-colors">
              Trademind™
            </Link>
            . All Rights Reserved.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;