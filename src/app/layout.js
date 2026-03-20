import './globals.css';

export const metadata = {
  title: 'AI 龍蝦課 — 用 AI 打造可落地的工作流系統',
  description:
    'AI 龍蝦課不是教工具，是幫你打造一套可落地的 AI 工作系統。讓你少做 50% 重複工作，企業導入 AI 從這裡開始。',
  keywords: 'AI 課程, AI 工作流, AI 自動化, 企業 AI 導入, ChatGPT 課程, AI 龍蝦課',
  openGraph: {
    title: 'AI 龍蝦課 — 用 AI 打造可落地的工作流系統',
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
