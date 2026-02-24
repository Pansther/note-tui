import fs from 'fs';
import path from 'path';
import {execSync, spawnSync} from 'child_process';

import {NOTES_DIR} from './file.js';

const getAvailableEditor = () => {
	try {
		execSync('which nvim', {stdio: 'ignore'});
		return 'nvim';
	} catch {
		try {
			execSync('which vim', {stdio: 'ignore'});
			return 'vim';
		} catch {
			return 'vi';
		}
	}
};

export const openEditor = (filename = '') => {
	const editor = getAvailableEditor();
	const filePath = path.join(NOTES_DIR, filename);

	if (!fs.existsSync(NOTES_DIR)) fs.mkdirSync(NOTES_DIR);

	if (!fs.existsSync(filePath)) fs.writeFileSync(filePath, '');

	spawnSync(editor, [filePath], {stdio: 'inherit'});

	const updatedContent = fs.readFileSync(filePath, 'utf-8');

	return updatedContent;
};
