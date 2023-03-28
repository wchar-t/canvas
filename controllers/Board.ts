import Api from '../lib/api';

export default class BoardController {
  private canvas: React.MutableRefObject<fabric.Canvas>;

  constructor(canvas: React.MutableRefObject<fabric.Canvas | undefined>) {
    this.canvas = canvas as React.MutableRefObject<fabric.Canvas>;
  }

  setupCanvas() {
    this.canvas.current.freeDrawingBrush.color = '#fff';
    this.canvas.current.freeDrawingBrush.width = 5;
    document.addEventListener('keyup', (e) => this.documentOnKeyUp(e));
  }

  documentOnKeyUp(e: KeyboardEvent) {
    if (e.key === 'Delete') {
      const objects = this.canvas.current?.getActiveObjects();

      objects?.forEach((object) => {
        this.canvas.current?.remove(object);
      });

      if (objects?.length) {
        this.canvas.current?.discardActiveObject().renderAll();
      }
    } else if (e.key === '+') {
      this.canvas.current.freeDrawingBrush.width += 5;
    } else if (e.key === '-') {
      this.canvas.current.freeDrawingBrush.width -= 5;
    }
  }

  setPointer() {
    if (!this.canvas.current) return;
    this.canvas.current.isDrawingMode = false;
  }

  setPencil() {
    if (!this.canvas.current) return;
    this.canvas.current.isDrawingMode = true;
    this.canvas.current.freeDrawingBrush.color = '#fff';
    this.canvas.current.freeDrawingBrush.width = 5;
  }

  setEraser() {
    if (!this.canvas.current) return;
    this.canvas.current.isDrawingMode = true;
    this.canvas.current.freeDrawingBrush.color = '#1d1e22';
    this.canvas.current.freeDrawingBrush.width = 5;
  }

  clearCanvas() {
    if (!this.canvas.current) return;
    this.canvas.current.clear();
  }

  async resumeCanvas(id: string) {
    const { result } = await Api.getBoard(id);

    if (!result) return;

    this.canvas.current?.loadFromJSON(result, () => {
      this.canvas.current?.renderAll();
    });
  }

  async saveCanvas(id: string) {
    await Api.saveBoard(id, this.canvas.current?.toJSON());
  }
}
