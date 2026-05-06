import { ContainerProps } from "../model/types";

export const Container = ({ className, children }: ContainerProps) => {
  return (
    <div className={`mx-auto w-full max-w-7xl px-4 ${className}`}>
      {children}
    </div>
  );
};
