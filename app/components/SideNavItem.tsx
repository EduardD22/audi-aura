import Link from "next/link";
import React from "react";
import { IconType } from "react-icons";
import { twMerge } from "tailwind-merge";

interface SideNavProps {
  icon: IconType;
  label: string;
  active?: boolean;
  href: string;
}

const SideNavItem: React.FC<SideNavProps> = ({
  icon: Icon,
  label,
  active,
  href,
}) => {
  return (
    <Link
      href={href}
      className={twMerge(
        `
        flex
        flex-row
        h-auto
        items-center
        w-full
        gap-x-4
        text-md
        
        cursor-pointer
        hover:text-accent
        transition
        text-text
        py-1
      `,
        active && "text-accent font-medium"
      )}
    >
      <Icon size={26} className="text-accent" />
      <p className="truncate w-full">{label}</p>
    </Link>
  );
};

export default SideNavItem;
