import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { useEffect } from "react";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { Overlays } from "@/components/overlays";
import { useShop } from "@/lib/store";
import "@fontsource/outfit/latin-300.css";
import "@fontsource/outfit/latin-400.css";
import "@fontsource/outfit/latin-500.css";
import "@fontsource/outfit/latin-600.css";
import "@fontsource/outfit/latin-700.css";
import "@fontsource/outfit/latin-800.css";
import "@fontsource/fraunces/latin-500-italic.css";
import "@fontsource/fraunces/latin-600-italic.css";
import appCss from "../styles.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Fermoso — Maison of modern dress" },
      {
        name: "description",
        content:
          "Fermoso is a fashion maison for coats, denim, and everyday tailoring. Shop the edit, meet the designers, and book a fitting.",
      },
      { name: "theme-color", content: "#d33b52" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
    ],
  }),
  component: Root,
});

function Root() {
  useEffect(() => {
    void useShop.persist.rehydrate();
  }, []);

  const notice = useShop((state) => state.notice);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <PreviewHostBridge />
        <AuthProvider>
          <Outlet />
          <Overlays />
          {notice ? (
            <div className="notice" role="status">
              {notice}
            </div>
          ) : null}
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  );
}
