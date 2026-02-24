import {create} from 'zustand';
import {immer} from 'zustand/middleware/immer';

import {getNotesFromDisk} from '../helper/file.js';

interface Store {
	selectedIndex: number;
	previewContent?: string;
	list: {label: string; filename: string}[];
	next: () => void;
	prev: () => void;
	goFirst: () => void;
	goLast: () => void;
	reHydrate: () => void;
	create: (filename: string) => void;
	setPreviewContent: (content: string) => void;
}

const useStore = create(
	immer<Store>(set => ({
		selectedIndex: 0,
		previewContent: '',
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
		create: (filename: string) =>
			set(state => {
				state.list.push({filename, label: 'New Note'});
				state.selectedIndex = state.list.length - 1;
			}),
		reHydrate: () =>
			set(state => {
				state.list = getNotesFromDisk();
			}),
		setPreviewContent: (content: string) =>
			set(state => {
				state.previewContent = content;
			}),
	})),
);

export default useStore;
