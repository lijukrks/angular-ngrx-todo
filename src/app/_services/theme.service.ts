import { Injectable } from '@angular/core';

export const DARK_THEME = {
  'primary-color': '#455363',
  'background-color': '#1f2935',
  'text-color': '#fff',
  'card-color': '#9b142a'
};

export const LIGHT_THEME = {
  'primary-color': '#fff',
  'background-color': '#e5e5e5',
  'text-color': '#2d2d2d',
  'card-color': '#ffff'
};

@Injectable({ providedIn: 'root' })
export class ThemeService {
  toggleDark() {
    this.setTheme(DARK_THEME);
  }

  toggleLight() {
    this.setTheme(LIGHT_THEME);
  }

  private setTheme(theme: {}) {
    Object.keys(theme).forEach(k =>
      document.documentElement.style.setProperty(`--${k}`, theme[k])
    );
  }
}

