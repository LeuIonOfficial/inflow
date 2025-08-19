"use client";

import * as React from "react";
import { Moon, Sun, Palette } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const themes = [
  { name: "Default", value: "default", color: "oklch(0.488 0.243 264.376)" },
  { name: "Red", value: "red", color: "oklch(0.577 0.245 27.325)" },
  { name: "Orange", value: "orange", color: "oklch(0.646 0.222 41.116)" },
  { name: "Green", value: "green", color: "oklch(0.6 0.118 184.704)" },
  { name: "Blue", value: "blue", color: "oklch(0.398 0.07 227.392)" },
  { name: "Purple", value: "purple", color: "oklch(0.627 0.265 303.9)" },
];

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [, setAccentTheme] = React.useState("default");

  const handleAccentChange = (accent: string) => {
    setAccentTheme(accent);
    document.documentElement.setAttribute("data-accent", accent);
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="icon"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <Palette className="h-[1.2rem] w-[1.2rem]" />
            <span className="sr-only">Change accent color</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {themes.map((themeOption) => (
            <DropdownMenuItem
              key={themeOption.value}
              onClick={() => handleAccentChange(themeOption.value)}
              className="flex items-center gap-2"
            >
              <div
                className="h-4 w-4 rounded-full border"
                style={{ backgroundColor: themeOption.color }}
              />
              {themeOption.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
