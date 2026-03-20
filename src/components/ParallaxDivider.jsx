'use client';

import ParallaxSection from './ParallaxSection';
import styles from './ParallaxDivider.module.css';

export default function ParallaxDivider({ text, variant = 'primary' }) {
  return (
    <ParallaxSection speed={0.5} className={styles.wrapper}>
      <div className={`${styles.divider} ${styles[variant]}`}>
        <div className={styles.line} />
        {text && <span className={styles.text}>{text}</span>}
        <div className={styles.line} />
      </div>
    </ParallaxSection>
  );
}
