"use client";

import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Comfortaa } from "next/font/google";

import {
  HiHome,
  HiChartBar,
  HiMusicNote,
  HiViewList,
  HiSun,
  HiMoon,
  HiDesktopComputer,
  HiLogout,
} from "react-icons/hi";
import Box from "./Box";
import SideNavItem from "./SideNavItem";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { signOut } from "next-auth/react";
import { useTheme } from "next-themes";
import Image from "next/image";

interface SideNavProps {
  children: React.ReactNode;
}

const comfortaa = Comfortaa({
  subsets: ["latin"],
});

const SideNav: React.FC<SideNavProps> = ({ children }) => {
  const { setTheme, theme } = useTheme();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const routes = useMemo(
    () => [
      {
        icon: HiHome,
        label: "Home",
        active: pathname === "/dashboard",
        href: "/dashboard",
      },
      {
        icon: HiChartBar,
        label: "Insights",
        active: pathname === "/dashboard/insights",
        href: "/dashboard/insights",
      },
      {
        icon: HiMusicNote,
        label: "Recommendations",
        active: pathname === "/dashboard/recommendations",
        href: "/dashboard/recommendations",
      },
      {
        icon: HiViewList,
        label: "Playlists",
        active: pathname === "/dashboard/playlists",
        href: "/dashboard/playlists",
      },
    ],
    [pathname]
  );

  return (
    <div className="flex flex-col md:flex-row h-full">
      {/* Mobile Navigation */}
      <nav
        className={twMerge(
          "md:hidden fixed top-0 left-0 right-0 z-10 flex flex-col items-center py-4 transition-all duration-300",
          isScrolled
            ? theme === "dark" || theme === "system"
              ? "bg-glass-dark"
              : "bg-glass-light"
            : "bg-secondary"
        )}
      >
        <div className="flex items-center justify-center h-12 mb-4">
          <div className={`${comfortaa.className} flex items-center `}>
            <Image src="/images/chart.svg" width={60} height={45} alt="logo" />
            <h1 className=" font-bold text-3xl text-primary">
              Audi
              <span className="text-accent font-bold text-3xl">Aura</span>
            </h1>
          </div>
        </div>
        <div className="flex justify-around w-full">
          {routes.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={twMerge(
                "flex flex-col items-center text-text hover:text-accent transition",
                item.active && "text-accent font-medium"
              )}
            >
              <item.icon size={24} className="text-accent" />
              <span className="text-xs mt-1">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex flex-col gap-y-2 h-screen text-text w-64 p-4  fixed top-0 left-0">
        <Box className="flex items-center justify-center h-16">
          <div className={`${comfortaa.className} flex items-center p-1`}>
            <Image src="/images/chart.svg" width={60} height={45} alt="logo" />
            <h1 className=" font-bold text-3xl text-primary">
              Audi
              <span className="text-accent font-bold text-3xl">Aura</span>
            </h1>
          </div>
        </Box>
        {routes.map((item) => (
          <Box key={item.label} className="px-4 py-2">
            <SideNavItem key={item.label} {...item} />
          </Box>
        ))}
        <Box children="" className="flex-grow"></Box>
        <Box className="flex items-center justify-around px-4 py-2 text-accent">
          <HiSun
            size={24}
            className="cursor-pointer"
            onClick={() => setTheme("light")}
          />
          <HiDesktopComputer
            size={24}
            className="cursor-pointer"
            onClick={() => setTheme("system")}
          />
          <HiMoon
            size={24}
            className="cursor-pointer"
            onClick={() => setTheme("dark")}
          />
        </Box>
        <Box className="px-4 py-2">
          <div className="flex items-center gap-x-4 text-md cursor-pointer hover:text-accent transition">
            <button
              className="flex gap-x-4"
              onClick={() =>
                signOut({
                  callbackUrl: "/",
                })
              }
            >
              <HiLogout size={24} className="text-accent" />
              Log out
            </button>
          </div>
        </Box>
      </nav>
      <main className="flex-1 p-4 md:ml-64 overflow-y-auto">
        <div className="mt-32 md:mt-0">{children}</div>
      </main>
    </div>
  );
};

export default SideNav;
