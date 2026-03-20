'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Check, AlertCircle, Loader2, Lock } from 'lucide-react';
import styles from './RegisterForm.module.css';

export default function RegisterForm() {
  const sectionRef = useRef(null);
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [status, setStatus] = useState('idle');
  const [errorMsg, setErrorMsg] = useState('');

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

    if (!form.name || !form.email || !form.phone) {
      setStatus('error');
      setErrorMsg('請填寫所有欄位');
      return;
    }

    if (!form.email.includes('@') || !form.email.includes('.')) {
      setStatus('error');
      setErrorMsg('請輸入正確的 Email 格式');
      return;
    }

    try {
      const res = await fetch('/api/registrations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'course_register',
          name: form.name,
          email: form.email,
          phone: form.phone,
        }),
      });

      if (!res.ok) throw new Error('Submit failed');
      setStatus('success');
    } catch (err) {
      console.error('Registration error:', err);
      setStatus('error');
      setErrorMsg('提交失敗，請稍後再試');
    }
  };

  return (
    <section className={`section ${styles.section}`} id="register" ref={sectionRef}>
      <div className="container">
        <div className={`animate-in ${styles.wrapper}`}>
          <div className={styles.left}>
            <div className="section-label">預約登記</div>
            <h2 className={`section-title ${styles.title}`}>
              AI 龍蝦課
              <br />
              <span className="text-gradient">五月班預約登記</span>
            </h2>
            <p className={styles.desc}>
              課程價格將於 <strong>4/14 免費直播講座中正式公佈</strong>。
              <br />
              先預約登記，搶先鎖定五月班名額！
            </p>
            <div className={styles.highlights}>
              <div className={styles.highlightItem}>
                <Check size={16} className={styles.highlightCheck} />
                <span>每梯次僅收 30 人</span>
              </div>
              <div className={styles.highlightItem}>
                <Check size={16} className={styles.highlightCheck} />
                <span>買一次，未來免費回訓</span>
              </div>
              <div className={styles.highlightItem}>
                <Check size={16} className={styles.highlightCheck} />
                <span>4+1 堂直播 + 實作專案</span>
              </div>
              <div className={styles.highlightItem}>
                <Check size={16} className={styles.highlightCheck} />
                <span>登記不代表付款，無壓力</span>
              </div>
            </div>
          </div>

          <div className={styles.right}>
            {status === 'success' ? (
              <div className={`glass-card ${styles.formCard}`}>
                <div className={styles.successWrap}>
                  <div className={styles.successIcon}>
                    <Check size={28} />
                  </div>
                  <h3 className={styles.successTitle}>內容已送出</h3>
                  <p className={styles.successText}>
                    請等待正式課程說明通知
                    <br />
                    我們會儘快與你聯繫！
                  </p>
                </div>
              </div>
            ) : (
              <form className={`glass-card ${styles.formCard}`} onSubmit={handleSubmit}>
                <h3 className={styles.formTitle}>預約登記五月班</h3>
                <p className={styles.formSubtitle}>留下資料，優先通知課程詳情與價格</p>

                <div className={styles.field}>
                  <label htmlFor="reg-course-name">姓名</label>
                  <input
                    type="text"
                    id="reg-course-name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="你的名字"
                    required
                  />
                </div>
                <div className={styles.field}>
                  <label htmlFor="reg-course-email">Email</label>
                  <input
                    type="email"
                    id="reg-course-email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    required
                  />
                </div>
                <div className={styles.field}>
                  <label htmlFor="reg-course-phone">電話</label>
                  <input
                    type="tel"
                    id="reg-course-phone"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="0912-345-678"
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
                  className="btn btn-primary btn-lg"
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
                      立即預約登記
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>
                <p className={styles.formNote}>
                  <Lock size={12} />
                  登記不代表付款，課程詳情將另行通知
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
