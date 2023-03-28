import Api from '../lib/api';

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
