import { Injectable } from '@angular/core';

export type ThemeKey = 'light' | 'dark';

export interface ThemeOption {
  value: ThemeKey;
  label: string;
}

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly STORAGE_KEY = 'flashly-theme';

  private readonly themes: ThemeOption[] = [
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' },
  ];

  constructor() {
    const stored = this.getStoredTheme();
    this.applyTheme(stored ?? 'light');
  }

  getThemes(): ThemeOption[] {
    return this.themes;
  }

  getCurrentTheme(): ThemeKey {
    return (this.getStoredTheme() ?? 'light') as ThemeKey;
  }

  setTheme(theme: ThemeKey): void {
    this.storeTheme(theme);
    this.applyTheme(theme);
  }

  private getStoredTheme(): ThemeKey | null {
    if (typeof localStorage === 'undefined') return null;
    const value = localStorage.getItem(this.STORAGE_KEY);
    return (value as ThemeKey) ?? null;
  }

  private storeTheme(theme: ThemeKey): void {
    if (typeof localStorage === 'undefined') return;
    localStorage.setItem(this.STORAGE_KEY, theme);
  }

  private applyTheme(theme: ThemeKey): void {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
  }
}
