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
	const {
		list,
		selectedIndex,
		previewContent = '',
	} = useStore(
		useShallow(s => ({
			list: s.list,
			selectedIndex: s.selectedIndex,
			previewContent: s.previewContent,
		})),
	);

	const listRef = useRef<ScrollListRef>(null);

	useNavigation();

	return (
		<Box>
			<Box width="30%" borderStyle="single">
				<ScrollList ref={listRef} selectedIndex={selectedIndex}>
					{list.map(({filename, label}, i) => (
						<Box key={filename}>
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
					{marked.parse(previewContent, {
						async: false,
					})}
				</Text>
			</Box>
		</Box>
	);
}
