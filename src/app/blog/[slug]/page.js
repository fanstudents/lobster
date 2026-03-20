import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { notFound } from 'next/navigation';
import styles from './post.module.css';

const posts = {
  'marketing-automation': {
    category: '行銷自動化',
    title: '一人行銷團隊如何用 AI 做到 3 人份的產出',
    date: '2025-03-10',
    readTime: '5 分鐘',
    sections: [
      {
        type: 'intro',
        content: `在台灣，超過 60% 的新創公司行銷部門只有 1–2 人。人手不足卻要做出企業級的行銷產出，這幾乎是不可能的任務——直到 AI 工作流出現。

這篇文章記錄了一位新創公司行銷負責人 Lisa，如何透過 AI 龍蝦課學到的方法，在 30 天內建立一套全自動行銷系統，讓她一個人做到 3 人份的產出。`,
      },
      {
        type: 'svg',
        svgId: 'marketing-flow',
      },
      {
        type: 'heading',
        content: '痛點：每天被瑣事吃掉 80% 的時間',
      },
      {
        type: 'text',
        content: `Lisa 每天的行程大概是這樣的：早上寫一篇社群貼文（1.5 小時）、中午處理客戶訊息和回覆留言（1 小時）、下午做數據報表給老闆看（2 小時）、空檔還要想下週的內容規劃。

真正在做「行銷策略」的時間？幾乎為零。

這是很多行銷人的日常——不是不想做策略，而是根本沒有時間。所有的時間都被「執行層」的瑣事吞掉了。`,
      },
      {
        type: 'heading',
        content: '解法：用龍蝦建立三條自動化流程',
      },
      {
        type: 'text',
        content: `上完 AI 龍蝦課後，Lisa 花了兩個週末建立了三條核心工作流：

**流程一：內容自動化產線**
每週一早上，系統自動根據她設定的主題庫和品牌語氣，用 AI 生成 5 篇社群貼文草稿。Lisa 只需要花 30 分鐘審核、微調，就能排滿一整週的內容。

**流程二：客服回覆助手**
常見問題（定價、功能、使用方式）全部由 AI 自動回覆。只有真正需要人工判斷的問題才會通知 Lisa。客服回覆時間從平均 4 小時降到 5 分鐘。

**流程三：報表自動生成**
每週五下午，龍蝦自動從 Google Analytics、社群後台和 CRM 拉數據，生成一份結構化的週報，直接寄到老闆信箱。Lisa 完全不用動手。`,
      },
      {
        type: 'svg',
        svgId: 'marketing-pipeline',
      },
      {
        type: 'heading',
        content: '成果：30 天後的數據',
      },
      {
        type: 'text',
        content: `導入一個月後，Lisa 的數據變化：

• **內容產出量**：從每週 3 篇 → 每週 7 篇（+133%）
• **客服回覆時間**：從 4 小時 → 5 分鐘（-98%）  
• **報表製作時間**：從 4 小時/週 → 0 小時（全自動）
• **策略思考時間**：從 0 → 每天 3 小時

最重要的是，她終於有時間做真正重要的事——思考品牌定位、規劃季度策略、研究競品動態。

Lisa 說：「以前我是一個『做事的人』，現在我是一個『指揮系統的人』。差別很大。」`,
      },
      {
        type: 'heading',
        content: '你也可以做到',
      },
      {
        type: 'text',
        content: `Lisa 的案例不是特例。在 AI 龍蝦課中，每位學員都會用自己的工作資料，建立屬於自己的自動化工作流。不管你是行銷、PM、業務還是工程師，只要有重複性的工作流程，都能透過龍蝦來自動化。

課程現在五月班正在招生中，早鳥價 NT$ 19,800。`,
      },
    ],
  },
  'customer-service-ai': {
    category: '客服自動化',
    title: '用 AI 打造 24 小時客服助手，節省 60% 人力',
    date: '2025-03-05',
    readTime: '7 分鐘',
    sections: [
      {
        type: 'intro',
        content: `「我們的客服團隊每天要回覆超過 300 則訊息，但其中有 70% 都是重複的問題。」

這是電商品牌「好物研究所」創辦人 Kevin 的痛苦。4 個人的客服團隊，每天都在做重複的事。他知道一定有更好的方法。

上完 AI 龍蝦課後，Kevin 在 2 週內建立了一套 AI 客服系統。以下是他的完整實作紀錄。`,
      },
      {
        type: 'svg',
        svgId: 'customer-service-arch',
      },
      {
        type: 'heading',
        content: '問題分析：70% 的問題不需要人來回',
      },
      {
        type: 'text',
        content: `Kevin 做的第一件事是分析過去三個月的客服紀錄。他把所有問題分成四類：

1. **FAQ 類**（45%）：退換貨政策、出貨時間、付款方式等——這些答案永遠一樣
2. **訂單查詢類**（25%）：「我的包裹到哪了？」「訂單編號 XXXX 的狀態？」——需要查資料庫但邏輯固定
3. **商品諮詢類**（20%）：尺寸建議、材質說明、搭配推薦——需要一定的判斷力
4. **特殊情況**（10%）：投訴、退款談判、奇怪的需求——真的需要人來處理

前三類，都可以交給 AI。`,
      },
      {
        type: 'heading',
        content: '系統架構：三層客服堡壘',
      },
      {
        type: 'text',
        content: `Kevin 用龍蝦建了一個三層結構：

**第一層：FAQ 機器人**
用 AI 讀取整理好的 FAQ 知識庫（約 200 條），自動比對問題並回覆。準確率 95%。處理了 45% 的問題。

**第二層：訂單查詢助手**
連接 ERP 和物流 API，自動查詢訂單狀態並回覆。「你的訂單 #12345 已於 3/5 出貨，預計 3/7 到貨，黑貓配送。」——完全不需要人。

**第三層：商品顧問**
用 AI 讀取商品資料庫，根據客人的需求推薦合適的商品。會考慮客人的歷史購買紀錄、偏好和預算。

只有第三層判斷不了或客人明確要求「找真人」的時候，才會轉給真人客服。`,
      },
      {
        type: 'svg',
        svgId: 'cs-three-layer',
      },
      {
        type: 'heading',
        content: '導入成果',
      },
      {
        type: 'text',
        content: `導入三個月後的數據：

• **自動處理率**：70%（300 則/天中 210 則不需人工）
• **回覆速度**：從平均 2 小時 → 即時回覆
• **人力需求**：從 4 人 → 1.5 人（2 人轉去做其他工作）
• **客戶滿意度**：從 3.8 → 4.5（滿分 5）
• **月節省成本**：約 NT$ 120,000

客戶滿意度反而提升了——因為等待時間變短了。有些客人甚至不知道回覆他的是 AI。Kevin 笑說：「真人客服有時候還比 AI 慢。」`,
      },
      {
        type: 'heading',
        content: '關鍵心得',
      },
      {
        type: 'text',
        content: `Kevin 分享了三個關鍵心得：

1. **知識庫是核心**：AI 回覆的品質完全取決於你的知識庫品質。花時間整理好，後面就省很多事。
2. **不要追求 100% 自動化**：有些問題就是需要人來處理。設計好轉接機制比什麼都重要。
3. **持續優化**：每週看一次 AI 答不好的問題，補進知識庫。三個月後幾乎沒有 AI 答不出來的問題了。

這套系統用的全部都是龍蝦課教的架構，不需要寫任何程式碼。`,
      },
    ],
  },
  'report-generator': {
    category: '自動報表',
    title: '每週報表從 4 小時變 10 分鐘的秘密',
    date: '2025-02-28',
    readTime: '4 分鐘',
    sections: [
      {
        type: 'intro',
        content: `「每週五下午我都像在打仗——要從 5 個不同系統撈數據、整理成報表、做圖表、寫摘要，然後寄給老闆。每次都要花 4 小時。」

這是 PM Allen 的困擾。直到他上了 AI 龍蝦課，學會了怎麼讓龍蝦幫他做這件事。`,
      },
      {
        type: 'svg',
        svgId: 'report-flow',
      },
      {
        type: 'heading',
        content: '原本的報表流程',
      },
      {
        type: 'text',
        content: `Allen 每週五要做的事：

1. 從 Jira 撈專案進度數據（30 分鐘）
2. 從 Google Analytics 撈網站流量（15 分鐘）
3. 從 CRM 撈銷售數據（15 分鐘）
4. 從 Slack 整理本週重要討論摘要（45 分鐘）
5. 把所有數據貼到 Google Slides 做圖表（1 小時）
6. 寫執行摘要和下週規劃（1 小時）
7. 最終檢查和微調（15 分鐘）

合計：大約 4 小時。而且這件事**每週**都要做。`,
      },
      {
        type: 'heading',
        content: '自動化後的流程',
      },
      {
        type: 'text',
        content: `用龍蝦建立的自動化流程：

**每週五下午 2 點，系統自動執行：**
1. 龍蝦自動連接 Jira API，撈取本週的 sprint 數據
2. 自動從 GA4 拉取流量和轉換率數據
3. 自動從 CRM 拉取銷售漏斗數據
4. 用 AI 掃描 Slack 頻道，抓取本週重要討論和決策
5. 把所有數據餵給 AI，生成結構化的週報
6. 自動套用公司的簡報模板，產出 Google Slides
7. 發送到 Allen 的信箱等他確認

**Allen 要做的事：**花 10 分鐘看一下報表，確認沒問題，按下「發送」。搞定。`,
      },
      {
        type: 'svg',
        svgId: 'report-comparison',
      },
      {
        type: 'heading',
        content: '省下的時間拿來做什麼？',
      },
      {
        type: 'text',
        content: `Allen 每週多了 3.5 小時的可用時間。他把這些時間用來：

• **跟團隊成員 1-on-1**：之前因為忙報表常常取消
• **做專案風險評估**：以前都是出問題才反應
• **學習新工具和方法論**：讓團隊效率持續提升

他說：「報表是重要的事，但不應該是我花最多時間的事。AI 幫我管好例行公事，我就能專注在真正需要判斷力的工作上。」

這種思維轉變——從「做事的人」變成「指揮系統的人」——正是 AI 龍蝦課的核心精神。`,
      },
    ],
  },
  'enterprise-onboarding': {
    category: '企業導入',
    title: '50 人科技公司全面 AI 化的 90 天實戰紀錄',
    date: '2025-02-20',
    readTime: '10 分鐘',
    sections: [
      {
        type: 'intro',
        content: `這是一篇完整的企業導入紀錄。

「元件科技」是一家 50 人的 SaaS 公司，專做 B2B 解決方案。CEO 陳總在一場研討會上聽到 AI 工作流的概念後，決定找我們做企業導入。

以下是 90 天的完整歷程——從初次訪談到全面上線，包含踩過的坑和真實數據。`,
      },
      {
        type: 'svg',
        svgId: 'enterprise-timeline',
      },
      {
        type: 'heading',
        content: '第 1–2 週：企業診斷',
      },
      {
        type: 'text',
        content: `我們的顧問團隊花了兩週做全面訪談：

**訪談了 8 個部門：**
- 業務部（8 人）：每天花 2 小時寫提案，大量重複性的客戶溝通
- 客服部（6 人）：每天處理 200+ 則訊息，80% 是重複問題
- 行銷部（4 人）：內容產出跟不上需求
- PM（3 人）：報表、會議紀錄、狀態更新吃掉 60% 時間
- HR（2 人）：招募流程的初篩和面試安排很瑣碎
- 財務（2 人）：月報、年報、差旅報銷
- 工程部（20 人）：Code review 和文件撰寫
- 管理層（5 人）：決策需要的資訊整理太慢

**診斷結果：**
我們找出了 23 個可以自動化的工作流節點。依照「投入產出比」排序後，選出第一批 8 個優先建置的流程。`,
      },
      {
        type: 'heading',
        content: '第 3–6 週：流程設計與建置',
      },
      {
        type: 'text',
        content: `第一批 8 個流程：

1. **業務提案生成器**：輸入客戶需求，自動生成客製化提案（原本 2 小時 → 15 分鐘）
2. **客服 AI 助手**：FAQ + 工單查詢自動化（自動處理率 75%）
3. **行銷內容產線**：每週自動生成社群內容草稿
4. **PM 週報自動化**：自動從各系統撈資料生成報表
5. **HR 履歷初篩**：自動篩選符合條件的履歷並排序
6. **會議紀錄摘要**：會議錄音自動轉逐字稿 + 摘要 + 待辦
7. **客戶訊息分類**：自動將來信分類並派發給對的人
8. **差旅報銷 OCR**：拍照上傳收據 → 自動辨識 → 生成報銷單

每個流程都由我們的顧問帶著該部門的同事一起建。邊教邊做，確保他們理解原理。`,
      },
      {
        type: 'svg',
        svgId: 'enterprise-results',
      },
      {
        type: 'heading',
        content: '第 7–10 週：上線測試',
      },
      {
        type: 'text',
        content: `分三批上線：

**第一批（第 7 週）**：業務提案、客服 AI、PM 報表
- 業務部反饋最好：「我終於可以花時間在跟客戶聊天上了」
- 客服 AI 第一週有一些誤判，我們即時調整知識庫

**第二批（第 8 週）**：行銷內容、HR 初篩、會議摘要
- 行銷部需要調整 AI 的品牌語氣，花了一週磨合
- HR 初篩的準確率一開始只有 70%，調整評分權重後提升到 90%

**第三批（第 9 週）**：訊息分類、差旅報銷
- 訊息分類一上線就運作得很好
- 差旅報銷的 OCR 對手寫收據辨識率較低，建議員工盡量用電子發票`,
      },
      {
        type: 'heading',
        content: '90 天成果總結',
      },
      {
        type: 'text',
        content: `**量化數據：**
• 每月節省總工時：約 620 小時（相當於 3.5 個全職人力）
• 月節省成本：約 NT$ 350,000
• 客戶滿意度：提升 22%
• 員工滿意度：提升 35%（「終於不用做無聊的事了」）

**質化改變：**
• 各部門開始主動思考「這件事可以讓 AI 做嗎？」
• 公司文化從「加班 = 認真」變成「自動化 = 聰明」
• 陳總說：「省下的不只是錢，是讓每個人都更享受工作。」

如果你的企業也想導入，歡迎預約免費的 30 分鐘諮詢。`,
      },
    ],
  },
  'content-creation-workflow': {
    category: '內容產出',
    title: 'AI 內容工作流：從構思到發佈只要 30 分鐘',
    date: '2025-02-15',
    readTime: '6 分鐘',
    sections: [
      {
        type: 'intro',
        content: `每個做內容的人都知道：「想主題」是最痛苦的事。好不容易想到主題，還要寫大綱、寫文章、做 SEO、配圖、排版、排程發佈⋯⋯

如果有一套系統，能把整個流程壓縮到 30 分鐘呢？

自由接案者 Mia 用 AI 龍蝦課學到的方法，建了一條「內容產線」。現在她每天早上花 30 分鐘，就能產出一篇高品質的部落格文章。`,
      },
      {
        type: 'svg',
        svgId: 'content-pipeline',
      },
      {
        type: 'heading',
        content: '五階段內容產線',
      },
      {
        type: 'text',
        content: `Mia 的內容產線分為五個階段，全部用龍蝦串接：

**階段一：主題挖掘（自動）**
系統每週自動掃描她設定的 20 個資訊來源（競品部落格、產業新聞、Reddit、PTT 等），用 AI 找出最近的熱門話題和關鍵字。每週一早上會收到一份「本週推薦主題」清單。

**階段二：大綱生成（2 分鐘）**
Mia 從清單中選一個主題，系統自動生成 3 個不同角度的大綱給她選。選好後確認。

**階段三：文章撰寫（5 分鐘審核）**
AI 根據大綱和她的品牌語氣指南，生成完整文章草稿。Mia 花 5 分鐘閱讀、修改關鍵段落。

**階段四：SEO 優化（自動）**
系統自動檢查 SEO 要素：標題長度、meta description、H2/H3 結構、內部連結、關鍵字密度。不合格的自動修正。

**階段五：排程發佈（自動）**
根據 Mia 設定的發佈時間表，系統自動把文章發佈到 WordPress，同時生成適合各社群平台的摘要版本，排程到 Buffer。`,
      },
      {
        type: 'heading',
        content: '品質管控：AI 不是萬能的',
      },
      {
        type: 'text',
        content: `Mia 強調：「AI 產出的文章不能直接發佈。但 AI 產出的草稿，可以讓你省掉 80% 的工作。」

她的品質管控原則：
1. **事實查核**：AI 生成的數據和案例必須手動確認
2. **品牌語氣**：每隔一段時間更新語氣指南，讓 AI 的文風跟上
3. **個人觀點**：每篇文章至少加入 2–3 段純手寫的個人見解
4. **讀者反饋**：根據閱讀數據持續調整內容策略

「工具負責效率，我負責靈魂。」——這是 Mia 的原則。`,
      },
      {
        type: 'svg',
        svgId: 'content-quality',
      },
      {
        type: 'heading',
        content: '成果',
      },
      {
        type: 'text',
        content: `使用這套系統三個月後：

• **內容產出**：從每週 1 篇 → 每週 5 篇
• **每篇文章耗時**：從 6 小時 → 30 分鐘
• **SEO 排名**：前三頁的關鍵字從 12 個 → 47 個
• **月流量**：成長 340%
• **接案收入**：成長 2.5 倍

Mia 說：「AI 幫我處理了最瑣碎的部分，讓我可以專注在策略和創意上。這才是做內容真正有趣的地方。」`,
      },
    ],
  },
  'data-analysis-automation': {
    category: '數據分析',
    title: '讓 AI 幫你看數據：自動化數據分析工作流',
    date: '2025-02-10',
    readTime: '8 分鐘',
    sections: [
      {
        type: 'intro',
        content: `數據分析師的日常悖論：花 80% 的時間在清洗和整理數據，只有 20% 的時間真正在「分析」。

資深數據分析師 James 決定用 AI 來翻轉這個比例。上完 AI 龍蝦課後，他建了一套自動化數據分析工作流。現在他花 80% 的時間在思考策略，只需要 20% 的時間做技術操作。`,
      },
      {
        type: 'svg',
        svgId: 'data-flow',
      },
      {
        type: 'heading',
        content: '數據分析師的三大痛點',
      },
      {
        type: 'text',
        content: `James 在一家中型電商公司擔任數據分析師，他的痛點很典型：

**痛點一：資料清洗太耗時**
每天從 5 個不同來源（GA、廣告後台、CRM、ERP、客服系統）拉資料，然後花 2 小時做欄位對齊、格式統一、缺失值處理。這件事每天都要做，但毫無創造性。

**痛點二：重複性的報表需求**
每個部門都要看不同維度的報表。行銷要看 ROAS、業務要看轉換漏斗、老闆要看營收趨勢。同一批資料要切 N 種角度，每次都要手動操作。

**痛點三：洞察挖掘靠直覺**
數據太多，光是看完就要花很多時間。很多有價值的洞察可能藏在某個不起眼的交叉分析裡，但人工很難全部看過。`,
      },
      {
        type: 'heading',
        content: '自動化方案',
      },
      {
        type: 'text',
        content: `James 用龍蝦建了三套自動化工具：

**工具一：自動資料清洗管線**
每天早上 6 點，龍蝦自動從各個資料源拉取前一天的數據。透過預設的清洗規則（欄位對齊、格式轉換、異常值標記），在 James 上班前就準備好乾淨的資料集。

**工具二：動態報表生成器**
James 設計了一套報表模板系統。每個部門有自己的模板，系統每天自動套用最新數據生成視覺化報表，直接推送到各部門的 Slack 頻道。

**工具三：異常偵測 + 洞察挖掘**
用 AI 分析每天的數據，自動標記異常值（例如某商品轉換率突然下降 30%），並嘗試給出可能的原因假說。James 只需要看 AI 標記的「值得注意」事項就好。`,
      },
      {
        type: 'svg',
        svgId: 'data-pipeline-detail',
      },
      {
        type: 'heading',
        content: '一個真實案例',
      },
      {
        type: 'text',
        content: `上線第二週，AI 標記了一個異常：「週二的購物車放棄率比平均高 45%，可能原因：結帳頁面載入時間增加。」

James 去查了一下，發現工程部當天部署了一個新版本，導致結帳頁面多了一個不必要的 API 請求，載入時間多了 2 秒。

如果沒有 AI 自動偵測，這個問題可能要等到月報才會被發現——那時候已經損失了兩週的營收。

「這個發現幫公司省了大約 NT$ 800,000 的潛在損失。光這一次就值回整個系統的投資了。」James 說。`,
      },
      {
        type: 'heading',
        content: '數據素養 × AI = 超能力',
      },
      {
        type: 'text',
        content: `James 的心得：「AI 不會取代數據分析師，但不用 AI 的數據分析師會被取代。」

他的建議：
1. **先釐清你的分析框架**：AI 需要明確的方向才能發揮
2. **建好資料字典**：讓 AI 理解你的數據欄位含義
3. **設定合理的閾值**：異常偵測的靈敏度需要反覆調整
4. **保持懷疑**：AI 的假說需要人工驗證，但它幫你指出方向

龍蝦的價值不在於取代你的專業判斷，而在於幫你把時間花在真正需要判斷力的地方。`,
      },
    ],
  },
};

