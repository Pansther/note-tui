import {useEffect, useRef} from 'react';
import cx from 'clsx';
import chalk from 'chalk';
import {marked} from 'marked';
import {Box, Text} from 'ink';
import TextInput from 'ink-text-input';
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
	const {
		fileLabel = '',
		isCreatingFile,
		setFileLabel,
	} = useNavigation({viewRef});

	useEffect(() => {
		viewRef?.current?.scrollToTop();
	}, [selectedIndex]);

	return (
		<Box width={dimensions.width} height={dimensions.height}>
			<Box
				width="30%"
				borderStyle="round"
				flexDirection="column"
				borderColor={cx({red: focusPane === FocusPane.List})}
			>
				<ScrollList ref={listRef} selectedIndex={selectedIndex} height="100%">
					{list.map(({filename, label}, i) => (
						<Box key={filename}>
							<Box
								width="100%"
								backgroundColor={cx({
									red: i === selectedIndex && !isCreatingFile,
								})}
							>
								<Text wrap="truncate">
									{' '}
									{i + 1}. {label}
								</Text>
								<Text> </Text>
							</Box>
						</Box>
					))}
				</ScrollList>
				{isCreatingFile && (
					<Box width="100%" backgroundColor="red" overflow="hidden">
						<Text> {list?.length + 1}. </Text>
						<TextInput
							value={fileLabel}
							placeholder="New Note"
							onChange={setFileLabel}
						/>
					</Box>
				)}
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
