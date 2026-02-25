import {useEffect, useRef} from 'react';
import cx from 'clsx';
import chalk from 'chalk';
import {marked} from 'marked';
import {Box, Text} from 'ink';
import {useShallow} from 'zustand/shallow';
import TerminalRenderer from 'marked-terminal';
import {ScrollView, ScrollViewRef} from 'ink-scroll-view';
import {ScrollList, ScrollListRef} from 'ink-scroll-list';

import useStore from './store/index.js';
import useDimension from './hooks/useDimension.js';
import useNavigation from './hooks/useNavigation.js';

import {FocusPane} from './store/type.js';

marked.setOptions({
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	renderer: new TerminalRenderer({
		hr: () => chalk.gray('─'.repeat(30)) + '\n',
	}),
});

export default function App() {
	const {
		list,
		focusPane,
		selectedIndex,
		previewContent = '',
	} = useStore(
		useShallow(s => ({
			list: s.list,
			focusPane: s.focusPane,
			selectedIndex: s.selectedIndex,
			previewContent: s.previewContent,
		})),
	);

	const listRef = useRef<ScrollListRef>(null);
	const viewRef = useRef<ScrollViewRef>(null);

	const {dimensions} = useDimension({viewRef});

	useNavigation({viewRef});

	useEffect(() => {
		viewRef?.current?.scrollToTop();
	}, [selectedIndex]);

	return (
		<Box width={dimensions.width} height={dimensions.height}>
			<Box
				width="30%"
				borderStyle="round"
				borderColor={cx({red: focusPane === FocusPane.List})}
			>
				<ScrollList ref={listRef} selectedIndex={selectedIndex}>
					{list.map(({filename, label}, i) => (
						<Box key={filename}>
							<Text color={i === selectedIndex ? 'green' : 'white'}>
								{i === selectedIndex ? '> ' : '  '}
								{i + 1}. {label}
							</Text>
						</Box>
					))}
				</ScrollList>
			</Box>

			<Box
				width="70%"
				borderStyle="round"
				borderColor={cx({red: focusPane === FocusPane.Preview})}
			>
				<ScrollView ref={viewRef}>
					<Text wrap="wrap">
						{marked.parse(previewContent, {
							async: false,
						})}
					</Text>
					<Box height={5} />
				</ScrollView>
			</Box>
		</Box>
	);
}
