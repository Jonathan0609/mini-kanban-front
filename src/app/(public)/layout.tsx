import { AppShell, AppShellHeader, AppShellMain, Title } from "@mantine/core";
import type { PropsWithChildren } from "react";

export default function PublicLayout({ children }: PropsWithChildren) {
  return (
    <AppShell header={{ height: 60 }} padding="md">
      <AppShellHeader p="md">
        <Title order={3}>Mini-Kanban</Title>
      </AppShellHeader>

      <AppShellMain bg="var(--mantine-color-gray-0)">{children}</AppShellMain>
    </AppShell>
  );
}
