import {useEffect, useRef} from 'react';
import {useShallow} from 'zustand/shallow';
import {Box, Spacer, Text, useStdout} from 'ink';
import {ScrollView, ScrollViewRef} from 'ink-scroll-view';

import useMarked from './useMarked.js';
import useStore from '../../store/index.js';
import useTheme from '../../theme/index.js';
import useDimension from '../../hooks/useDimension.js';
import usePreviewNavigation from '../../hooks/usePreviewNavigation/index.js';

import {formatDateTime} from '../../helper/date.js';

const PreviewPane = () => {
	const {stdout} = useStdout();
	const {selectedIndex, previewData} = useStore(
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
	const {textColor, accentColor, foregroundColor, secondaryColor, errorColor} =
		useTheme(s => s.themeConfig);

	const marked = useMarked();

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
			<ScrollView width="100%" ref={viewRef} height={dimensions.height - 6}>
				<Text wrap="wrap" color={textColor}>
					{marked.parse(previewData?.content, {
						async: false,
					})}
				</Text>
			</ScrollView>

			<Spacer />

			{previewData?.content && (
				<Box width="100%" gap={1}>
					<Box marginLeft={1}>
						<Text
							wrap="wrap"
							color={accentColor}
							backgroundColor={foregroundColor}
						>
							{' '}
							Created{' '}
						</Text>
						<Text wrap="wrap" color={textColor}>
							{' '}
							{formatDateTime(previewData.meta?.createdDate) || '-'}
						</Text>
					</Box>
					<Text color="whiteBright">|</Text>
					<Text
						wrap="wrap"
						color={secondaryColor}
						backgroundColor={foregroundColor}
					>
						{' '}
						Updated{' '}
					</Text>
					<Text wrap="wrap" color={textColor}>
						{formatDateTime(previewData.meta?.updatedDate) || '-'}
					</Text>

					{previewData?.meta?.deletedDate && (
						<>
							<Text color="whiteBright">|</Text>
							<Text
								wrap="wrap"
								color={errorColor}
								backgroundColor={foregroundColor}
							>
								{' '}
								Deleted{' '}
							</Text>
							<Text wrap="wrap" color={textColor}>
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
