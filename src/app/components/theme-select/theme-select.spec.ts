import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ThemeSelect } from './theme-select';
import { ThemeService, ThemeKey } from '../../services/themeService';
import { provideHttpClient } from '@angular/common/http';

describe('ThemeSelect', () => {
  let component: ThemeSelect;
  let fixture: ComponentFixture<ThemeSelect>;
  let mockThemeService: jasmine.SpyObj<ThemeService>;

  beforeEach(async () => {
    mockThemeService = jasmine.createSpyObj('ThemeService', [
      'getThemes',
      'getCurrentTheme',
      'setTheme',
    ]);

    mockThemeService.getThemes.and.returnValue([
      { value: 'light', label: 'Light' },
      { value: 'dark', label: 'Dark' },
    ]);
    mockThemeService.getCurrentTheme.and.returnValue('light');

    await TestBed.configureTestingModule({
      imports: [ThemeSelect],
      providers: [{ provide: ThemeService, useValue: mockThemeService }, provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(ThemeSelect);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load themes on initialization', () => {
    expect(component.themes).toEqual([
      { value: 'light', label: 'Light' },
      { value: 'dark', label: 'Dark' },
    ]);
    expect(mockThemeService.getThemes).toHaveBeenCalled();
  });

  it('should load current theme on initialization', () => {
    expect(component.selectedTheme).toBe('light');
    expect(mockThemeService.getCurrentTheme).toHaveBeenCalled();
  });

  it('should change theme when onThemeChange is called', () => {
    component.onThemeChange('dark');

    expect(component.selectedTheme).toBe('dark');
    expect(mockThemeService.setTheme).toHaveBeenCalledWith('dark');
  });

  it('should handle theme changes correctly', () => {
    component.onThemeChange('auto');
    expect(component.selectedTheme).toBe('auto');

    component.onThemeChange('light');
    expect(component.selectedTheme).toBe('light');

    expect(mockThemeService.setTheme).toHaveBeenCalledTimes(2);
  });
});
