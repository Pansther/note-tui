import {useEffect, useRef} from 'react';
import chalk from 'chalk';
import {marked} from 'marked';
import {useShallow} from 'zustand/shallow';
import TerminalRenderer from 'marked-terminal';
import {Box, Spacer, Text, useStdout} from 'ink';
import {ScrollView, ScrollViewRef} from 'ink-scroll-view';

import useStore from '../../store/index.js';
import useDimension from '../../hooks/useDimension.js';
import usePreviewNavigation from '../../hooks/usePreviewNavigation/index.js';

import {formatDateTime} from '../../helper/date.js';

marked.setOptions({
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	renderer: new TerminalRenderer({
		hr: () => chalk.gray('─'.repeat(30)) + '\n',
	}),
});

const PreviewPane = () => {
	const {stdout} = useStdout();
	const {mode, selectedIndex, previewData} = useStore(
		useShallow(s => ({
			list: s.list,
			mode: s.mode,
			focusPane: s.focusPane,
			selectedIndex: s.selectedIndex,
			previewData: s.previewData,
		})),
	);

	const viewRef = useRef<ScrollViewRef>(null);

	const {dimensions} = useDimension();

	usePreviewNavigation({viewRef});

	useEffect(() => {
		viewRef?.current?.scrollToTop();
	}, [selectedIndex]);

	useEffect(() => {
		const onResize = () => {
			viewRef.current?.remeasure();
		};

		stdout?.on('resize', onResize);

		return () => {
			stdout?.off('resize', onResize);
		};
	}, [stdout]);

	return (
		<>
			<ScrollView width="100%" ref={viewRef} height={dimensions.height - 4}>
				<Text wrap="wrap">
					{marked.parse(previewData?.content, {
						async: false,
					})}
				</Text>
			</ScrollView>

			<Spacer />

			{previewData?.content && (
				<Box width="100%" gap={1} backgroundColor="gray">
					<Text wrap="wrap">
						{' '}
						Created: {formatDateTime(previewData.meta?.createdDate) || '-'}
					</Text>
					<Text>|</Text>
					<Text wrap="wrap">
						Updated: {formatDateTime(previewData.meta?.updatedDate) || '-'}
					</Text>

					{previewData?.meta?.deletedDate && (
						<>
							<Text>|</Text>
							<Text wrap="wrap">
								Deleted:{' '}
								{formatDateTime(previewData.meta?.deletedDate || '') || '-'}
							</Text>
						</>
					)}
				</Box>
			)}
		</>
	);
};

export default PreviewPane;
