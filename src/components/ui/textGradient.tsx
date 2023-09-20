import clsx from "clsx";

interface TextGradientProps {
  children: React.ReactNode;
  className?: string;
}

export default function TextGradient({
  children,
  className,
  ...rest
}: TextGradientProps) {
  return (
    <span
      className={clsx(
        "text-transparent bg-clip-text bg-gradient-to-r from-teal-700 to-teal-400",
        className,
      )}
    >
      {children}
    </span>
  );
}
