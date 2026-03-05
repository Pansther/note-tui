import {useInput} from 'ink';

import {AvailableListKey, AvailableTrashKey} from './type.js';

export type InputHandler = Parameters<typeof useInput>[0];

export const getNavigationListKey = (
	...[input, key]: Parameters<InputHandler>
) => {
	let Key: AvailableListKey | undefined = undefined;

	if (input === 'j' || key.downArrow) {
		Key = AvailableListKey.Next;
	} else if (input === 'k' || key.upArrow) {
		Key = AvailableListKey.Prev;
	} else if (input === 'g' || key.home) {
		Key = AvailableListKey.GoFirst;
	} else if (input === 'G' || key.end) {
		Key = AvailableListKey.GoLast;
	} else if ((input === 'd' && key.ctrl) || key.pageDown) {
		Key = AvailableListKey.ScrollDown;
	} else if ((input === 'u' && key.ctrl) || key.pageUp) {
		Key = AvailableListKey.ScrollUp;
	} else if (input === 'e' || key.return) {
		Key = AvailableListKey.Edit;
	} else if (input === 'n') {
		Key = AvailableListKey.Create;
	} else if (input === 'd') {
		Key = AvailableListKey.Archived;
	} else if (input === 't' || key.backspace) {
		Key = AvailableListKey.Trash;
	}

	return Key;
};

export const getNavigationTrashKey = (
	...[input, key]: Parameters<InputHandler>
) => {
	let Key: AvailableTrashKey | undefined = undefined;

	if (input === 'j' || key.downArrow) {
		Key = AvailableTrashKey.Next;
	} else if (input === 'k' || key.upArrow) {
		Key = AvailableTrashKey.Prev;
	} else if (input === 'g' || key.home) {
		Key = AvailableTrashKey.GoFirst;
	} else if (input === 'G' || key.end) {
		Key = AvailableTrashKey.GoLast;
	} else if ((input === 'd' && key.ctrl) || key.pageDown) {
		Key = AvailableTrashKey.ScrollDown;
	} else if ((input === 'u' && key.ctrl) || key.pageUp) {
		Key = AvailableTrashKey.ScrollUp;
	} else if (input === 'd') {
		Key = AvailableTrashKey.Delete;
	} else if (input === 'r') {
		Key = AvailableTrashKey.Restore;
	}

	return Key;
};
