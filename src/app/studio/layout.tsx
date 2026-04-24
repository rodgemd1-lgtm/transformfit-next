import { CopilotShell } from "@/components/CopilotShell";

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <CopilotShell>{children}</CopilotShell>;
}