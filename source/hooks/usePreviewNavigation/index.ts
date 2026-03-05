import {RefObject, useEffect} from 'react';
import {useInput} from 'ink';
import {useShallow} from 'zustand/shallow';
import {ScrollViewRef} from 'ink-scroll-view';

import useStore from '../../store/index.js';

import {getNavigationPreviewKey} from './helper.js';
import {InputHandler} from '../useNavigation/helper.js';

import {AvailablePreviewKey} from '../useNavigation/type.js';
import {Mode} from '../../store/type.js';
import {NOTES_DIR, TRASH_DIR} from '../../helper/file.js';

const usePreviewNavigation = ({
	viewRef,
}: {
	viewRef: RefObject<ScrollViewRef | null>;
}) => {
	const {mode, list, selectedIndex, setPreviewContent} = useStore(
		useShallow(s => ({
			mode: s.mode,
			list: s.list,
			selectedIndex: s.selectedIndex,
			setPreviewContent: s.setPreviewContent,
		})),
	);

	const isTrashMode = [Mode.Trash, Mode.Delete].includes(mode);

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
		navigatePreviewView(input, key);
	});

	useEffect(() => {
		setPreviewContent(isTrashMode ? TRASH_DIR : NOTES_DIR);
	}, [list, isTrashMode, selectedIndex]);
};

export default usePreviewNavigation;
