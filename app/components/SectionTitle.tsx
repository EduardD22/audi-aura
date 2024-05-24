import React from "react";
import { IconType } from "react-icons";
import { HiDotsVertical } from "react-icons/hi";

export interface SectionTitleProps {
  title: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title }) => {
  return (
    <div className=" p-6 flex justify-between items-center">
      <h2 className="text-2xl font-bold">{title}</h2>

      <HiDotsVertical className="text-accent" />
    </div>
  );
};

export default SectionTitle;
