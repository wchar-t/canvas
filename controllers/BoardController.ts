import { fabric } from 'fabric';

export default class BoardController {
  private canvas: React.MutableRefObject<fabric.Canvas | undefined>;

  constructor(canvas: React.MutableRefObject<fabric.Canvas | undefined>) {
    this.canvas = canvas;
  }

  setPointer() {
    if (!this.canvas.current) return;
    this.canvas.current.isDrawingMode = false;
  }

  setPencil() {
    if (!this.canvas.current) return;
    this.canvas.current.isDrawingMode = true;
  }

  clearCanvas() {
    if (!this.canvas.current) return;
    this.canvas.current.clear();
  }
}
