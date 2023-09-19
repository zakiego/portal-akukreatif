import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

export default function Tag({ children, className, ...rest }: Props) {
  return (
    <div
      className={`bg-teal-700 text-white px-2 py-1 rounded-lg hover:bg-teal-600 ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}
