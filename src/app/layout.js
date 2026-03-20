import './globals.css';

export const metadata = {
  title: '龍蝦工作流 — AI 自動化企業導入',
  description:
    '龍蝦工作流專注企業 AI 導入，幫你建一套可落地的 AI 工作系統。0 元導入，讓你少做 50% 重複工作。',
  keywords: 'AI 工作流, AI 自動化, 企業 AI 導入, AI 龍蝦, 龍蝦工作流',
  openGraph: {
    title: '龍蝦工作流 — AI 自動化企業導入',
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
      </head>
      <body>{children}</body>
    </html>
  );
}
