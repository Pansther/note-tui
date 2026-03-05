import {InputHandler} from '../useNavigation/helper.js';

import {AvailablePreviewKey} from '../useNavigation/type.js';

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