// Flow diagram - HTML based for mobile support
const allFlows = {
  'marketing-flow': ['主題庫', 'AI 生成', '審核微調', '排程發佈', '數據回饋'],
  'marketing-pipeline': ['內容產線', '客服助手', '自動報表'],
  'customer-service-arch': ['客戶訊息', 'AI 分類', '自動回覆', '知識庫回饋'],
  'cs-three-layer': ['FAQ 機器人', '訂單查詢', '商品顧問', '轉人工'],
  'report-flow': ['多源撈資料', 'AI 整理', '套模板', '自動寄送'],
  'report-comparison': ['原本 4hr', '→', '現在 10min', '省 3.5hr/週'],
  'enterprise-timeline': ['企業診斷', '流程設計', '上線測試', '成效追蹤'],
  'enterprise-results': ['620 hr/月', '省 35 萬/月', '滿意度 +22%', '8 條流程'],
  'content-pipeline': ['主題挖掘', '大綱生成', 'AI 撰文', 'SEO 發佈'],
  'content-quality': ['事實查核', '品牌語氣', '個人觀點', '讀者反饋'],
  'data-flow': ['資料源', '自動清洗', 'AI 分析', '洞察報告'],
  'data-pipeline-detail': ['異常偵測', '原因假說', '人工驗證', '行動方案'],
};

