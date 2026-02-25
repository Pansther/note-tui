import {RefObject, useEffect} from 'react';
import dayjs from 'dayjs';
import {useInput} from 'ink';
import {useShallow} from 'zustand/shallow';
import {ScrollViewRef} from 'ink-scroll-view';

import useStore from '../store/index.js';

import {openEditor} from '../helper/editor.js';
import {getFileContent, saveNote} from '../helper/file.js';

import {FocusPane} from '../store/type.js';

const useNavigation = ({
	viewRef,
}: {
	viewRef: RefObject<ScrollViewRef | null>;
}) => {
	const {
		list,
		focusPane,
		selectedIndex,
		next,
		prev,
		create,
		goLast,
		goFirst,
		reHydrate,
		setFocusPane,
		setSelectedIndex,
		setPreviewContent,
	} = useStore(
		useShallow(s => ({
			list: s.list,
			focusPane: s.focusPane,
			selectedIndex: s.selectedIndex,
			next: s.next,
			prev: s.prev,
			create: s.create,
			goLast: s.goLast,
			goFirst: s.goFirst,
			reHydrate: s.reHydrate,
			setFocusPane: s.setFocusPane,
			setSelectedIndex: s.setSelectedIndex,
			setPreviewContent: s.setPreviewContent,
		})),
	);

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

	useInput((input, key) => {
		if (input === 'q') {
			process.exit();
		}

		if (focusPane === FocusPane.List) {
			if (input === 'j' || key.downArrow) {
				next();
			}

			if (input === 'k' || key.upArrow) {
				prev();
			}

			if (input === 'g' || key.home) {
				goFirst();
			}

			if (input === 'G' || key.end) {
				goLast();
			}

			if ((input === 'd' && key.ctrl) || key.pageDown) {
				const scrollIndex = selectedIndex + 5;

				if (scrollIndex >= list?.length - 1) {
					goLast();
				} else {
					setSelectedIndex(scrollIndex);
				}
			}

			if ((input === 'u' && key.ctrl) || key.pageUp) {
				const scrollIndex = selectedIndex - 5;

				if (scrollIndex < 0) {
					goFirst();
				} else {
					setSelectedIndex(scrollIndex);
				}
			}

			if (input === 'n') {
				const fileTimestamp = dayjs().format('YYYY-MM-DD-HHmmss');
				const timestamp = dayjs().format('YYYY-MM-DD HH:mm:ss');
				const filename = `note-${fileTimestamp}.md`;
				const content = ['# New Note', `Created: ${timestamp}`].join('\n\n');

				saveNote(filename, content);
				create(filename);
			}
		} else if (focusPane === FocusPane.Preview) {
			if (!viewRef?.current) return;

			if (input === 'j' || key.downArrow) {
				scrollViewDown(1);
			}

			if (input === 'k' || key.upArrow) {
				viewRef.current.scrollBy(-1);
			}

			if (input === 'g' || key.home) {
				viewRef.current.scrollToTop();
			}

			if (input === 'G' || key.end) {
				viewRef.current.scrollToBottom();
			}

			if ((input === 'd' && key.ctrl) || key.pageDown) {
				const height = viewRef?.current?.getViewportHeight() ?? 10;
				const scrollBy = Math.floor(height / 2);

				scrollViewDown(scrollBy);
			}

			if ((input === 'u' && key.ctrl) || key.pageUp) {
				const height = viewRef?.current?.getViewportHeight() ?? 10;
				const scrollBy = Math.floor(height / 2);

				viewRef?.current?.scrollBy(-scrollBy);
			}
		}

		if (input === 'h' || key.leftArrow) {
			setFocusPane(FocusPane.List);
		}

		if (input === 'l' || key.rightArrow) {
			setFocusPane(FocusPane.Preview);
		}

		if (input === 'e' || key.return) {
			if (!list?.[selectedIndex]) return;

			const {filename} = list[selectedIndex];

			const content = openEditor(filename);

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
