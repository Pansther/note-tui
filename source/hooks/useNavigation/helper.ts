import {useInput} from 'ink';

import {AvailableListKey, AvailablePreviewKey} from './type.js';

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
	}

	return Key;
};

export const getNavigationPreviewKey = (
	...[input, key]: Parameters<InputHandler>
) => {
	let Key: AvailablePreviewKey | undefined = undefined;

	if (input === 'j' || key.downArrow) {
		Key = AvailablePreviewKey.Down;
	} else if (input === 'k' || key.upArrow) {
		Key = AvailablePreviewKey.Up;
	} else if (input === 'g' || key.home) {
		Key = AvailablePreviewKey.GoFirst;
	} else if (input === 'G' || key.end) {
		Key = AvailablePreviewKey.GoLast;
	} else if ((input === 'd' && key.ctrl) || key.pageDown) {
		Key = AvailablePreviewKey.ScrollDown;
	} else if ((input === 'u' && key.ctrl) || key.pageUp) {
		Key = AvailablePreviewKey.ScrollUp;
	}

	return Key;
};
