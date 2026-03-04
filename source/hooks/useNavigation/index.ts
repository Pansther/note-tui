import {RefObject, useEffect, useState} from 'react';
import dayjs from 'dayjs';
import {useInput} from 'ink';
import {useShallow} from 'zustand/shallow';
import {ScrollViewRef} from 'ink-scroll-view';

import useStore from '../../store/index.js';

import {
	saveMeta,
	saveNote,
	updateMeta,
	moveFileToTrash,
	moveMetaToTrash,
} from '../../helper/file.js';
import {
	InputHandler,
	getNavigationListKey,
	getNavigationPreviewKey,
} from './helper.js';
import {openEditor} from '../../helper/editor.js';
import {formatDateTime} from '../../helper/date.js';

import {FocusPane, Mode} from '../../store/type.js';
import {AvailableListKey, AvailablePreviewKey} from './type.js';

const useNavigation = ({
	viewRef,
}: {
	viewRef: RefObject<ScrollViewRef | null>;
}) => {
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
		moveToTrash,
		setFocusPane,
		setSelectedIndex,
		setPreviewContent,
	} = useStore(
		useShallow(s => ({
			mode: s.mode,
			list: s.list,
			focusPane: s.focusPane,
			selectedIndex: s.selectedIndex,
			next: s.next,
			prev: s.prev,
			create: s.create,
			moveToTrash: s.moveToTrash,
			goLast: s.goLast,
			setMode: s.setMode,
			goFirst: s.goFirst,
			reHydrate: s.reHydrate,
			setFocusPane: s.setFocusPane,
			setSelectedIndex: s.setSelectedIndex,
			setPreviewContent: s.setPreviewContent,
		})),
	);

	const [fileLabel, setFileLabel] = useState<string>();

	const scrollViewDown = (scrollBy: number) => {
		if (!viewRef?.current) return;

		const viewportHeight = viewRef.current.getViewportHeight();
		const contentHeight = viewRef.current.getContentHeight();
		const maxOffset = Math.max(0, contentHeight - viewportHeight);
		const currentOffset = viewRef.current.getScrollOffset();

		if (currentOffset + scrollBy >= maxOffset) {
			viewRef.current.scrollToBottom();
		} else {
			viewRef.current.scrollBy(scrollBy);
		}
	};

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
		}
	};

	const navigatePreviewView: InputHandler = (input, key) => {
		if (!viewRef?.current) return;

		const Key = getNavigationPreviewKey(input, key);

		switch (Key) {
			case AvailablePreviewKey.Down:
				return scrollViewDown(1);
			case AvailablePreviewKey.Up:
				return viewRef.current.scrollBy(-1);
			case AvailablePreviewKey.GoFirst:
				return viewRef.current.scrollToTop();
			case AvailablePreviewKey.GoLast:
				return viewRef.current.scrollToBottom();
			case AvailablePreviewKey.ScrollDown: {
				const height = viewRef?.current?.getViewportHeight() ?? 10;
				const scrollBy = Math.floor(height / 2);

				scrollViewDown(scrollBy);

				break;
			}
			case AvailablePreviewKey.ScrollUp: {
				const height = viewRef?.current?.getViewportHeight() ?? 10;
				const scrollBy = Math.floor(height / 2);

				viewRef?.current?.scrollBy(-scrollBy);

				break;
			}
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

					moveToTrash();
					moveFileToTrash(filename);
					moveMetaToTrash(filename);
					reHydrate();
				}

				break;
			}

			case Mode.Idle:
			default: {
				if (input === 'q') {
					process.exit();
				}

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

				if (focusPane === FocusPane.List) {
					navigateListView(input, key);
				}

				if (focusPane === FocusPane.Preview) {
					navigatePreviewView(input, key);
				}
			}
		}
	});

	useEffect(() => {
		setPreviewContent();
	}, [list, selectedIndex]);

	return {
		fileLabel,
		setFileLabel,
	};
};

export default useNavigation;
