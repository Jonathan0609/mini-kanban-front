import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "@/app/globals.css";

import {
  ColorSchemeScript,
  MantineProvider,
  mantineHtmlProps,
} from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import { Montserrat } from "next/font/google";
import { mantineTheme } from "@/core/config/mantine/theme";
import RootProviders from "./providers";

export const metadata = {
  title: "Mini kanban",
};

export const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
      </head>

      <body className={montserrat.className}>
        <RootProviders>
          <MantineProvider theme={mantineTheme}>
            <Notifications position="top-right" zIndex={1000} />

            <ModalsProvider>{children}</ModalsProvider>
          </MantineProvider>
        </RootProviders>
      </body>
    </html>
  );
}
