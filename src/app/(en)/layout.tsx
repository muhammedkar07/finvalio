import type { ReactNode } from "react";
import { DocumentShell } from "@/components/layout/DocumentShell";

export default function EnRootLayout({ children }: { children: ReactNode }) {
  return <DocumentShell locale="en">{children}</DocumentShell>;
}
