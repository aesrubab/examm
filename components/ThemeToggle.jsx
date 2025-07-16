"use client";
import { useEffect, useState } from "react";
import { useThemeStore } from "../store";

const ThemeToggle = () => {
  const isDark = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.themeToggle);

  return (
    <button
      onClick={toggleTheme}
      className={`w-[58px] h-[28px] rounded-full ${
        isDark ? "bg-[#4A6AFB]" : "bg-gray-400"
      } relative transition-colors duration-350`}
      aria-label="Toggle theme"
      type="button"
    >
      <span
        className={`block w-[22px] h-[22px] rounded-full bg-white absolute top-[3px] transition-all duration-350 ${
          isDark ? "left-[31px]" : "left-[4px]"
        }`}
      />
    </button>
  );
};

export default ThemeToggle;
