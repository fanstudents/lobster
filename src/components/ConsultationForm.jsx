'use client';

import { useState, useEffect, useMemo } from 'react';
import {
  Send, Check, AlertCircle, Loader2, CalendarDays,
  ArrowRight, ChevronLeft, ChevronRight, Clock,
} from 'lucide-react';
import styles from './ConsultationForm.module.css';

const teamSizeOptions = [
  '1–5 人',
  '6–20 人',
  '21–50 人',
  '51–100 人',
  '100 人以上',
];

const WEEKDAY_HEADERS = ['日', '一', '二', '三', '四', '五', '六'];
const MONTH_NAMES = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];

function toDateStr(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function formatDateShort(dateStr) {
  const d = new Date(dateStr + 'T00:00:00');
  const weekdays = ['日', '一', '二', '三', '四', '五', '六'];
  return `${d.getMonth() + 1}/${d.getDate()}（${weekdays[d.getDay()]}）`;
}

/* ===== Calendar Grid ===== */
function CalendarPicker({ dateMap, selectedDate, onSelectDate }) {
  const dateKeys = Object.keys(dateMap);

  const [viewDate, setViewDate] = useState(() => {
    if (dateKeys.length > 0) {
      const d = new Date(dateKeys[0] + 'T00:00:00');
      return new Date(d.getFullYear(), d.getMonth(), 1);
    }
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prevMonth = () => setViewDate(new Date(year, month - 1, 1));
  const nextMonth = () => setViewDate(new Date(year, month + 1, 1));

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <div className={styles.calendar}>
      <div className={styles.calendarHeader}>
        <button type="button" className={styles.calendarNav} onClick={prevMonth}>
          <ChevronLeft size={16} />
        </button>
        <span className={styles.calendarTitle}>
          {year} 年 {MONTH_NAMES[month]}
        </span>
        <button type="button" className={styles.calendarNav} onClick={nextMonth}>
          <ChevronRight size={16} />
        </button>
      </div>
      <div className={styles.calendarWeekdays}>
        {WEEKDAY_HEADERS.map((w) => (
          <span key={w} className={styles.calendarWeekday}>{w}</span>
        ))}
      </div>
      <div className={styles.calendarGrid}>
        {cells.map((day, i) => {
          if (day === null) {
            return <span key={`empty-${i}`} className={styles.calendarEmpty} />;
          }
          const dateStr = toDateStr(new Date(year, month, day));
          const info = dateMap[dateStr];
          const isInRange = !!info;
          const allBusy = info?.allBusy;
          const isSelected = selectedDate === dateStr;
          const hasSlots = isInRange && !allBusy;

          let cellClass = styles.calendarDay;
          if (!isInRange) cellClass += ` ${styles.calendarDayOutOfRange}`;
          else if (allBusy) cellClass += ` ${styles.calendarDayBusy}`;
          else cellClass += ` ${styles.calendarDayAvailable}`;
          if (isSelected) cellClass += ` ${styles.calendarDaySelected}`;

          return (
            <button
              key={dateStr}
              type="button"
              className={cellClass}
              disabled={!hasSlots}
              onClick={() => onSelectDate(isSelected ? '' : dateStr)}
              title={
                allBusy ? '無可選時段' : hasSlots ? `${info.availableCount} 個可選時段` : ''
              }
            >
              <span className={styles.calendarDayNum}>{day}</span>
              {hasSlots && (
                <span className={styles.calendarDaySlots}>
                  {info.availableCount}格
                </span>
              )}
              {allBusy && isInRange && <span className={styles.calendarDayTag}>滿</span>}
            </button>
          );
        })}
      </div>
      <div className={styles.calendarLegend}>
        <span><span className={styles.legendDotAvailable} /> 可預約</span>
        <span><span className={styles.legendDotBusy} /> 無時段</span>
      </div>
    </div>
  );
}

/* ===== Time Slot Picker ===== */
function TimeSlotPicker({ slots, selectedSlot, onSelectSlot }) {
  // Group into morning (09-17) and evening (21-24)
  const morning = slots.filter((s) => s.hour >= 9 && s.hour < 17);
  const evening = slots.filter((s) => s.hour >= 21);

  const renderSlot = (slot) => {
    const isSelected = selectedSlot === slot.label;
    let cls = styles.timeSlot;
    if (!slot.available) cls += ` ${styles.timeSlotDisabled}`;
    if (isSelected) cls += ` ${styles.timeSlotSelected}`;

    return (
      <button
        key={slot.hour}
        type="button"
        className={cls}
        disabled={!slot.available}
        onClick={() => onSelectSlot(isSelected ? '' : slot.label)}
        title={slot.busy ? '日曆忙碌' : slot.past ? '已過時段' : ''}
      >
        <Clock size={12} />
        <span>{slot.label}</span>
        {slot.busy && <span className={styles.timeSlotTag}>忙</span>}
      </button>
    );
  };

  return (
    <div className={styles.timePicker}>
      <div className={styles.timeGroup}>
        <div className={styles.timeGroupLabel}>☀️ 上午 / 下午 (09:00–17:00)</div>
        <div className={styles.timeSlotGrid}>
          {morning.map(renderSlot)}
        </div>
      </div>
      <div className={styles.timeGroup}>
        <div className={styles.timeGroupLabel}>🌙 晚間 (21:00–24:00)</div>
        <div className={styles.timeSlotGrid}>
          {evening.map(renderSlot)}
        </div>
      </div>
    </div>
  );
}

/* ===== Main Form ===== */
export default function ConsultationForm() {
  const [expanded, setExpanded] = useState(false);
  const [calData, setCalData] = useState(null);
  const [loadingCal, setLoadingCal] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    teamSize: '',
    preferredDate: '',
    preferredSlot: '',
  });
  const [status, setStatus] = useState('idle');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (expanded && !calData) {
      setLoadingCal(true);
      fetch('/api/calendar-availability')
        .then((res) => res.json())
        .then((data) => setCalData(data))
        .catch((err) => console.error('Failed to load slots:', err))
        .finally(() => setLoadingCal(false));
    }
  }, [expanded, calData]);

  const dateMap = useMemo(() => {
    if (!calData?.dates) return {};
    const map = {};
    calData.dates.forEach((d) => { map[d.date] = d; });
    return map;
  }, [calData]);

  const selectedDateSlots = form.preferredDate && dateMap[form.preferredDate]
    ? dateMap[form.preferredDate].slots
    : null;

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleDateSelect = (date) => {
    setForm((prev) => ({ ...prev, preferredDate: date, preferredSlot: '' }));
  };

  const handleSlotSelect = (slot) => {
    setForm((prev) => ({ ...prev, preferredSlot: slot }));
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

    if (!form.preferredDate || !form.preferredSlot) {
      setStatus('error');
      setErrorMsg('請選擇諮詢日期與時段');
      return;
    }

    const record = {
      type: 'enterprise_consult',
      name: form.name,
      email: form.email,
      phone: form.phone,
      company: form.company,
      team_size: form.teamSize,
      preferred_date: form.preferredDate,
      preferred_slot: form.preferredSlot,
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
        <p>
          已為您預留 {formatDateShort(form.preferredDate)} {form.preferredSlot} 的諮詢時段。
          <br />我們會在 1 個工作天內寄出確認信。
        </p>
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
      {/* ===== Step 1: Pick a Date ===== */}
      <div className={styles.field}>
        <label className={styles.label}>
          <CalendarDays size={13} style={{ marginRight: 4 }} />
          選擇諮詢日期 *
          {form.preferredDate && (
            <span className={styles.selectedDateLabel}>
              — {formatDateShort(form.preferredDate)}
            </span>
          )}
        </label>
        {loadingCal ? (
          <div className={styles.calendarLoading}>
            <Loader2 size={18} className={styles.spinner} />
            <span>載入可預約時段中…</span>
          </div>
        ) : (
          <CalendarPicker
            dateMap={dateMap}
            selectedDate={form.preferredDate}
            onSelectDate={handleDateSelect}
          />
        )}
      </div>

      {/* ===== Step 2: Pick a Time Slot ===== */}
      {form.preferredDate && selectedDateSlots && (
        <div className={styles.field}>
          <label className={styles.label}>
            <Clock size={13} style={{ marginRight: 4 }} />
            選擇時段 *
            {form.preferredSlot && (
              <span className={styles.selectedDateLabel}>
                — {form.preferredSlot}
              </span>
            )}
          </label>
          <TimeSlotPicker
            slots={selectedDateSlots}
            selectedSlot={form.preferredSlot}
            onSelectSlot={handleSlotSelect}
          />
        </div>
      )}

      {/* ===== Step 3: Personal Info (shown after time slot selected) ===== */}
      {form.preferredSlot && (
        <>
          <div className={styles.row}>
            <div className={styles.field}>
              <label htmlFor="consult-name" className={styles.label}>姓名 *</label>
              <input
                id="consult-name" type="text" name="name"
                value={form.name} onChange={handleChange}
                placeholder="你的姓名" className={styles.input}
                required autoFocus
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="consult-company" className={styles.label}>公司名稱 *</label>
              <input
                id="consult-company" type="text" name="company"
                value={form.company} onChange={handleChange}
                placeholder="你的公司" className={styles.input}
                required
              />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label htmlFor="consult-email" className={styles.label}>企業信箱 *</label>
              <input
                id="consult-email" type="email" name="email"
                value={form.email} onChange={handleChange}
                placeholder="your@company.com" className={styles.input}
                required
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="consult-phone" className={styles.label}>聯繫電話 *</label>
              <input
                id="consult-phone" type="tel" name="phone"
                value={form.phone} onChange={handleChange}
                placeholder="0912-345-678" className={styles.input}
                required
              />
            </div>
          </div>

          <div className={styles.field}>
            <label htmlFor="consult-teamSize" className={styles.label}>團隊人數 *</label>
            <select
              id="consult-teamSize" name="teamSize"
              value={form.teamSize} onChange={handleChange}
              className={styles.select} required
            >
              <option value="" disabled>請選擇</option>
              {teamSizeOptions.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
        </>
      )}

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
