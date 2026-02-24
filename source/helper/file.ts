import os from 'os';
import fs from 'fs';
import path from 'path';

export const NOTES_DIR = path.join(os.homedir(), '.notes');

export const getNotesFromDisk = () => {
	if (!fs.existsSync(NOTES_DIR)) fs.mkdirSync(NOTES_DIR);

	const files = fs.readdirSync(NOTES_DIR).filter(file => file.endsWith('.md'));

	const notesList = files?.map(filename => {
		const filePath = path.join(NOTES_DIR, filename);
		const content = fs.readFileSync(filePath, 'utf-8');

		const firstLine = content.split('\n')[0];

		let label = firstLine?.replace(/^#\s*/, '').trim();

		if (!label) label = filename.replace('.md', '');

		return {
			label,
			filename,
		};
	});

	return notesList;
};

export const saveNote = (title: string, content: string) => {
	if (!fs.existsSync(NOTES_DIR)) {
		fs.mkdirSync(NOTES_DIR);
	}

	const filename = title.toLowerCase().replace(/\s+/g, '-');
	const filePath = path.join(NOTES_DIR, filename);

	fs.writeFileSync(filePath, content, 'utf8');

	return filename;
};

export const getFileContent = (filename: string) => {
	const filePath = path.join(NOTES_DIR, filename);

	try {
		const content = fs.readFileSync(filePath, 'utf-8');

		return content;
	} catch (error) {
		return null;
	}
};
