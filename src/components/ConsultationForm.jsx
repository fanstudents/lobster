'use client';

import { useState, useEffect } from 'react';
import { Send, Check, AlertCircle, Loader2, CalendarDays, ArrowRight } from 'lucide-react';
import styles from './ConsultationForm.module.css';

const teamSizeOptions = [
  '1–5 人',
  '6–20 人',
  '21–50 人',
  '51–100 人',
  '100 人以上',
];

function formatDate(dateStr) {
  const d = new Date(dateStr + 'T00:00:00');
  const weekdays = ['日', '一', '二', '三', '四', '五', '六'];
  const m = d.getMonth() + 1;
  const day = d.getDate();
  const w = weekdays[d.getDay()];
  return `${m}/${day}（${w}）`;
}

export default function ConsultationForm() {
  const [expanded, setExpanded] = useState(false);
  const [availableDates, setAvailableDates] = useState([]);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    teamSize: '',
    preferredDate: '',
  });
  const [status, setStatus] = useState('idle');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (expanded) {
      fetch('/api/dates')
        .then((res) => res.json())
        .then((data) => {
          if (data.dates) {
            setAvailableDates(data.dates.filter((d) => !d.full));
          }
        })
        .catch((err) => console.error('Failed to load dates:', err));
    }
  }, [expanded]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    if (!form.name || !form.email || !form.phone || !form.company || !form.teamSize) {
      setStatus('error');
      setErrorMsg('請填寫所有必填欄位');
      return;
    }

    if (!form.email.includes('@') || !form.email.includes('.')) {
      setStatus('error');
      setErrorMsg('請輸入正確的信箱格式');
      return;
    }

    const record = {
      type: 'enterprise_consult',
      name: form.name,
      email: form.email,
      phone: form.phone,
      company: form.company,
      team_size: form.teamSize,
      preferred_date: form.preferredDate || '',
    };

    try {
      const res = await fetch('/api/registrations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(record),
      });
      if (!res.ok) throw new Error('Submit failed');
      setStatus('success');
    } catch (err) {
      console.error('Form submission error:', err);
      setStatus('error');
      setErrorMsg('提交失敗，請稍後再試或直接聯繫我們');
    }
  };

  if (status === 'success') {
    return (
      <div className={styles.successCard}>
        <div className={styles.successIcon}>
          <Check size={24} />
        </div>
        <h4>預約成功</h4>
        <p>我們會在 1–2 個工作天內與你聯繫，安排諮詢時間。</p>
      </div>
    );
  }

  if (!expanded) {
    return (
      <div className={styles.expandArea}>
        <button
          className={`btn btn-enterprise btn-lg ${styles.expandBtn}`}
          onClick={() => setExpanded(true)}
        >
          <Send size={18} />
          立即預約免費諮詢
        </button>
        <a href="#live" className={styles.altLink}>
          或直接報名免費直播講座
          <ArrowRight size={14} />
        </a>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="consult-name" className={styles.label}>
            姓名 *
          </label>
          <input
            id="consult-name"
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="你的姓名"
            className={styles.input}
            required
            autoFocus
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="consult-company" className={styles.label}>
            公司名稱 *
          </label>
          <input
            id="consult-company"
            type="text"
            name="company"
            value={form.company}
            onChange={handleChange}
            placeholder="你的公司"
            className={styles.input}
            required
          />
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="consult-email" className={styles.label}>
            企業信箱 *
          </label>
          <input
            id="consult-email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="your@company.com"
            className={styles.input}
            required
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="consult-phone" className={styles.label}>
            聯繫電話 *
          </label>
          <input
            id="consult-phone"
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="0912-345-678"
            className={styles.input}
            required
          />
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="consult-teamSize" className={styles.label}>
            團隊人數 *
          </label>
          <select
            id="consult-teamSize"
            name="teamSize"
            value={form.teamSize}
            onChange={handleChange}
            className={styles.select}
            required
          >
            <option value="" disabled>請選擇</option>
            {teamSizeOptions.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
        <div className={styles.field}>
          <label htmlFor="consult-date" className={styles.label}>
            <CalendarDays size={13} style={{ marginRight: 4, verticalAlign: 'middle' }} />
            希望諮詢日期
          </label>
          <select
            id="consult-date"
            name="preferredDate"
            value={form.preferredDate}
            onChange={handleChange}
            className={styles.select}
          >
            <option value="">不指定日期</option>
            {availableDates.map((d) => (
              <option key={d.date} value={d.date}>
                {formatDate(d.date)}（剩 {d.available} 名額）
              </option>
            ))}
          </select>
        </div>
      </div>

      {status === 'error' && (
        <div className={styles.error}>
          <AlertCircle size={14} />
          <span>{errorMsg}</span>
        </div>
      )}

      <div className={styles.actions}>
        <button type="submit" className={`btn btn-enterprise ${styles.submit}`} disabled={status === 'loading'}>
          {status === 'loading' ? (
            <>
              <Loader2 size={16} className={styles.spinner} />
              送出中...
            </>
          ) : (
            <>
              <Send size={16} />
              送出預約
            </>
          )}
        </button>
        <button type="button" className={styles.cancel} onClick={() => setExpanded(false)}>
          取消
        </button>
      </div>

      <div className={styles.bottomLinks}>
        <p className={styles.privacy}>
          我們重視你的隱私，資料僅用於諮詢聯繫，絕不外洩。
        </p>
        <a href="#live" className={styles.altLink}>
          或直接報名免費直播講座 →
        </a>
      </div>
    </form>
  );
}
