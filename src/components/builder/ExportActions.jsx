'use client';

import { useCallback, useRef } from 'react';
import { Download } from 'lucide-react';
import styles from './ExportActions.module.css';

export default function ExportActions({ canvasRef }) {
  const downloadPNG = useCallback(async () => {
    const svgEl = canvasRef?.current?.querySelector('svg');
    if (!svgEl) return;

    const svgData = new XMLSerializer().serializeToString(svgEl);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
      canvas.width = img.width * 2;
      canvas.height = img.height * 2;
      ctx.fillStyle = '#faf8f5';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);

      const a = document.createElement('a');
      a.download = 'lobster-workflow.png';
      a.href = canvas.toDataURL('image/png');
      a.click();
    };

    img.src = url;
  }, [canvasRef]);

  return (
    <div className={styles.actions}>
      <button className={styles.btn} onClick={downloadPNG}>
        <Download size={16} />
        下載 PNG
      </button>
    </div>
  );
}