const flowColors = ['hsl(8,75%,50%)', 'hsl(25,75%,48%)', 'hsl(150,55%,38%)', 'hsl(220,60%,50%)'];

function BlogSVG({ id }) {
  const items = allFlows[id] || ['步驟一', '步驟二', '步驟三', '步驟四'];
  return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'10px', flexWrap:'wrap', padding:'24px 16px', background:'rgba(0,0,0,0.02)', borderRadius:'12px', border:'1px solid rgba(0,0,0,0.06)' }}>
      {items.map((label, i) => (
        <div key={i} style={{ display:'flex', alignItems:'center', gap:'10px' }}>
          <div style={{ padding:'12px 20px', borderRadius:'10px', background:'white', border:`2px solid ${flowColors[i % flowColors.length]}`, color:flowColors[i % flowColors.length], fontWeight:700, fontSize:'14px', textAlign:'center', minWidth:'70px' }}>
            {label}
          </div>
          {i < items.length - 1 && <span style={{ color:'#bbb', fontSize:'18px', fontWeight:'bold' }}>&rarr;</span>}
        </div>
      ))}
    </div>
  );
}



export function generateStaticParams() {
  return Object.keys(posts).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = posts[slug];
  if (!post) return {};
  return {
    title: `${post.title} — AI 龍蝦課`,
    description: post.sections[0]?.content?.slice(0, 160),
  };
}

