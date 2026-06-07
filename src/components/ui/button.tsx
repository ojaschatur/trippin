import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "border border-white/10 bg-[linear-gradient(135deg,#7c3aed_0%,#3b82f6_52%,#ec4899_100%)] text-white shadow-[0_18px_40px_-18px_rgba(59,130,246,0.75)] hover:-translate-y-0.5 hover:shadow-[0_22px_50px_-16px_rgba(124,58,237,0.65)] hover:brightness-110 active:translate-y-0",
        outline:
          "border border-white/20 bg-white/5 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-xl hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/10 hover:shadow-[0_18px_40px_-20px_rgba(0,0,0,0.7)]",
        ghost: "text-zinc-300 hover:text-white hover:bg-white/5",
        subtle:
          "border border-white/[0.08] bg-white/[0.04] text-zinc-200 backdrop-blur-xl hover:bg-white/[0.08] hover:text-white",
      },
      size: {
        default: "h-10 px-5",
        sm: "h-8 px-4 text-xs",
        lg: "h-12 px-7 text-sm",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
