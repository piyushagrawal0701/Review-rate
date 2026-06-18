import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#f7f8fc] px-4 md:px-6 lg:px-8 mt-20">

      <div className="relative overflow-hidden rounded-t-[32px] bg-[#0b1020] max-w-7xl mx-auto">

        {/* Purple Glow */}

        <div className="absolute left-1/2 bottom-0 -translate-x-1/2 w-[700px] h-[300px] bg-purple-700 rounded-full blur-[180px] opacity-20" />

        <div className="relative px-8 md:px-12 lg:px-20 pt-16 pb-10">

          {/* Top */}

          <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr_1fr] gap-12">

            {/* Brand */}

            <div>

              <div className="flex items-center gap-3">

                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-fuchsia-600 to-blue-700 flex items-center justify-center text-white font-bold text-xl">
                  ★
                </div>

                <h2 className="text-3xl font-bold text-white">
                  Review
                  <span className="text-purple-500">&</span>
                  Rate
                </h2>

              </div>

              <p className="mt-6 text-gray-400 leading-8 max-w-md">
                Discover trusted company reviews, share
                experiences, compare ratings and help
                others make better decisions through
                community-driven feedback.
              </p>

            </div>

            {/* Navigation */}

            <div>

              <h3 className="text-white font-semibold text-lg mb-6">
                Navigation
              </h3>

              <ul className="space-y-4 text-gray-400">

                <li>
                  <Link
                    to="/"
                    className="hover:text-white transition"
                  >
                    Home
                  </Link>
                </li>

                <li>
                  <Link
                    to="/login"
                    className="hover:text-white transition"
                  >
                    Login
                  </Link>
                </li>

                <li>
                  <Link
                    to="/register"
                    className="hover:text-white transition"
                  >
                    Register
                  </Link>
                </li>

              </ul>

            </div>

            {/* Features */}

            <div>

              <h3 className="text-white font-semibold text-lg mb-6">
                Features
              </h3>

              <ul className="space-y-4 text-gray-400">

                <li>Company Listings</li>

                <li>Ratings & Reviews</li>

                <li>Search & Filters</li>

                <li>Cloudinary Uploads</li>

                <li>Secure Authentication</li>

              </ul>

            </div>

          </div>

          {/* Divider */}

          <div className="border-t border-white/10 mt-14 pt-8">

            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">

              <p className="text-gray-500 text-center lg:text-left">
                © 2026 Review & Rate. Designed &
                Developed by Piyush Agrawal.
              </p>

              <div className="flex items-center gap-8 text-gray-400">

                <a
                  href="https://github.com/piyushagrawal0701"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition"
                >
                  GitHub
                </a>

                <a
                  href="https://www.linkedin.com/in/piyushagrawal0701/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition"
                >
                  LinkedIn
                </a>

                <a
                  href="https://piyushportfolio7.netlify.app"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition"
                >
                  Portfolio
                </a>

              </div>

            </div>

          </div>

          {/* Huge Text */}

          <div className="mt-16">

            <h1 className="text-center font-extrabold sm:text-[clamp(4rem,12vw,9rem)] text-[clamp(2rem,6vw,4rem)] text-transparent opacity-[0.3] select-none">
              <span
                style={{
                  WebkitTextStroke:
                    "1px rgba(255,255,255,0.5)",
                }}
              >
                REVIEW&RATE
              </span>
            </h1>

          </div>

        </div>

      </div>

    </footer>
  );
};

export default Footer;