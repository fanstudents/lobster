import './globals.css';
import Script from 'next/script';

export const metadata = {
  title: '龍蝦 AI 工作流 — 讓你擁有一隻專屬龍蝦',
  description:
    '龍蝦 AI 工作流專注企業 AI 導入，幫你建一套可落地的 AI 工作系統。0 元導入，讓你少做 50% 重複工作。',
  keywords: 'AI 工作流, AI 自動化, 企業 AI 導入, AI 龍蝦, 龍蝦工作流',
  openGraph: {
    title: '龍蝦 AI 工作流 — 讓你擁有一隻專屬龍蝦',
    description: '不是教工具，是幫你打造一套可落地的 AI 工作系統。',
    type: 'website',
    locale: 'zh_TW',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-TW">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />

        {/* Google Analytics 4 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-LZ0RYC1V3B"
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-LZ0RYC1V3B', {
              page_path: window.location.pathname,
            });
          `}
        </Script>

        {/* Facebook Pixel */}
        <Script id="fb-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1138476730496072');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=1138476730496072&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
      </head>
      <body>{children}</body>
    </html>
  );
}

