import {create} from 'zustand';
import {immer} from 'zustand/middleware/immer';

import {themes} from './config.js';

import {AvailableTheme, ThemeConfig} from './type.js';
import {getTheme, saveTheme} from '../helper/theme.js';

const DEFAULT_THEME = AvailableTheme.Catppuccin;
const ALL_THEMES = Object.values(AvailableTheme).map(Number);

interface Store {
	theme: AvailableTheme;
	themeConfig: ThemeConfig;
	setTheme: (theme: AvailableTheme) => void;
	changeTheme: (amount?: number) => void;
}

const INIT_THEME = getTheme().theme ?? DEFAULT_THEME;

const useTheme = create<Store>()(
	immer((set, get) => ({
		theme: INIT_THEME,
		themeConfig: themes[INIT_THEME],
		setTheme: theme =>
			set(state => {
				state.theme = theme;
				state.themeConfig = themes[theme];

				saveTheme(theme);
			}),
		changeTheme: (amount = 1) => {
			const nextTheme = get().theme + amount;

			if (nextTheme > ALL_THEMES.at(-1)) {
				get().setTheme(DEFAULT_THEME);
			} else if (nextTheme < DEFAULT_THEME) {
				get().setTheme(ALL_THEMES.at(-1));
			} else {
				get().setTheme(nextTheme);
			}
		},
	})),
);

export default useTheme;
