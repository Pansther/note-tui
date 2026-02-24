import {useEffect} from 'react';
import dayjs from 'dayjs';
import {useInput} from 'ink';
import {useShallow} from 'zustand/shallow';

import useStore from '../store/index.js';

import {openEditor} from '../helper/editor.js';
import {getFileContent, saveNote} from '../helper/file.js';

const useNavigation = () => {
	const {
		list,
		selectedIndex,
		next,
		prev,
		create,
		goLast,
		goFirst,
		reHydrate,
		setPreviewContent,
	} = useStore(
		useShallow(s => ({
			list: s.list,
			selectedIndex: s.selectedIndex,
			next: s.next,
			prev: s.prev,
			create: s.create,
			goLast: s.goLast,
			goFirst: s.goFirst,
			reHydrate: s.reHydrate,
			setPreviewContent: s.setPreviewContent,
		})),
	);

	useInput((input, key) => {
		if (input === 'q') {
			process.exit();
		}

		if (input === 'j' || key.downArrow) {
			next();
		}

		if (input === 'k' || key.upArrow) {
			prev();
		}

		if (input === 'g') {
			goFirst();
		}

		if (input === 'G') {
			goLast();
		}

		if (input === 'n') {
			const fileTimestamp = dayjs().format('YYYY-MM-DD-HHmmss');
			const timestamp = dayjs().format('YYYY-MM-DD HH:mm:ss');
			const filename = `note-${fileTimestamp}.md`;

			saveNote(filename, `# New Note\n\nCreated: ${timestamp}`);
			create(filename);
		}

		if (input === 'e' || key.return) {
			if (!list?.[selectedIndex]) return;

			const {filename} = list[selectedIndex];

			openEditor(filename);

			const content = getFileContent(filename);

			reHydrate();
			setPreviewContent(content || '');
		}
	});

	useEffect(() => {
		const syncPreviewContent = () => {
			if (!list?.length) return;
			if (!list?.[selectedIndex]) return;

			const {filename} = list[selectedIndex];

			const fileContent = getFileContent(filename);

			setPreviewContent(fileContent || '');
		};

		syncPreviewContent();
	}, [list, selectedIndex]);
};

export default useNavigation;
