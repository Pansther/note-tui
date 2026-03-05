import {useState} from 'react';
import dayjs from 'dayjs';
import {useInput} from 'ink';
import {useShallow} from 'zustand/shallow';

import useStore from '../../store/index.js';

import {
	TRASH_DIR,
	saveMeta,
	saveNote,
	updateMeta,
	deleteFile,
	deleteMeta,
	restoreFile,
	restoreMeta,
	moveFileToTrash,
	moveMetaToTrash,
} from '../../helper/file.js';
import {
	InputHandler,
	getNavigationListKey,
	getNavigationTrashKey,
} from './helper.js';
import {openEditor} from '../../helper/editor.js';
import {formatDateTime} from '../../helper/date.js';

import {FocusPane, Mode} from '../../store/type.js';
import {AvailableListKey, AvailableTrashKey} from './type.js';

const useNavigation = () => {
	const {
		mode,
		list,
		focusPane,
		selectedIndex,
		next,
		prev,
		create,
		goLast,
		goFirst,
		setMode,
		reHydrate,
		setFocusPane,
		calculateIndex,
		setSelectedIndex,
	} = useStore(
		useShallow(s => ({
			mode: s.mode,
			list: s.list,
			focusPane: s.focusPane,
			selectedIndex: s.selectedIndex,
			next: s.next,
			prev: s.prev,
			create: s.create,
			goLast: s.goLast,
			setMode: s.setMode,
			goFirst: s.goFirst,
			setList: s.setList,
			reHydrate: s.reHydrate,
			setFocusPane: s.setFocusPane,
			calculateIndex: s.calculateIndex,
			setSelectedIndex: s.setSelectedIndex,
		})),
	);

	const [fileLabel, setFileLabel] = useState<string>();

	const cancelCreate = () => {
		setFileLabel(undefined);
		setMode(Mode.Idle);
	};

	const navigateListView: InputHandler = (input, key) => {
		const Key = getNavigationListKey(input, key);

		switch (Key) {
			case AvailableListKey.Next:
				return next();
			case AvailableListKey.Prev:
				return prev();
			case AvailableListKey.GoFirst:
				return goFirst();
			case AvailableListKey.GoLast:
				return goLast();
			case AvailableListKey.ScrollDown: {
				const scrollIndex = selectedIndex + 5;

				if (scrollIndex >= list?.length - 1) {
					goLast();
				} else {
					setSelectedIndex(scrollIndex);
				}

				break;
			}
			case AvailableListKey.ScrollUp: {
				const scrollIndex = selectedIndex - 5;

				if (scrollIndex < 0) {
					goFirst();
				} else {
					setSelectedIndex(scrollIndex);
				}

				break;
			}
			case AvailableListKey.Edit: {
				if (!list?.[selectedIndex]) return;

				const {filename} = list[selectedIndex];

				setMode(Mode.Edit);
				openEditor(filename);

				reHydrate();
				setMode(Mode.Idle);
				updateMeta(filename);

				break;
			}
			case AvailableListKey.Create: {
				goLast();
				setFileLabel('');
				setMode(Mode.Create);

				break;
			}

			case AvailableListKey.Archived: {
				setMode(Mode.Archived);

				break;
			}

			case AvailableListKey.Trash: {
				setMode(Mode.Trash);
				setSelectedIndex(0);
				reHydrate(TRASH_DIR);

				break;
			}
		}
	};

	const navigateTrashView: InputHandler = (input, key) => {
		const Key = getNavigationTrashKey(input, key);

		switch (Key) {
			case AvailableTrashKey.Next:
				return next();
			case AvailableTrashKey.Prev:
				return prev();
			case AvailableTrashKey.GoFirst:
				return goFirst();
			case AvailableTrashKey.GoLast:
				return goLast();
			case AvailableTrashKey.ScrollDown: {
				const scrollIndex = selectedIndex + 5;

				if (scrollIndex >= list?.length - 1) {
					goLast();
				} else {
					setSelectedIndex(scrollIndex);
				}

				break;
			}
			case AvailableTrashKey.ScrollUp: {
				const scrollIndex = selectedIndex - 5;

				if (scrollIndex < 0) {
					goFirst();
				} else {
					setSelectedIndex(scrollIndex);
				}

				break;
			}
			case AvailableTrashKey.Restore: {
				const selected = list?.[selectedIndex];

				if (!selected) return;

				restoreFile(selected.filename);
				restoreMeta(selected.filename);
				calculateIndex();
				reHydrate(TRASH_DIR);

				break;
			}
			case AvailableTrashKey.Delete: {
				setMode(Mode.Delete);
			}
		}
	};

	const navigatePane: InputHandler = (input, key) => {
		if (input === 'h' || key.leftArrow) {
			setFocusPane(FocusPane.List);
		}

		if (input === 'l' || key.rightArrow) {
			setFocusPane(FocusPane.Preview);
		}

		if (key.tab) {
			if (focusPane === FocusPane.List) setFocusPane(FocusPane.Preview);
			if (focusPane === FocusPane.Preview) setFocusPane(FocusPane.List);
		}
	};

	useInput((input, key) => {
		switch (mode) {
			case Mode.Create: {
				if (key.escape) {
					cancelCreate();
				}

				if (key.return) {
					const _fileLabel = fileLabel || 'New Note';
					const fileTimestamp = dayjs().format('YYYY-MM-DD-HHmmss');
					const timestamp = formatDateTime(new Date());
					const filename = `note-${fileTimestamp}.md`;
					const content = [`# ${_fileLabel}`, `Created: ${timestamp}`].join(
						'\n\n',
					);

					saveMeta(filename);
					saveNote(filename, content);
					create(_fileLabel, filename);

					cancelCreate();
				}

				break;
			}

			case Mode.Archived: {
				if (input === 'n' || key.escape) {
					setMode(Mode.Idle);
				}

				if (input === 'y' || key.return) {
					if (!list?.[selectedIndex]) return;

					const {filename} = list[selectedIndex];

					calculateIndex();
					moveFileToTrash(filename);
					moveMetaToTrash(filename);
					reHydrate();
					setMode(Mode.Idle);
				}

				break;
			}

			case Mode.Trash: {
				navigatePane(input, key);

				if (focusPane === FocusPane.List) {
					if (input === 'q' || key.escape) {
						setMode(Mode.Idle);
						setSelectedIndex(0);
						reHydrate();
					}

					navigateTrashView(input, key);
				}

				break;
			}

			case Mode.Delete: {
				if (input === 'n' || key.escape) {
					setMode(Mode.Trash);
				}

				if (input === 'y' || key.return) {
					if (!list?.[selectedIndex]) return;

					const {filename} = list[selectedIndex];

					deleteFile({filename});
					deleteMeta(filename);
					calculateIndex();
					reHydrate(TRASH_DIR);
					setMode(Mode.Trash);
				}

				break;
			}

			case Mode.Idle:
			default: {
				navigatePane(input, key);

				if (input === 'q') {
					process.exit();
				}

				if (focusPane === FocusPane.List) {
					navigateListView(input, key);
				}
			}
		}
	});

	return {
		fileLabel,
		setFileLabel,
	};
};

export default useNavigation;
