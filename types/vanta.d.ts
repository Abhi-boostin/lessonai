interface VantaOptions {
  el: HTMLElement;
  mouseControls: boolean;
  touchControls: boolean;
  gyroControls: boolean;
  minHeight: number;
  minWidth: number;
  amplitudeFactor: number;
  size: number;
}

interface VantaAPI {
  HALO: (options: VantaOptions) => VantaEffect;
}

declare global {
  interface Window {
    VANTA: VantaAPI;
  }
}

export {}; 