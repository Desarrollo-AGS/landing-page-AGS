/**
 * Tipos mínimos de `page-flip` (StPageFlip 2.0.7).
 *
 * El paquete publica solo el JavaScript compilado, sin declaraciones. Acá se
 * declara únicamente la parte de la API que usa el librito del brochure,
 * tomada de `node_modules/page-flip/src/PageFlip.ts` y `Settings.ts`.
 */
declare module "page-flip" {
  export type Orientation = "portrait" | "landscape";
  export type FlipCorner = "top" | "bottom";

  export interface FlipSetting {
    width: number;
    height: number;
    startPage?: number;
    size?: "fixed" | "stretch";
    minWidth?: number;
    maxWidth?: number;
    minHeight?: number;
    maxHeight?: number;
    drawShadow?: boolean;
    flippingTime?: number;
    usePortrait?: boolean;
    startZIndex?: number;
    autoSize?: boolean;
    maxShadowOpacity?: number;
    showCover?: boolean;
    mobileScrollSupport?: boolean;
    clickEventForward?: boolean;
    useMouseEvents?: boolean;
    swipeDistance?: number;
    showPageCorners?: boolean;
    disableFlipByClick?: boolean;
  }

  export interface WidgetEvent {
    data: unknown;
    object: PageFlip;
  }

  export class PageFlip {
    constructor(element: HTMLElement, setting: FlipSetting);
    loadFromHTML(items: HTMLElement[] | NodeListOf<HTMLElement>): void;
    loadFromImages(imagesHref: string[]): void;
    update(): void;
    destroy(): void;
    flip(page: number, corner?: FlipCorner): void;
    flipNext(corner?: FlipCorner): void;
    flipPrev(corner?: FlipCorner): void;
    turnToPage(page: number): void;
    getPageCount(): number;
    getCurrentPageIndex(): number;
    getOrientation(): Orientation;
    on(
      evento: "flip" | "changeOrientation" | "changeState" | "init" | "update",
      callback: (e: WidgetEvent) => void,
    ): PageFlip;
    off(evento: string): void;
  }
}
