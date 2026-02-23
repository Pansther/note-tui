import {create} from 'zustand';
import {immer} from 'zustand/middleware/immer';

interface Store {
	list: {id: string; label: string}[];
	selectedIndex: number;
	next: () => void;
	prev: () => void;
	goFirst: () => void;
	goLast: () => void;
}

const useStore = create(
	immer<Store>(set => ({
		list: [
			{id: '1', label: '11111'},
			{id: '2', label: '22222'},
			{id: '3', label: '33333'},
		],
		selectedIndex: 0,
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
	})),
);

export default useStore;
