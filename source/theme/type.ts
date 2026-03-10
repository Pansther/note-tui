export interface ThemeConfig {
	backgroundColor: string;
	foregroundColor: string;
	accentColor: string;
	secondaryColor: string;
	errorColor: string;
	textColor: string;
	borderColor: string;
}

export enum AvailableTheme {
	Catppuccin = 1,
	Everforest,
	Gruvbox,
	Rosepine,
	Tokyonight,
	Nord,
	Monokai,
	Dracula,
}

export type Themes = Record<AvailableTheme, ThemeConfig>;
