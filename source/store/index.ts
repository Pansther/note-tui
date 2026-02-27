import {create} from 'zustand';
import {immer} from 'zustand/middleware/immer';

import {getNotesFromDisk} from '../helper/file.js';

import {FocusPane} from './type.js';

interface Store {
	focusPane: FocusPane;
	selectedIndex: number;
	previewContent?: string;
	list: {label: string; filename: string}[];
	next: () => void;
	prev: () => void;
	goFirst: () => void;
	goLast: () => void;
	reHydrate: () => void;
	create: (fileLabel: string, filename: string) => void;
	setSelectedIndex: (index: number) => void;
	setPreviewContent: (content: string) => void;
	setFocusPane: (pane: FocusPane) => void;
}

const useStore = create(
	immer<Store>(set => ({
		selectedIndex: 0,
		previewContent: '',
		focusPane: FocusPane.List,
		list: getNotesFromDisk(),
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
				state.list.push({filename, label: fileLabel});
				state.selectedIndex = state.list.length - 1;
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
	})),
);

export default useStore;
