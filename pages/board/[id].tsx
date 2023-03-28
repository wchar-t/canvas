import { useRouter } from 'next/router';
import dynamic from 'next/dynamic'
import React, { useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';
import BoardButton, { styles as BoardButtonStyles } from '../../components/BoardButton';
import styles from '../../styles/Board.module.css';
import Icon from '../../components/Icon';
import BoardController from '../../controllers/BoardController';

const TopMenu = dynamic(() => import('../../components/TopMenu'), {
  ssr: false,
});

export default function Board() {
  const router = useRouter();
  const { id } = router.query;
  const canvasEl = useRef<HTMLCanvasElement>(null);
  const controlsEl = useRef<HTMLDivElement>(null);
  const canvas = useRef<fabric.Canvas>();
  const controller = new BoardController(canvas);

  useEffect(() => {
    if (!canvasEl.current || !controlsEl.current || !router.isReady) return () => {};

    canvasEl.current?.setAttribute('width', (canvasEl.current?.parentElement?.clientWidth || 0).toString());
    canvasEl.current?.setAttribute('height', ((canvasEl.current?.parentElement?.clientHeight || 0) - 60).toString());
    canvas.current = new fabric.Canvas(canvasEl.current, {});

    // controller.current = new BoardController(canvas);
    // canvas.current.isDrawingMode = true;
    canvas.current.freeDrawingBrush.color = '#fff';
    canvas.current.freeDrawingBrush.width = 5;

    controlsEl.current.querySelectorAll('button').forEach((e) => {
      e.addEventListener('click', () => {
        controlsEl.current?.querySelectorAll('button').forEach((ee) => {
          ee.classList.remove(BoardButtonStyles.active);
        });
        e.classList.add(BoardButtonStyles.active);
      });
    });

    controller.resumeCanvas(id as string);

    return () => {
      canvas.current?.dispose();
    };
  }, [router.isReady]);

  return (
    <div className={styles.page}>
      <TopMenu />
      <div className={styles['drawing-menu']}>
        <div style={{ marginLeft: 15 }}> </div>
        <BoardButton label={<Icon name="floppy-disk" type="solid" />} onClick={() => controller.saveCanvas(id as string)} />
        <div className={styles.controls} ref={controlsEl}>
          <BoardButton label={<Icon name="arrow-pointer" />} onClick={() => controller.setPointer()} isActive />
          { /* <BoardButton label={<Icon name="eraser" />} onClick={() => {}} /> */ }
          <div className={styles['drawing-menu-separator']}> </div>
          <BoardButton label={<Icon name="paintbrush" type="solid" />} onClick={() => controller.setPencil()} />
          <BoardButton label={<Icon name="marker" type="solid" />} onClick={() => {}} />
          <BoardButton label={<Icon name="slash" type="solid" />} onClick={() => {}} />
          <BoardButton label={<Icon name="shapes" type="solid" />} onClick={() => {}} />
          <BoardButton label={<Icon name="text" type="solid" />} onClick={() => {}} />
        </div>
        <BoardButton label={<Icon name="reply" type="solid" />} onClick={() => {}} />
        <div className={styles['drawing-menu-separator']}> </div>
        <BoardButton label={<Icon name="trash" type="solid" />} onClick={() => controller.clearCanvas()} />
        <div style={{ marginRight: 15 }}> </div>
      </div>
      <div className={styles.content}>
        <canvas style={{ height: '100%', width: '100%' }} ref={canvasEl} />
      </div>
    </div>
  );
}
