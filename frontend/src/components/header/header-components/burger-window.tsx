import clsx from "clsx";
import { NavigateComponent } from "./navigate";

export function BurgerWindow({ isOpen }: { isOpen: boolean }) {
  return (
    <div
      className={clsx(
        "absolute left-0 top-0 z-[2] flex h-[calc(100vh+100%)] w-1/2 justify-center bg-slate-500/60 backdrop-blur-sm transition-transform duration-500",
        isOpen ? "translate-x-0" : "-translate-x-full",
      )}
    >
      <NavigateComponent
        className={clsx(
          isOpen
            ? "font-Playfair mobile:text-2xl xs:text-lg mt-44 flex flex-col items-center gap-11 text-3xl font-normal leading-6 [&>*:hover]:scale-105 [&>*:hover]:transition-all"
            : "hidden",
        )}
      />
    </div>
  );
}
