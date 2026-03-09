import Fuse from 'fuse.js';

import type {ListItem} from '../store/type.js';

export const filterNotes = (list: ListItem[], searchKeyword = '') => {
	if (!searchKeyword) return list;

	const fuse = new Fuse(list, {keys: ['label']});
	const notes = fuse.search(searchKeyword).map(({item}) => item);

	return notes;
};
