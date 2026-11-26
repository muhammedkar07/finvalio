import type { ReactNode } from "react";
import { DocumentShell } from "@/components/layout/DocumentShell";

export default function DefaultRootLayout({ children }: { children: ReactNode }) {
  return <DocumentShell locale="en">{children}</DocumentShell>;
}
