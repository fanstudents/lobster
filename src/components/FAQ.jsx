'use client';

import { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import styles from './FAQ.module.css';

const faqs = [
  {
    q: '免費講座講什麼？',
    a: '4/11 晚上 8:00–9:00，1 小時線上直播。會直接示範龍蝦的實戰案例，讓你看到 AI 工作流實際運作的樣子。適合還在觀望、想先了解的人。',
  },
  {
    q: '我需要有 AI 基礎嗎？',
    a: '建議至少用過 ChatGPT、Claude 或 Gemini，知道什麼是 Prompt。如果你還沒有基礎，免費直播講座是很好的入門起點。',
  },
  {
    q: '課堂教學用的是雲端版本還是本地部署？',
    a: '課堂教學以雲端版本為主，這樣你可以最快速地把系統跑起來，不需要額外的伺服器設定。如果你需要本地化部署（例如企業資安需求），我們也會提供完整的安裝手冊。',
    highlight: true,
  },
  {
    q: '企業導入方案的流程是什麼？',
    a: '從課前深度訪談開始，診斷企業的工作流程；然後設計客製化的 AI 導入方案；接著進行教學 + 導入執行；最後提供 3–6 個月的陪跑服務與成效追蹤。',
  },
  {
    q: '企業導入的費用怎麼算？',
    a: '導入費用目前活動期間全免（原價 NT$ 30,000）。後續費用依照實際使用場景，按月收取。API Token 費用以實際用量計價，帳單完全透明，使用者可以自行查看。',
  },
  {
    q: '需要會寫程式嗎？',
    a: '不需要。課程使用的是 no-code / low-code 工具（如 Make、n8n），不需要寫程式。但如果你有程式基礎，可以做出更進階的自動化流程。',
  },
  {
    q: '會用到哪些工具？',
    a: '主要會用到 ChatGPT / Claude API、Make 或 n8n（自動化平台）、LINE 官方帳號、Google Sheets、Notion 等。具體工具會依課程內容調整。',
  },
  {
    q: '上完課之後還有支援嗎？',
    a: '有。你會加入專屬的學員社群，可以持續發問、交流。課程內容也會持續更新，已報名的學員都可以免費取得最新版本。',
  },
  {
    q: '我的產業適用嗎？',
    a: 'AI 工作流適用於幾乎所有產業。只要你有重複性的工作流程、需要處理資訊或與人溝通，就能透過 AI 自動化來提升效率。過去學員來自電商、教育、顧問、製造、金融等各行各業。',
  },
  {
    q: '跟市面上其他 AI 課程有什麼不同？',
    a: '最大的差別是：我們不只教工具操作，而是教你建一整套系統。大部分課程教你怎麼用 ChatGPT，我們教你怎麼讓 ChatGPT 自動幫你做事。上完課你帶走的不是筆記，是一套真的在跑的工作流。',
  },
  {
    q: '可以用公司的資料來練習嗎？',
    a: '可以，而且我們鼓勵你這麼做。用真實工作資料練習，課程結束後你的系統就能直接上線使用。如果你的資料有保密需求，我們也會指導你如何安全處理。',
  },
  {
    q: '0 元導入是什麼意思？',
    a: '導入費用原價 NT$ 30,000，目前活動期間全額免除。你只需要在正式導入後，依照實際使用場景付費。這是為了讓更多企業能零風險體驗 AI 導入。',
  },
  // ===== 以下為新增問題 =====
  {
    q: '導入需要多少時間？會影響到正常工作嗎？',
    a: '導入初期約需 1–2 週完成訪談與方案設計，後續教學+導入約 2–4 週。過程中不會中斷正常業務，我們會安排在最適合的時段進行，每次約 1–2 小時。',
  },
  {
    q: '公司只有幾個人，適合導入嗎？',
    a: '完全適合。我們的方案不限人數，2–3 人的小團隊反而導入速度更快、效果更明顯。許多客戶反饋，人越少越容易感受到效率提升。',
  },
  {
    q: '我的資料會不會被拿去訓練 AI？有沒有資安疑慮？',
    a: '不會。我們使用的 API（如 OpenAI、Claude）都有明確的資料使用政策，API 呼叫的資料不會被用於模型訓練。如果有更高的資安需求，我們也能協助建置私有化部署方案。',
    highlight: true,
  },
  {
    q: '導入之後如果效果不好怎麼辦？',
    a: '我們提供 3–6 個月的陪跑服務，會持續追蹤成效並即時調整。如果某個流程沒效果，我們會重新設計方案，直到找到最適合你的做法。',
  },
  {
    q: '可以先試用看看再決定嗎？',
    a: '可以。我們提供免費的 30 分鐘諮詢，會先針對你的工作流程做初步診斷，讓你了解 AI 能幫到什麼。不滿意完全不用付費，零風險。',
  },
  {
    q: 'API 費用大概是多少？會不會很貴？',
    a: '以一般文字處理的場景來說，每次 API 呼叫成本約幾毛到幾塊新台幣。多數企業每月 API 費用落在數百到數千元之間，我們會在課程中教你如何控制和優化成本。',
  },
];

function FAQItem({ item, isOpen, onToggle }) {
  return (
    <div className={`${styles.item} ${isOpen ? styles.open : ''} ${item.highlight ? styles.highlighted : ''}`}>
      <button className={styles.question} onClick={onToggle}>
        <span>{item.q}</span>
        <ChevronDown size={18} className={styles.chevron} />
      </button>
      <div className={styles.answerWrap}>
        <div className={styles.answer}>
          <p>{item.a}</p>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const sectionRef = useRef(null);
  // Default: all expanded
  const [closedSet, setClosedSet] = useState(new Set());

  const toggleItem = (index) => {
    setClosedSet((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

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

  const half = Math.ceil(faqs.length / 2);

  return (
    <section className={`section ${styles.section}`} id="faq" ref={sectionRef}>
      <div className="container">
        <div className={`animate-in ${styles.header}`}>
          <div className="section-label">常見問答</div>
          <h2 className="section-title">
            你可能想問的<span className="text-gradient">問題</span>
          </h2>
          <p className="section-subtitle">
            還有疑問？直接來免費講座問我們。
          </p>
        </div>

        <div className={`animate-in ${styles.grid}`}>
          <div className={styles.column}>
            {faqs.slice(0, half).map((item, i) => (
              <FAQItem
                key={i}
                item={item}
                isOpen={!closedSet.has(i)}
                onToggle={() => toggleItem(i)}
              />
            ))}
          </div>
          <div className={styles.column}>
            {faqs.slice(half).map((item, i) => {
              const idx = i + half;
              return (
                <FAQItem
                  key={idx}
                  item={item}
                  isOpen={!closedSet.has(idx)}
                  onToggle={() => toggleItem(idx)}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
