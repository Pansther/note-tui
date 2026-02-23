import {useInput} from 'ink';
import {useShallow} from 'zustand/shallow';

import useStore from '../store/index.js';

const useNavigation = () => {
	const {next, prev, goFirst, goLast} = useStore(
		useShallow(s => ({
			next: s.next,
			prev: s.prev,
			goFirst: s.goFirst,
			goLast: s.goLast,
		})),
	);

	useInput((input, key) => {
		if (input === 'q') {
			// Exit program
		}

		if (input === 'j' || key.downArrow) {
			next();
		}

		if (input === 'k' || key.upArrow) {
			prev();
		}

		if (input === 'g') {
			goFirst();
		}

		if (input === 'G') {
			goLast();
		}
	});
};

export default useNavigation;
