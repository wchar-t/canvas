import { useRouter } from 'next/router';
import React, { useEffect, useRef } from 'react';
import { fabric } from 'fabric'; // v6
import BoardButton from '../../components/BoardButton';
import styles from '../../styles/Board.module.css';
import Icon from '../../components/Icon';

export default function Board() {
  const router = useRouter();
  const { id } = router.query;
  const canvasEl = useRef<HTMLCanvasElement>(null);
  const canvas = useRef<fabric.Canvas>();

  useEffect(() => {
    if (!canvasEl.current) return () => {};

    canvasEl.current?.setAttribute('width', (canvasEl?.current.parentElement?.clientWidth || 0).toString());
    canvasEl.current?.setAttribute('height', (canvasEl?.current.parentElement?.clientHeight || 0).toString());
    canvas.current = new fabric.Canvas(canvasEl.current, {});
    // make the fabric.Canvas instance available to your app
    // fabric.updateCanvasContext(canvas);
    return () => {
      // updateCanvasContext(null);
      canvas.current?.dispose();
    };
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.menu}> </div>
      <div className={styles['drawing-menu']}>
        <div className={styles.center}>
          <BoardButton label={<Icon name="arrow-pointer" />} onClick={() => {}} isActive />
          <BoardButton label={<Icon name="eraser" />} onClick={() => {}} />
          <div className={styles['drawing-menu-separator']}> </div>
          <BoardButton label={<Icon name="pencil" />} onClick={() => {}} />
        </div>
      </div>
      <div className={styles.content}>
        <canvas style={{ height: '100%', width: '100%' }} ref={canvasEl} />
      </div>
    </div>
  );
}
