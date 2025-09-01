'use client';

import React from "react";
import { Button } from "@material-tailwind/react";

type ButtonProps = {
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset" | undefined;
};


export default function ButtonTailwind({ children, className = '', onClick, type = "button" }: ButtonProps) {

  return (
    <Button
      className={
        `rounded-full border
        text-sm sm:text-base py-2 px-4
        hover:cursor-pointer
        ${className || ''}`
      }
      onClick={onClick}
      type={type}

    >
      {children}
    </Button>
  );
}