import "@/styles/globals.css";

import { fontGeistSans, fontGeistMono, fontHeading, fontSans, fontUrban, fontSerif, fontOutfit } from "@/assets/fonts";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

import { cn, constructMetadata } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@/components/analytics";
import { AnalyticsProvider } from "@/components/analytics/analytics-provider";
import ModalProvider from "@/components/modals/providers";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import { ChatWidget } from "@/components/chat-widget"
import { ScrollToTopButton } from "@/components/scroll-to-top";

interface RootLayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

export const metadata = constructMetadata();

export default async function RootLayout({ children, params: { locale } }: RootLayoutProps) {
  const messages = await getMessages({ locale });

  return (
    <html lang={locale} suppressHydrationWarning className={`${fontGeistSans.variable} ${fontGeistMono.variable} light`}>
      <head>
        <meta name="yandex-verification" content="bbfb53087a308c04" />
        {/* Yandex.Metrika */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
               (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
               m[i].l=1*new Date();
               for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
               k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
               (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

               ym(105775214, "init", {
                    clickmap:true,
                    trackLinks:true,
                    accurateTrackBounce:true,
                    webvisor:true
               });
             `,
          }}
        />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
          fontUrban.variable,
          fontHeading.variable,
          fontSerif.variable,
          fontOutfit.variable,
          fontGeistSans.variable,
          fontGeistMono.variable,
        )}
      >
        <SessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            forcedTheme="light"
            disableTransitionOnChange
          >
            <NextIntlClientProvider messages={messages}>
              <AnalyticsProvider>
                <ModalProvider>{children}</ModalProvider>
              </AnalyticsProvider>
              <ChatWidget />
              <ScrollToTopButton />
              <Analytics />
              <Toaster richColors closeButton />
              <TailwindIndicator />
            </NextIntlClientProvider>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