export default async function BlogPost({ params }) {
  const { slug } = await params;
  const post = posts[slug];
  if (!post) notFound();

  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <article className={`container ${styles.article}`}>
          <div className={styles.header}>
            <Link href="/blog" className={styles.backLink}>← 返回案例列表</Link>
            <div className={styles.meta}>
              <span className={styles.category}>{post.category}</span>
              <span className={styles.date}>{post.date}</span>
              <span className={styles.readTime}>{post.readTime}閱讀</span>
            </div>
            <h1 className={styles.title}>{post.title}</h1>
          </div>

          <div className={styles.body}>
            {post.sections.map((section, i) => {
              switch (section.type) {
                case 'intro':
                  return <div key={i} className={styles.intro}>{section.content.split('\n\n').map((p, j) => <p key={j}>{p}</p>)}</div>;
                case 'heading':
                  return <h2 key={i} className={styles.h2}>{section.content}</h2>;
                case 'text':
                  return (
                    <div key={i} className={styles.text}>
                      {section.content.split('\n\n').map((p, j) => {
                        // Handle bold text
                        const parts = p.split(/(\*\*[^*]+\*\*)/g);
                        return (
                          <p key={j}>
                            {parts.map((part, k) =>
                              part.startsWith('**') && part.endsWith('**')
                                ? <strong key={k}>{part.slice(2, -2)}</strong>
                                : part
                            )}
                          </p>
                        );
                      })}
                    </div>
                  );
                case 'svg':
                  return <div key={i} className={styles.svgWrap}><BlogSVG id={section.svgId} /></div>;
                default:
                  return null;
              }
            })}
          </div>

          <div className={styles.cta}>
            <h3>想打造屬於你的 AI 工作流？</h3>
            <p>AI 龍蝦課五月班招生中，早鳥價 NT$ 19,800</p>
            <Link href="/#pricing" className="btn btn-primary">查看課程方案</Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
