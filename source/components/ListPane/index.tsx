import {useRef} from 'react';
import cx from 'clsx';
import {Box, Text} from 'ink';
import {useShallow} from 'zustand/shallow';
import {ScrollList, ScrollListRef} from 'ink-scroll-list';

import TextInput from 'ink-text-input';

import useStore from '../../store/index.js';
import useTheme from '../../theme/index.js';
import useNavigation from '../../hooks/useNavigation/index.js';

import {Mode} from '../../store/type.js';

const ListPane = () => {
	const {mode, list, selectedIndex} = useStore(
		useShallow(s => ({
			list: s.list,
			mode: s.mode,
			ColorfocusPane: s.focusPane,
			selectedIndex: s.selectedIndex,
			previewData: s.previewData,
		})),
	);
	const {
		fileLabel = '',
		searchKeyword = '',
		setFileLabel,
		setSearchKeyword,
	} = useNavigation();

	const {accentColor, textColor, borderColor, foregroundColor} = useTheme(
		s => s.themeConfig,
	);

	const listRef = useRef<ScrollListRef>(null);

	const isCreatingFile = mode === Mode.Create;
	const isArchivedFile = mode === Mode.Archived;
	const isDeletingFile = mode === Mode.Delete;
	const isSearch = mode === Mode.Search;

	return (
		<>
			{(isSearch ? searchKeyword !== undefined : searchKeyword) && (
				<Box gap={1} borderColor={borderColor} borderStyle="single" height={3}>
					<Text>&#128269;</Text>
					{isSearch ? (
						<TextInput
							value={searchKeyword}
							placeholder="Search Note ..."
							onChange={setSearchKeyword}
						/>
					) : (
						<Text color={accentColor}>{searchKeyword}</Text>
					)}
				</Box>
			)}

			<ScrollList
				ref={listRef}
				selectedIndex={selectedIndex}
				height={isCreatingFile ? undefined : '100%'}
			>
				{list.map(({filename, label}, i) => {
					let fileLabel = label;
					const isSelected = i === selectedIndex;

					if (isArchivedFile && isSelected) {
						fileLabel = 'Confirm archived ? (y/n)';
					} else if (isDeletingFile && isSelected) {
						fileLabel = 'Confirm delete ? (y/n)';
					}

					return (
						<Box key={filename}>
							<Box
								gap={1}
								width="100%"
								backgroundColor={cx({
									[foregroundColor]: isSelected && !isCreatingFile,
								})}
							>
								<Text wrap="truncate" color={accentColor}>
									{' '}
									{i + 1}.
								</Text>
								<Text wrap="truncate" color={textColor}>
									{fileLabel}
								</Text>
								<Text> </Text>
							</Box>
						</Box>
					);
				})}
			</ScrollList>

			{isCreatingFile && (
				<Box width="100%" backgroundColor={foregroundColor} overflow="hidden">
					<Text color={accentColor}> {list?.length + 1}. </Text>
					<TextInput
						value={fileLabel}
						placeholder="New Note"
						onChange={setFileLabel}
					/>
				</Box>
			)}
		</>
	);
};

export default ListPane;
