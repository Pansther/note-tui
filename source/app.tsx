import {useRef} from 'react';
import {marked} from 'marked';
import {Box, Text} from 'ink';
import {useShallow} from 'zustand/shallow';
import TerminalRenderer from 'marked-terminal';
import {ScrollList, ScrollListRef} from 'ink-scroll-list';

import useStore from './store/index.js';
import useNavigation from './hooks/useNavigation.js';

marked.setOptions({
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	renderer: new TerminalRenderer(),
});

export default function App() {
	const {selectedIndex, list} = useStore(
		useShallow(s => ({
			list: s.list,
			selectedIndex: s.selectedIndex,
		})),
	);

	const listRef = useRef<ScrollListRef>(null);

	useNavigation();

	return (
		<Box>
			<Box width="30%" borderStyle="single">
				<ScrollList ref={listRef} selectedIndex={selectedIndex}>
					{list.map(({id, label}, i) => (
						<Box key={id}>
							<Text color={i === selectedIndex ? 'green' : 'white'}>
								{i === selectedIndex ? '> ' : '  '}
								{label}
							</Text>
						</Box>
					))}
				</ScrollList>
			</Box>

			<Box width="70%" borderStyle="single">
				<Text wrap="wrap">
					{marked.parse(`# Hello \n - ❤️ Apple \n - 🧡 Orange \n - - -`, {
						async: false,
					})}
				</Text>
			</Box>
		</Box>
	);
}
