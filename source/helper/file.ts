import os from 'os';
import fs from 'fs';
import path from 'path';

import type {ListItem, NoteMetadata} from '../store/type.js';

export const NOTES_DIR = path.join(os.homedir(), '.notes');
export const TRASH_DIR = path.join(NOTES_DIR, '.trash');
export const META_DIR = path.join(NOTES_DIR, '.meta');
export const META_TRASH_DIR = path.join(NOTES_DIR, '.trash', '.meta');

export const getNotesFromDisk = (dir = NOTES_DIR): ListItem[] => {
	if (!fs.existsSync(dir)) fs.mkdirSync(dir);

	const files = fs.readdirSync(dir).filter(file => file.endsWith('.md'));

	const notesList = files?.map(filename => {
		const filePath = path.join(dir, filename);
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
	if (!fs.existsSync(NOTES_DIR)) fs.mkdirSync(NOTES_DIR);

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

export const moveFileToTrash = (filename: string) => {
	if (!fs.existsSync(TRASH_DIR)) {
		fs.mkdirSync(TRASH_DIR, {recursive: true});
	}

	const oldPath = path.join(NOTES_DIR, filename);
	const newPath = path.join(TRASH_DIR, filename);

	try {
		if (fs.existsSync(oldPath)) {
			fs.renameSync(oldPath, newPath);
		}
	} catch (error) {
		//
	}
};

export const moveMetaToTrash = (filename: string) => {
	if (!fs.existsSync(META_TRASH_DIR)) {
		fs.mkdirSync(META_TRASH_DIR);
	}

	const metaFilename = filename.replace('.md', '.json');
	const metaOldPath = path.join(META_DIR, metaFilename);
	const metaNewPath = path.join(META_TRASH_DIR, metaFilename);

	const fileMeta = getFileMeta(metaFilename);
	const metadata = JSON.parse(fileMeta || '{}') as NoteMetadata;

	metadata.deletedDate = new Date().toISOString();

	fs.writeFileSync(metaOldPath, JSON.stringify(metadata, null, 2), 'utf8');

	try {
		if (fs.existsSync(META_TRASH_DIR)) {
			fs.renameSync(metaOldPath, metaNewPath);
		}
	} catch (error) {
		//
	}
};

export const saveMeta = (filename: string) => {
	if (!fs.existsSync(META_DIR)) fs.mkdirSync(META_DIR);

	const metaFilename = filename?.replace('.md', '.json');
	const filePath = path.join(META_DIR, metaFilename);

	const metadata = {
		createdDate: new Date().toISOString(),
		updatedDate: new Date().toISOString(),
	};

	fs.writeFileSync(filePath, JSON.stringify(metadata, null, 2), 'utf8');
};

export const updateMeta = (filename: string) => {
	const metaFilename = filename?.replace('.md', '.json');
	const filePath = path.join(META_DIR, metaFilename);

	const fileMeta = getFileMeta(metaFilename);
	const metadata = JSON.parse(fileMeta || '{}') as NoteMetadata;

	metadata.updatedDate = new Date().toISOString();

	fs.writeFileSync(filePath, JSON.stringify(metadata, null, 2), 'utf8');

	return filename;
};

export const getFileMeta = (filename: string) => {
	const metaFilename = filename?.replace('.md', '.json');
	const filePath = path.join(META_DIR, metaFilename);

	try {
		const meta = fs.readFileSync(filePath, 'utf-8');

		return meta;
	} catch (error) {
		return null;
	}
};
