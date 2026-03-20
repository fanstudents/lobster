'use client';

import { useEffect, useRef, useState } from 'react';
import { CalendarDays, Lock, ArrowRight, Check, AlertCircle, Loader2 } from 'lucide-react';
import { trackFreeLectureSignup } from '@/lib/tracking';
import styles from './LiveEvent.module.css';

export default function LiveEvent() {
  const sectionRef = useRef(null);
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '' });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const target = new Date('2026-04-14T21:00:00+08:00');

    const tick = () => {
      const now = new Date();
      const diff = target - now;
      if (diff <= 0) return;
      setCountdown({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        mins: Math.floor((diff % 3600000) / 60000),
        secs: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

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

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    if (!form.name || !form.email || !form.phone || !form.company) {
      setStatus('error');
      setErrorMsg('請填寫所有欄位');
      return;
    }

    if (!form.email.includes('@') || !form.email.includes('.')) {
      setStatus('error');
      setErrorMsg('請輸入正確的 Email 格式');
      return;
    }

    const record = {
      type: 'free_lecture',
      name: form.name,
      email: form.email,
      phone: form.phone,
      company: form.company,
      event_date: '2026-04-14',
    };

    try {
      const res = await fetch('/api/registrations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(record),
      });
      if (!res.ok) throw new Error('Submit failed');
      setStatus('success');
      trackFreeLectureSignup({ name: form.name, email: form.email });
    } catch (err) {
      console.error('Registration error:', err);
      setStatus('error');
      setErrorMsg('提交失敗，請稍後再試');
    }
  };

  return (
    <section className={`section ${styles.section}`} id="live" ref={sectionRef}>
      <div className="container">
        <div className={`animate-in ${styles.wrapper}`}>
          <div className={styles.left}>
            <div className="section-label">免費直播講座</div>
            <h2 className={`section-title ${styles.title}`}>
              龍蝦案例分享
              <br />
              <span className="text-gradient">直播見真章</span>
            </h2>
            <p className={styles.desc}>
              4/14（一）晚上 9:00–10:00，1 小時線上直播。
              不講概念，<strong>直接展示龍蝦實戰案例</strong>。
            </p>

            <div className={styles.topics}>
              <h4>直播內容</h4>
              <ul>
                <li>真實龍蝦案例拆解與操作示範</li>
                <li>龍蝦的應用場景與實戰效果</li>
                <li>現場 Live Demo，看龍蝦怎麼自動跑起來</li>
                <li>Q&A 即時問答</li>
              </ul>
            </div>

            <div className={styles.countdown}>
              <CalendarDays size={18} className={styles.countdownIcon} />
              <div className={styles.countdownItem}>
                <span className={styles.countdownNum}>{String(countdown.days).padStart(2, '0')}</span>
                <span className={styles.countdownLabel}>天</span>
              </div>
              <span className={styles.countdownSep}>:</span>
              <div className={styles.countdownItem}>
                <span className={styles.countdownNum}>{String(countdown.hours).padStart(2, '0')}</span>
                <span className={styles.countdownLabel}>時</span>
              </div>
              <span className={styles.countdownSep}>:</span>
              <div className={styles.countdownItem}>
                <span className={styles.countdownNum}>{String(countdown.mins).padStart(2, '0')}</span>
                <span className={styles.countdownLabel}>分</span>
              </div>
              <span className={styles.countdownSep}>:</span>
              <div className={styles.countdownItem}>
                <span className={styles.countdownNum}>{String(countdown.secs).padStart(2, '0')}</span>
                <span className={styles.countdownLabel}>秒</span>
              </div>
            </div>
          </div>

          <div className={styles.right}>
            {status === 'success' ? (
              <div className={`glass-card ${styles.form}`}>
                <div className={styles.successWrap}>
                  <div className={styles.successIcon}>
                    <Check size={24} />
                  </div>
                  <h3 className={styles.formTitle}>報名成功！</h3>
                  <p className={styles.successText}>
                    我們會在直播前發送提醒通知到你的信箱。
                    <br />4/14（一）21:00 線上見！
                  </p>
                </div>
              </div>
            ) : (
              <form className={`glass-card ${styles.form}`} onSubmit={handleSubmit}>
                <h3 className={styles.formTitle}>免費報名</h3>
                <div className={styles.field}>
                  <label htmlFor="reg-name">姓名</label>
                  <input
                    type="text"
                    id="reg-name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="你的名字"
                    required
                  />
                </div>
                <div className={styles.field}>
                  <label htmlFor="reg-email">Email</label>
                  <input
                    type="email"
                    id="reg-email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    required
                  />
                </div>
                <div className={styles.field}>
                  <label htmlFor="reg-phone">電話</label>
                  <input
                    type="tel"
                    id="reg-phone"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="0912-345-678"
                    required
                  />
                </div>
                <div className={styles.field}>
                  <label htmlFor="reg-company">公司名稱</label>
                  <input
                    type="text"
                    id="reg-company"
                    name="company"
                    value={form.company}
                    onChange={handleChange}
                    placeholder="你的公司"
                    required
                  />
                </div>

                {status === 'error' && (
                  <div className={styles.errorMsg}>
                    <AlertCircle size={14} />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <button
                  type="submit"
                  className="btn btn-accent btn-lg"
                  style={{ width: '100%' }}
                  disabled={status === 'loading'}
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 size={16} className={styles.spinner} />
                      送出中...
                    </>
                  ) : (
                    <>
                      立即報名
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>
                <p className={styles.formNote}>
                  <Lock size={12} />
                  我們重視你的隱私，資料絕不外洩
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
