import {create} from 'zustand';
import {immer} from 'zustand/middleware/immer';

import {getFileContent, getNotesFromDisk} from '../helper/file.js';

import {FocusPane, ListItem, Mode} from './type.js';

interface Store {
	mode: Mode;
	focusPane: FocusPane;
	selectedIndex: number;
	previewContent?: string;
	list: ListItem[];
	next: () => void;
	prev: () => void;
	goFirst: () => void;
	goLast: () => void;
	reHydrate: () => void;
	create: (fileLabel: string, filename: string) => void;
	moveToTrash: () => void;
	setSelectedIndex: (index: number) => void;
	setPreviewContent: (content: string) => void;
	setFocusPane: (pane: FocusPane) => void;
	setMode: (mode: Mode) => void;
	setList: (list: ListItem[]) => void;
}

const useStore = create(
	immer<Store>(set => ({
		mode: Mode.Idle,
		selectedIndex: 0,
		previewContent: '',
		focusPane: FocusPane.List,
		list: getNotesFromDisk(),
		setList: list =>
			set(state => {
				state.list = list;
			}),
		next: () =>
			set(state => {
				if (state.selectedIndex >= state.list.length - 1) {
					state.selectedIndex = 0;
				} else {
					state.selectedIndex++;
				}
			}),
		prev: () =>
			set(state => {
				if (state.selectedIndex <= 0) {
					state.selectedIndex = state.list.length - 1;
				} else {
					state.selectedIndex--;
				}
			}),
		goFirst: () =>
			set(state => {
				state.selectedIndex = 0;
			}),
		goLast: () =>
			set(state => {
				state.selectedIndex = state.list.length - 1;
			}),
		create: (fileLabel, filename) =>
			set(state => {
				state.mode = Mode.Create;
				state.list.push({filename, label: fileLabel});
				state.selectedIndex = state.list.length - 1;
			}),
		moveToTrash: () =>
			set(state => {
				state.mode = Mode.Idle;

				const prevIndex = state.selectedIndex;
				const nextIndex =
					prevIndex >= state.list?.length - 1
						? Math.max(0, prevIndex - 1)
						: prevIndex;

				state.selectedIndex = nextIndex;
			}),
		reHydrate: () =>
			set(state => {
				state.list = getNotesFromDisk();
			}),
		setSelectedIndex: index =>
			set(state => {
				state.selectedIndex = index;
			}),
		setPreviewContent: content =>
			set(state => {
				state.previewContent = content;
			}),
		setFocusPane: pane =>
			set(state => {
				state.focusPane = pane;
			}),
		setMode: mode =>
			set(state => {
				state.mode = mode;
			}),
	})),
);

export default useStore;
