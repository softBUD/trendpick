"use client";

import * as React from "react";
import {cva, type VariantProps} from "class-variance-authority";
import {cn} from "@/lib/utils";

const Loader = ({size}: {size?: "sm" | "md" | "lg"}) => (
  <svg
    className={cn(
      "animate-spin",
      size === "sm" ? "h-3.5 w-3.5" : size === "lg" ? "h-5 w-5" : "h-4 w-4",
      "text-white"
    )}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
    ></path>
  </svg>
);

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand disabled:opacity-50 disabled:pointer-events-none",
  ],
  {
    variants: {
      size: {
        sm: "h-9 px-3 text-sm",
        md: "h-10 px-4 text-sm",
        lg: "h-11 px-6 text-base",
      },
      color: {
        default:
          "text-white max-h-[40px] p-2 bg-neutral-700 rounded-md w-24 hover:bg-brand-dark transition",
        error: "bg-btn-red text-white hover:bg-[#BC3434]",
        success: "bg-btn-green text-white hover:bg-[#257A1F]",
      },
      variant: {
        solid: "",
        outline: "bg-transparent border",
        flat: "bg-transparent",
      },
      pill: {
        true: "rounded-full",
        false: "rounded-md",
      },
    },
    compoundVariants: [
      {
        variant: "outline",
        color: "default",
        className: "border-brand text-brand hover:bg-brand/10",
      },
      {
        variant: "outline",
        color: "error",
        className: "border-btn-red text-btn-red hover:bg-btn-red/10",
      },
      {
        variant: "outline",
        color: "success",
        className: "border-btn-green text-btn-green hover:bg-btn-green/10",
      },
      {
        variant: "flat",
        color: "default",
        className: "text-brand hover:bg-brand/5",
      },
      {
        variant: "flat",
        color: "error",
        className: "text-btn-red hover:bg-btn-red/5",
      },
      {
        variant: "flat",
        color: "success",
        className: "text-btn-green hover:bg-btn-green/5",
      },
    ],
    defaultVariants: {
      size: "md",
      color: "default",
      variant: "solid",
      pill: false,
    },
  }
);

type ButtonVariantProps = NonNullable<VariantProps<typeof buttonVariants>>;

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color" | "size">,
    ButtonVariantProps {
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      startIcon,
      endIcon,
      loading,
      size = "md",
      color = "default",
      variant = "solid",
      pill,
      disabled,
      className,
      ...props
    },
    ref
  ) => {
    const isLoading = !!loading;

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(buttonVariants({size, color, variant, pill}), className)}
        {...props}
      >
        {isLoading && !startIcon ? (
          <Loader size={size ?? "md"} />
        ) : (
          <>{startIcon && <span className="mr-2">{startIcon}</span>}</>
        )}

        {children}

        {endIcon && <span className="ml-2">{endIcon}</span>}
      </button>
    );
  }
);
Button.displayName = "Button";

export default Button;
