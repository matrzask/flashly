import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService, ThemeOption, ThemeKey } from '../../services/themeService';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-theme-select',
  imports: [CommonModule, FormsModule],
  templateUrl: './theme-select.html',
  styleUrl: './theme-select.scss',
})
export class ThemeSelect {
  themes: ThemeOption[] = [];
  selectedTheme: ThemeKey = 'light';

  constructor(private themeService: ThemeService) {
    this.themes = this.themeService.getThemes();
    this.selectedTheme = this.themeService.getCurrentTheme();
  }

  onThemeChange(value: string) {
    const theme = value as ThemeKey;
    this.selectedTheme = theme;
    this.themeService.setTheme(theme);
  }
}
