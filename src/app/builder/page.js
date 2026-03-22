'use client';

import { useState, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BuilderForm from '@/components/builder/BuilderForm';
import WorkflowCanvas from '@/components/builder/WorkflowCanvas';
import ExportActions from '@/components/builder/ExportActions';
import styles from './page.module.css';

const defaultData = {
  title: '行銷部',
  subtitle: '自動化社群發文與數據分析',
  sources: ['CRM 客戶資料', 'GA4 網站數據', '社群平台'],
  tasks: ['數據清洗', '內容生成'],
  outputs: ['行銷經理', '社群專員', 'LINE 群組'],
};

export default function BuilderPage() {
  const [data, setData] = useState(defaultData);
  const canvasRef = useRef(null);

  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.hero}>
          <h1 className={styles.title}>
            打造你的<span className="text-gradient">龍蝦工作流</span>
          </h1>
          <p className={styles.subtitle}>
            輸入你的工作場景，即時生成龍蝦架構圖。
          </p>
        </div>

        <div className={styles.layout}>
          <aside className={styles.sidebar}>
            <h2 className={styles.sidebarTitle}>⚙️ 設定你的龍蝦</h2>
            <BuilderForm data={data} onChange={setData} />
          </aside>

          <section className={styles.canvas} ref={canvasRef}>
            <WorkflowCanvas data={data} />
            <ExportActions canvasRef={canvasRef} />
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
