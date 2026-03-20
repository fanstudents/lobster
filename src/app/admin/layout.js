export const metadata = {
  title: 'AI 龍蝦課 — 後臺管理',
  robots: 'noindex, nofollow',
};

export default function AdminLayout({ children }) {
  return (
    <div style={{ minHeight: '100vh', background: '#0f1117' }}>
      {children}
    </div>
  );
}
