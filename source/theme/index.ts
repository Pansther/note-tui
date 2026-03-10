import {create} from 'zustand';
import {immer} from 'zustand/middleware/immer';

import {themes} from './config.js';

import {AvailableTheme, ThemeConfig} from './type.js';

interface Store {
	theme: AvailableTheme;
	themeConfig: ThemeConfig;
	setTheme: (theme: AvailableTheme) => void;
}

const useTheme = create<Store>()(
	immer(set => ({
		theme: AvailableTheme.Catppuccin,
		themeConfig: themes[AvailableTheme.Catppuccin],
		setTheme: theme =>
			set(state => {
				state.theme = theme;
				state.themeConfig = themes[theme];
			}),
	})),
);

export default useTheme;
