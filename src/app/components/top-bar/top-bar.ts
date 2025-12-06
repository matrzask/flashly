import { Component } from '@angular/core';
import { LoginButtons } from '../login-buttons/login-buttons';
import { RouterModule } from '@angular/router';
import { ThemeSelect } from '../theme-select/theme-select';

@Component({
  selector: 'app-top-bar',
  imports: [LoginButtons, RouterModule, ThemeSelect],
  templateUrl: './top-bar.html',
  styleUrl: './top-bar.scss',
})
export class TopBar {}
