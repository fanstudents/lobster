'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import ParallaxSection from './ParallaxSection';
import styles from './VisualShowcase.module.css';

export default function VisualShowcase() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.1 }
    );
    const items = sectionRef.current?.querySelectorAll('.animate-in');
    items?.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <section className={`section ${styles.section}`} ref={sectionRef}>
      <div className="container">
        {/* Block 1: Phone Orchestration */}
        <div className={`animate-in ${styles.block}`}>
          <div className={styles.textSide}>
            <h2 className={`section-title ${styles.title}`}>
              一支手機
              <br />
              <span className="text-gradient">操控你所有的工作流</span>
            </h2>
            <p className={styles.desc}>
              從 LINE 一則訊息出發，自動觸發客服回覆、報表生成、行銷排程。
              不需要切換十個工具，一個入口就能驅動整套系統。
            </p>
            <p className={styles.highlight}>
              這就是 AI 工作流的威力——<strong>你只負責決策，系統負責執行。</strong>
            </p>
          </div>
          <ParallaxSection speed={0.4} className={styles.imageSide}>
            <div className={styles.imageWrap}>
              <Image
                src="/phone-orchestration.png"
                alt="一支手機操控多個服務的 AI 工作流示意圖"
                width={560}
                height={560}
                className={styles.image}
                priority
              />
              <div className={styles.imageGlow} />
            </div>
          </ParallaxSection>
        </div>

        {/* Block 2: Lobster Army */}
        <div className={`animate-in ${styles.block} ${styles.blockReverse}`}>
          <ParallaxSection speed={0.4} className={styles.imageSide}>
            <div className={styles.imageWrap}>
              <Image
                src="/lobster-army.png"
                alt="AI 龍蝦軍團——你的自動化工作部隊"
                width={560}
                height={560}
                className={styles.image}
              />
              <div className={`${styles.imageGlow} ${styles.glowAlt}`} />
            </div>
          </ParallaxSection>
          <div className={styles.textSide}>
            <h2 className={`section-title ${styles.title}`}>
              你不是一個人
              <br />
              <span className="text-gradient">你有一支龍蝦軍團</span>
            </h2>
            <p className={styles.desc}>
              每一隻龍蝦都是一個自動化流程——客服龍蝦、行銷龍蝦、報表龍蝦、排程龍蝦。
              它們 24 小時不休息，幫你處理那些重複但重要的工作。
            </p>
            <p className={styles.highlight}>
              <strong>加入龍蝦課，打造屬於你的 AI 軍團。</strong>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
