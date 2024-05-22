import React from "react";
import { IconType } from "react-icons";

export interface SectionTitleProps {
  title: string;
  Icon?: IconType;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title, Icon }) => {
  return (
    <div className=" p-6 flex justify-between items-center">
      <h2 className="text-2xl font-bold">{title}</h2>

      {Icon && <Icon className="text-accent" />}
    </div>
  );
};

export default SectionTitle;
