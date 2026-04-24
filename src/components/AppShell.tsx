"use client";

import { CopilotWrapper, useCopilotGenUIActions } from "@/lib/copilotkit";

// Inner component that activates the hooks (must be client-side)
function CopilotActionsActivator({ children }: { children: React.ReactNode }) {
  // This registers all CopilotKit actions with the sidebar
  useCopilotGenUIActions();
  return <>{children}</>;
}

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <CopilotWrapper>
      <CopilotActionsActivator>{children}</CopilotActionsActivator>
    </CopilotWrapper>
  );
}