import React from "react";

// tiny className join helper (so you don't need clsx)
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function Card({ className, children, ...props }) {
  return (
    <div
      className={cn(
        "max-w-md mx-auto rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-white/10 dark:bg-[#1d254f]/60",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className, children, ...props }) {
  return (
    <div
      className={cn(
        "flex flex-col space-y-1.5 p-6 border-b border-gray-100 dark:border-white/10",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardTitle({ className, children, ...props }) {
  return (
    <h3
      className={cn(
        "text-lg font-semibold leading-none tracking-tight text-gray-900 dark:text-white",
        className
      )}
      {...props}
    >
      {children}
    </h3>
  );
}

export function CardContent({ className, children, ...props }) {
  return (
    <div className={cn("p-6", className)} {...props}>
      {children}
    </div>
  );
}

/* Optional bonus (use if you want):
export function CardFooter({ className, children, ...props }) {
  return (
    <div
      className={cn(
        "p-6 pt-0 border-t border-gray-100 dark:border-white/10",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
*/
