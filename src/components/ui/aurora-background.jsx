"use client";
import { cn } from "../../lib/utils";
import React from "react";

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  ...props
}) => {
  return (
    <div
      className={cn(
        "relative w-full bg-gradient-to-b from-blue-50 to-gray-50",
        className
      )}
      {...props}
    >
      <div
        className="absolute inset-0 overflow-hidden"
        style={{
          "--aurora":
            "repeating-linear-gradient(100deg, #e0f2fe 10%, #f8fafc 15%, #f0f9ff 20%, #f1f5f9 25%, #e0e7ff 30%)",
          "--dark-gradient":
            "repeating-linear-gradient(100deg, #000 0%, #000 7%, transparent 10%, transparent 12%, #000 16%)",
          "--white-gradient":
            "repeating-linear-gradient(100deg, #fff 0%, #fff 7%, transparent 10%, transparent 12%, #fff 16%)",
          "--light-blue": "#e0f2fe",
          "--white": "#f8fafc",
          "--sky-blue": "#f0f9ff",
          "--light-gray": "#f1f5f9",
          "--pale-indigo": "#e0e7ff",
          "--black": "#000",
          "--transparent": "transparent"
        }}
      >
        <div
          className={cn(
            `after:animate-aurora pointer-events-none absolute -inset-[10px] 
            [background-image:var(--white-gradient),var(--aurora)] 
            [background-size:300%,_200%] 
            [background-position:50%_50%,50%_50%] 
            opacity-20 blur-[30px] filter 
            will-change-transform 
            [--aurora:repeating-linear-gradient(100deg,var(--light-blue)_10%,var(--white)_15%,var(--sky-blue)_20%,var(--light-gray)_25%,var(--pale-indigo)_30%)] 
            [--dark-gradient:repeating-linear-gradient(100deg,var(--black)_0%,var(--black)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--black)_16%)] 
            [--white-gradient:repeating-linear-gradient(100deg,var(--white)_0%,var(--white)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--white)_16%)] 
            after:absolute after:inset-0 
            after:[background-image:var(--white-gradient),var(--aurora)] 
            after:[background-size:200%,_100%] 
            after:[background-attachment:fixed] 
            after:mix-blend-soft-light 
            after:animate-pulse-slow
            after:content-[""] 
            dark:[background-image:var(--dark-gradient),var(--aurora)] 
            dark:opacity-30
            dark:invert-0 
            after:dark:[background-image:var(--dark-gradient),var(--aurora)]`,
            showRadialGradient &&
              `[mask-image:radial-gradient(ellipse_at_100%_0%,black_20%,var(--transparent)_70%)]`
          )}
        ></div>
      </div>
      {children}
    </div>
  );
};