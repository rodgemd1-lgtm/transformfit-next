"use client";

import { CopilotWrapper, useCopilotGenUIActions } from "@/lib/copilotkit";

function CopilotActionsActivator({ children }: { children: React.ReactNode }) {
  useCopilotGenUIActions();
  return <>{children}</>;
}

export function CopilotShell({ children }: { children: React.ReactNode }) {
  return (
    <CopilotWrapper>
      <CopilotActionsActivator>{children}</CopilotActionsActivator>
    </CopilotWrapper>
  );
}