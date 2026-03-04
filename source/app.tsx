import {useEffect, useRef} from 'react';
import cx from 'clsx';
import chalk from 'chalk';
import {marked} from 'marked';
import {Box, Spacer, Text} from 'ink';
import TextInput from 'ink-text-input';
import {useShallow} from 'zustand/shallow';
import TerminalRenderer from 'marked-terminal';
import {ScrollView, ScrollViewRef} from 'ink-scroll-view';
import {ScrollList, ScrollListRef} from 'ink-scroll-list';

import useStore from './store/index.js';
import useDimension from './hooks/useDimension.js';
import useNavigation from './hooks/useNavigation/index.js';

import {formatDateTime} from './helper/date.js';

import {FocusPane, Mode} from './store/type.js';

marked.setOptions({
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	renderer: new TerminalRenderer({
		hr: () => chalk.gray('─'.repeat(30)) + '\n',
	}),
});

export default function App() {
	const {mode, list, focusPane, selectedIndex, previewData} = useStore(
		useShallow(s => ({
			list: s.list,
			mode: s.mode,
			focusPane: s.focusPane,
			selectedIndex: s.selectedIndex,
			previewData: s.previewData,
		})),
	);

	const listRef = useRef<ScrollListRef>(null);
	const viewRef = useRef<ScrollViewRef>(null);

	const {dimensions} = useDimension({viewRef});
	const {fileLabel = '', setFileLabel} = useNavigation({viewRef});

	const isCreatingFile = mode === Mode.Create;
	const isArchivedFile = mode === Mode.Archived;

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
					{list.map(({filename, label}, i) => {
						let fileLabel = label;
						const isSelected = i === selectedIndex;

						if (isArchivedFile && isSelected) {
							fileLabel = 'Confirm archived ? (y/n)';
						}

						return (
							<Box key={filename}>
								<Box
									width="100%"
									backgroundColor={cx({
										red: isSelected && !isCreatingFile,
									})}
								>
									<Text wrap="truncate">
										{' '}
										{i + 1}. {fileLabel}
									</Text>
									<Text> </Text>
								</Box>
							</Box>
						);
					})}
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
				flexDirection="column"
				borderColor={cx({red: focusPane === FocusPane.Preview})}
			>
				<ScrollView width="100%" ref={viewRef} height={dimensions.height - 4}>
					<Text wrap="wrap">
						{marked.parse(previewData?.content, {
							async: false,
						})}
					</Text>
				</ScrollView>

				<Spacer />

				<Box width="100%" gap={1} backgroundColor="gray">
					<Text wrap="wrap">
						{' '}
						Created: {formatDateTime(previewData.meta?.createdDate) || '-'}
					</Text>
					<Text>|</Text>
					<Text wrap="wrap">
						Updated: {formatDateTime(previewData.meta?.updatedDate) || '-'}
					</Text>
				</Box>
			</Box>
		</Box>
	);
}
