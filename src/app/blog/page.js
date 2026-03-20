import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import styles from './blog.module.css';

export const metadata = {
  title: '案例分享 — AI 龍蝦課',
  description: '真實的 AI 工作流成功案例，看看其他企業和個人如何透過 AI 龍蝦課打造自動化系統。',
};

const posts = [
  {
    slug: 'marketing-automation',
    category: '行銷自動化',
    title: '一人行銷團隊如何用 AI 做到 3 人份的產出',
    excerpt:
      '某新創公司的行銷部只有一個人，透過 AI 龍蝦課學到的工作流方法，建立了從內容產出到社群排程的全自動化流程，產出量提升 3 倍。',
    readTime: '5 分鐘',
    date: '2025-03-10',
  },
  {
    slug: 'customer-service-ai',
    category: '客服自動化',
    title: '用 AI 打造 24 小時客服助手，節省 60% 人力',
    excerpt:
      '一家電商公司導入 AI 客服系統後，不只回覆速度從平均 2 小時降到即時，更減少了 60% 的人工客服需求。',
    readTime: '7 分鐘',
    date: '2025-03-05',
  },
  {
    slug: 'report-generator',
    category: '自動報表',
    title: '每週報表從 4 小時變 10 分鐘的秘密',
    excerpt:
      '專案經理每週花 4 小時整理各部門報表，導入 AI 報表生成器後，只需 10 分鐘確認就能產出完美報告。',
    readTime: '4 分鐘',
    date: '2025-02-28',
  },
  {
    slug: 'enterprise-onboarding',
    category: '企業導入',
    title: '50 人科技公司全面 AI 化的 90 天實戰紀錄',
    excerpt:
      '從訪談、流程拆解、系統設計到上線，完整記錄一家 50 人科技公司如何在 90 天內完成 AI 工作流導入。',
    readTime: '10 分鐘',
    date: '2025-02-20',
  },
  {
    slug: 'content-creation-workflow',
    category: '內容產出',
    title: 'AI 內容工作流：從構思到發佈只要 30 分鐘',
    excerpt:
      '建立了一套從主題發想、大綱生成、文章撰寫、SEO 優化到排程發布的完整自動化流程。',
    readTime: '6 分鐘',
    date: '2025-02-15',
  },
  {
    slug: 'data-analysis-automation',
    category: '數據分析',
    title: '讓 AI 幫你看數據：自動化數據分析工作流',
    excerpt:
      '數據分析師用 AI 工作流自動化日常的數據清洗、視覺化和報告生成，把更多時間花在策略思考上。',
    readTime: '8 分鐘',
    date: '2025-02-10',
  },
];

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <div className="container">
          <div className={styles.header}>
            <div className="section-label">案例分享</div>
            <h1 className="section-title">
              真實的 <span className="text-gradient">AI 成功案例</span>
            </h1>
            <p className="section-subtitle">
              看看其他企業和個人如何透過 AI 龍蝦課，打造出可落地的自動化工作系統。
            </p>
          </div>

          <div className={styles.grid}>
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className={styles.cardLink}>
                <article className={`glass-card ${styles.card}`}>
                  <div className={styles.cardMeta}>
                    <span className={styles.category}>{post.category}</span>
                    <span className={styles.date}>{post.date}</span>
                  </div>
                  <h2 className={styles.cardTitle}>{post.title}</h2>
                  <p className={styles.cardExcerpt}>{post.excerpt}</p>
                  <div className={styles.cardFooter}>
                    <span className={styles.readTime}>{post.readTime}閱讀</span>
                    <span className={styles.readMore}>閱讀更多 →</span>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          <div className={styles.cta}>
            <p>想讓你的案例也出現在這裡？</p>
            <Link href="/#pricing" className="btn btn-primary">
              加入龍蝦課
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
