import type { ReactNode } from "react";
import { DocumentShell } from "@/components/layout/DocumentShell";

export default function TrRootLayout({ children }: { children: ReactNode }) {
  return <DocumentShell locale="tr">{children}</DocumentShell>;
}
