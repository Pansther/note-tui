import fs from 'fs';
import path from 'path';

import {NOTES_DIR} from './file.js';
import {DEFAULT_THEME} from '../theme/index.js';

import {AvailableTheme} from '../theme/type.js';

export const saveTheme = (theme: AvailableTheme) => {
	const filePath = path.join(NOTES_DIR, '.theme.json');

	const content = JSON.stringify({theme}, null, 2);

	fs.writeFileSync(filePath, content, 'utf8');
};

export const getTheme = (): {theme: AvailableTheme} => {
	const filePath = path.join(NOTES_DIR, '.theme.json');

	try {
		const content = fs.readFileSync(filePath).toString();

		const config = JSON.parse(content);

		return config;
	} catch (error) {
		return {theme: DEFAULT_THEME};
	}
};
