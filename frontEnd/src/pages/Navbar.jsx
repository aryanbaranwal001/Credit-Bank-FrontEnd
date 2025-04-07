import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <div className="relative min-h-screen bg-black text-white flex justify-center p-4 box-border">
        <nav className="absolute top-0 w-full bg-transparent text-white px-8 pt-7 ">
          <div className="max-w-7xl mx-auto flex items-center justify-between relative">
            <div className="absolute left-0 flex items-center gap-2">
              <span className="font-semibold text-lg">Wind</span>
            </div>

            {/* Center - Links */}
            <div className="mx-auto flex gap-8 text-md font-bold">
              <NavLink
                to="/markets"
                className={({ isActive }) =>
                  isActive
                    ? "text-pink-400 transition"
                    : "text-zinc-300 hover:text-pink-400 transition"
                }
              >
                Borrow
              </NavLink>
              <NavLink
                to="/governance"
                className={({ isActive }) =>
                  isActive
                    ? "text-pink-400 transition"
                    : "text-zinc-300 hover:text-pink-400 transition"
                }
              >
                Repay
              </NavLink>
              <NavLink
                to="/docs"
                className={({ isActive }) =>
                  isActive
                    ? "text-pink-400 transition"
                    : "text-zinc-300 hover:text-pink-400 transition"
                }
              >
                History
              </NavLink>
            </div>

            {/* Right - App Button */}
            <div className="absolute right-0">
              <button className="hover:bg-pin-800 text-white border border-zinc-700 px-5 py-1.5 rounded-full bg-zinc-700 transition">
                App
              </button>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};
export default Navbar;
