'use client';

import { useState, useEffect } from 'react';
import styles from './admin.module.css';

const TYPE_LABELS = {
  free_lecture: '免費講座',
  course_register: '龍蝦課登記',
  enterprise_consult: '企業諮詢',
  unknown: '其他',
};

function formatDate(dateStr) {
  const d = new Date(dateStr + 'T00:00:00');
  const weekdays = ['日', '一', '二', '三', '四', '五', '六'];
  return `${d.getMonth() + 1}/${d.getDate()}（${weekdays[d.getDay()]}）`;
}

export default function AdminPage() {
  const [tab, setTab] = useState('registrations');
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [webhookUrl, setWebhookUrl] = useState('');
  const [webhookSaved, setWebhookSaved] = useState(false);
  const [filter, setFilter] = useState('all');

  // Date management
  const [dateData, setDateData] = useState(null);
  const [defaultCapacity, setDefaultCapacity] = useState(3);
  const [dateSaved, setDateSaved] = useState(false);

  useEffect(() => {
    fetchRegistrations();
    fetchWebhookConfig();
    fetchDates();
  }, []);

  async function fetchRegistrations() {
    setLoading(true);
    try {
      const res = await fetch('/api/registrations');
      const data = await res.json();
      setRegistrations(Array.isArray(data) ? data.reverse() : []);
    } catch (err) {
      console.error('Failed to fetch registrations:', err);
    }
    setLoading(false);
  }

  async function fetchWebhookConfig() {
    try {
      const res = await fetch('/api/webhook-config');
      const data = await res.json();
      setWebhookUrl(data.webhookUrl || '');
    } catch (err) {
      console.error('Failed to fetch webhook config:', err);
    }
  }

  async function fetchDates() {
    try {
      const res = await fetch('/api/dates');
      const data = await res.json();
      setDateData(data);
      setDefaultCapacity(data.defaultCapacity || 3);
    } catch (err) {
      console.error('Failed to fetch dates:', err);
    }
  }

  async function saveWebhookConfig() {
    try {
      await fetch('/api/webhook-config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ webhookUrl }),
      });
      setWebhookSaved(true);
      setTimeout(() => setWebhookSaved(false), 3000);
    } catch (err) {
      console.error('Failed to save webhook config:', err);
    }
  }

  async function saveDefaultCapacity() {
    try {
      await fetch('/api/dates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ defaultCapacity }),
      });
      setDateSaved(true);
      setTimeout(() => setDateSaved(false), 3000);
      fetchDates();
    } catch (err) {
      console.error('Failed to save default capacity:', err);
    }
  }

  async function updateDateOverride(dateStr, newCapacity) {
    try {
      await fetch('/api/dates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ overrides: { [dateStr]: newCapacity } }),
      });
      fetchDates();
    } catch (err) {
      console.error('Failed to update date override:', err);
    }
  }

  const filteredRegistrations = filter === 'all'
    ? registrations
    : registrations.filter((r) => r.type === filter);

  const counts = registrations.reduce((acc, r) => {
    acc[r.type] = (acc[r.type] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>🦞 AI 龍蝦課 後臺管理</h1>
        <a href="/" className={styles.backLink}>← 回首頁</a>
      </header>

      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${tab === 'registrations' ? styles.tabActive : ''}`}
          onClick={() => setTab('registrations')}
        >
          📋 報名清單
          <span className={styles.tabBadge}>{registrations.length}</span>
        </button>
        <button
          className={`${styles.tab} ${tab === 'dates' ? styles.tabActive : ''}`}
          onClick={() => setTab('dates')}
        >
          📅 日期管理
        </button>
        <button
          className={`${styles.tab} ${tab === 'webhook' ? styles.tabActive : ''}`}
          onClick={() => setTab('webhook')}
        >
          🔗 Webhook 設定
        </button>
      </div>

      {/* ===== Registrations ===== */}
      {tab === 'registrations' && (
        <div className={styles.panel}>
          <div className={styles.filterBar}>
            <button
              className={`${styles.filterBtn} ${filter === 'all' ? styles.filterActive : ''}`}
              onClick={() => setFilter('all')}
            >
              全部 ({registrations.length})
            </button>
            {Object.entries(TYPE_LABELS).map(([key, label]) => (
              <button
                key={key}
                className={`${styles.filterBtn} ${filter === key ? styles.filterActive : ''}`}
                onClick={() => setFilter(key)}
              >
                {label} ({counts[key] || 0})
              </button>
            ))}
            <button className={styles.refreshBtn} onClick={fetchRegistrations}>
              🔄 重新整理
            </button>
          </div>

          {loading ? (
            <div className={styles.empty}>載入中...</div>
          ) : filteredRegistrations.length === 0 ? (
            <div className={styles.empty}>目前沒有報名資料</div>
          ) : (
            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>類型</th>
                    <th>姓名</th>
                    <th>Email</th>
                    <th>電話</th>
                    <th>公司</th>
                    <th>團隊人數</th>
                    <th>諮詢日期</th>
                    <th>建立時間</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRegistrations.map((r) => (
                    <tr key={r.id}>
                      <td>
                        <span className={`${styles.typeBadge} ${styles[`type_${r.type}`]}`}>
                          {TYPE_LABELS[r.type] || r.type}
                        </span>
                      </td>
                      <td>{r.name || '—'}</td>
                      <td>{r.email || '—'}</td>
                      <td>{r.phone || '—'}</td>
                      <td>{r.company || '—'}</td>
                      <td>{r.team_size || '—'}</td>
                      <td>{r.preferred_date || '—'}</td>
                      <td className={styles.timeCell}>
                        {r.created_at ? new Date(r.created_at).toLocaleString('zh-TW') : '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* ===== Date Management ===== */}
      {tab === 'dates' && (
        <div className={styles.panel}>
          <div className={styles.webhookCard}>
            <h3>每日預約名額控管</h3>
            <p className={styles.webhookDesc}>
              管理企業諮詢的可預約日期與每日名額上限。超過上限的日期將自動從前台隱藏。
            </p>

            <div className={styles.dateDefaultRow}>
              <label>預設每日名額上限：</label>
              <input
                type="number"
                min="0"
                max="99"
                value={defaultCapacity}
                onChange={(e) => setDefaultCapacity(parseInt(e.target.value, 10) || 0)}
                className={styles.dateInput}
              />
              <button onClick={saveDefaultCapacity} className={styles.saveBtn}>
                {dateSaved ? '✅ 已儲存' : '💾 儲存'}
              </button>
            </div>

            {dateData && dateData.dates && (
              <div className={styles.dateGrid}>
                <div className={styles.dateGridHeader}>
                  <span>日期</span>
                  <span>已預約</span>
                  <span>上限</span>
                  <span>狀態</span>
                  <span>調整</span>
                </div>
                {dateData.dates.map((d) => (
                  <div key={d.date} className={`${styles.dateRow} ${d.full ? styles.dateRowFull : ''}`}>
                    <span className={styles.dateLabel}>{formatDate(d.date)}</span>
                    <span className={styles.dateBooked}>{d.booked}</span>
                    <span className={styles.dateCap}>{d.capacity}</span>
                    <span>
                      {d.full ? (
                        <span className={styles.dateStatusFull}>已額滿</span>
                      ) : (
                        <span className={styles.dateStatusOpen}>剩 {d.available} 名</span>
                      )}
                    </span>
                    <span className={styles.dateActions}>
                      <button
                        className={styles.dateActionBtn}
                        onClick={() => updateDateOverride(d.date, d.capacity - 1)}
                        disabled={d.capacity <= 0}
                        title="減少名額"
                      >
                        −
                      </button>
                      <button
                        className={styles.dateActionBtn}
                        onClick={() => updateDateOverride(d.date, d.capacity + 1)}
                        title="增加名額"
                      >
                        +
                      </button>
                      <button
                        className={styles.dateActionBtn}
                        onClick={() => updateDateOverride(d.date, 0)}
                        title="關閉此日"
                      >
                        ✕
                      </button>
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ===== Webhook ===== */}
      {tab === 'webhook' && (
        <div className={styles.panel}>
          <div className={styles.webhookCard}>
            <h3>Make.com Webhook URL</h3>
            <p className={styles.webhookDesc}>
              設定 Make.com 的 Webhook URL，每當有人提交表單時，系統會自動將資料 POST 到此 URL。
            </p>
            <div className={styles.webhookInput}>
              <input
                type="url"
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
                placeholder="https://hook.us1.make.com/xxx..."
                className={styles.input}
              />
              <button onClick={saveWebhookConfig} className={styles.saveBtn}>
                {webhookSaved ? '✅ 已儲存' : '💾 儲存'}
              </button>
            </div>
            <div className={styles.webhookHelp}>
              <h4>設定步驟：</h4>
              <ol>
                <li>登入 <a href="https://www.make.com" target="_blank" rel="noopener noreferrer">Make.com</a></li>
                <li>建立新的 Scenario</li>
                <li>選擇「Webhooks → Custom webhook」作為 Trigger</li>
                <li>複製產生的 Webhook URL 貼到上方欄位</li>
                <li>在 Make 中設定後續的 Email 發送動作（例如 Gmail、SMTP）</li>
              </ol>
            </div>
            <div className={styles.webhookPayload}>
              <h4>Webhook 會發送的資料格式：</h4>
              <pre>{JSON.stringify({
                event: 'new_registration',
                data: {
                  id: 'abc123',
                  type: 'free_lecture | enterprise_consult',
                  name: '姓名',
                  email: 'email@example.com',
                  phone: '0912-345-678',
                  company: '公司名稱',
                  team_size: '團隊人數',
                  preferred_date: '2026-04-20',
                },
                timestamp: '2026-03-20T12:00:00.000Z',
              }, null, 2)}</pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
