"use client";
import { store } from "@/store/store";
import { Provider } from "react-redux";

interface PropsWithChildren {
  children: React.ReactNode;
}

export const Providers = ({ children }: PropsWithChildren) => {
  return <Provider store={store}>{children}</Provider>;
};
