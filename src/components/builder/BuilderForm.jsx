'use client';

import { Plus, Minus } from 'lucide-react';
import styles from './BuilderForm.module.css';

export default function BuilderForm({ data, onChange }) {
  const update = (key, value) => onChange({ ...data, [key]: value });

  const updateListItem = (key, index, value) => {
    const list = [...data[key]];
    list[index] = value;
    update(key, list);
  };

  const addItem = (key, max = 5) => {
    if (data[key].length >= max) return;
    update(key, [...data[key], '']);
  };

  const removeItem = (key, index) => {
    if (data[key].length <= 1) return;
    update(key, data[key].filter((_, i) => i !== index));
  };

  return (
    <div className={styles.form}>
      <div className={styles.row}>
        <label className={styles.label}>公司 / 部門名稱</label>
        <input
          className={styles.input}
          type="text"
          value={data.title}
          onChange={(e) => update('title', e.target.value)}
          placeholder="例：行銷部"
        />
      </div>

      <div className={styles.row}>
        <label className={styles.label}>工作目標</label>
        <input
          className={styles.input}
          type="text"
          value={data.subtitle}
          onChange={(e) => update('subtitle', e.target.value)}
          placeholder="例：自動化社群發文與數據分析"
        />
      </div>

      {/* Data Sources */}
      <div className={styles.row}>
        <div className={styles.labelRow}>
          <label className={styles.label}>資料來源</label>
          <button
            className={styles.addBtn}
            onClick={() => addItem('sources', 5)}
            disabled={data.sources.length >= 5}
          >
            <Plus size={14} /> 新增
          </button>
        </div>
        {data.sources.map((s, i) => (
          <div key={i} className={styles.listItem}>
            <input
              className={styles.input}
              type="text"
              value={s}
              onChange={(e) => updateListItem('sources', i, e.target.value)}
              placeholder={`資料來源 ${i + 1}（例：CRM、GA4）`}
            />
            {data.sources.length > 1 && (
              <button className={styles.removeBtn} onClick={() => removeItem('sources', i)}>
                <Minus size={14} />
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Tasks */}
      <div className={styles.row}>
        <div className={styles.labelRow}>
          <label className={styles.label}>處理任務</label>
          <button
            className={styles.addBtn}
            onClick={() => addItem('tasks', 3)}
            disabled={data.tasks.length >= 3}
          >
            <Plus size={14} /> 新增
          </button>
        </div>
        {data.tasks.map((t, i) => (
          <div key={i} className={styles.listItem}>
            <input
              className={styles.input}
              type="text"
              value={t}
              onChange={(e) => updateListItem('tasks', i, e.target.value)}
              placeholder={`任務 ${i + 1}（例：數據清洗）`}
            />
            {data.tasks.length > 1 && (
              <button className={styles.removeBtn} onClick={() => removeItem('tasks', i)}>
                <Minus size={14} />
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Outputs */}
      <div className={styles.row}>
        <div className={styles.labelRow}>
          <label className={styles.label}>輸出對象</label>
          <button
            className={styles.addBtn}
            onClick={() => addItem('outputs', 5)}
            disabled={data.outputs.length >= 5}
          >
            <Plus size={14} /> 新增
          </button>
        </div>
        {data.outputs.map((o, i) => (
          <div key={i} className={styles.listItem}>
            <input
              className={styles.input}
              type="text"
              value={o}
              onChange={(e) => updateListItem('outputs', i, e.target.value)}
              placeholder={`輸出 ${i + 1}（例：行銷經理、LINE 群組）`}
            />
            {data.outputs.length > 1 && (
              <button className={styles.removeBtn} onClick={() => removeItem('outputs', i)}>
                <Minus size={14} />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
