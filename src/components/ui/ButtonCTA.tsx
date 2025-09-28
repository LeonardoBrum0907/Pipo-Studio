interface ButtonCTAProps {
   children?: React.ReactNode;
   type?: "primary" | "secondary";
   className?: string;
}

export function ButtonCTA({ children, type = "primary", className }: ButtonCTAProps) {
   return (
      <button className={`px-8 py-4 rounded-full ${type === "primary" ? "bg-foreground-secondary text-white" : "bg-transparent border border-foreground-secondary text-foreground-secondary"} ${className}`}>
         {children || "Start your project"}
      </button>
   )
}