"use client";

import { logout } from "@/lib/auth";
import { useSession } from "next-auth/react";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const { data: session } = useSession();
  return (
    <nav className="bg-primary shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href={"/"} className="flex items-center">
              <span className="text-2xl font-extrabold tracking-wide text-white">
                Job<span className="text-accent">ly</span>
              </span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <ThemeToggle />

            <Link
              href={"/jobs"}
              className="text-white/80 hover:text-white hover:bg-white/10 transition-colors px-3 py-2 rounded-md text-sm font-medium"
            >
              Browse Jobs
            </Link>
            {session ? (
              <>
                <Link
                  href={"/jobs/post"}
                  className="text-white/80 hover:text-white hover:bg-white/10 transition-colors  px-3 py-2 rounded-md text-sm font-medium"
                >
                  Post a Job
                </Link>
                <Link
                  href={"/dashboard"}
                  className="text-white/80 hover:text-white hover:bg-white/10 transition-colors  px-3 py-2 rounded-md text-sm font-medium"
                >
                  Dashboard
                </Link>
                <button
                  onClick={logout}
                  className="text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer  px-3 py-2 rounded-md text-sm font-medium"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                href={"/auth/signin"}
                className="text-white/80 hover:text-white hover:bg-white/10 transition-colors  px-3 py-2 rounded-md text-sm font-medium"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
