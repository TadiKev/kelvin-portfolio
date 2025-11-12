import React from "react";
import { ArrowUp } from "lucide-react";

export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="relative w-full border-t border-border bg-card py-8 px-6">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
        {/* Copyright */}
        <p className="text-sm text-muted-foreground">
          &copy; {year}{" "}
          <span className="font-semibold text-foreground">
            Kelvin Machaka
          </span>
          . All rights reserved.
        </p>

        {/* Scroll to top button */}
        <a
          href="#hero"
          className="p-3 rounded-full bg-primary/10 text-primary hover:bg-primary/20 hover:scale-110 transition-all duration-200"
          aria-label="Scroll to top"
        >
          <ArrowUp size={20} />
        </a>
      </div>
    </footer>
  );
};
