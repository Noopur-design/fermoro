import type { ReactNode } from "react";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

export function Frame({ children }: { children: ReactNode }) {
  return (
    <div className="page-canvas">
      <div className="red-cap" aria-hidden />
      <div className="sheet">
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </div>
      <div className="red-foot" aria-hidden />
    </div>
  );
}
