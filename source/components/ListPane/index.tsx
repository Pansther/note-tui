import {useRef} from 'react';
import cx from 'clsx';
import {Box, Text} from 'ink';
import {useShallow} from 'zustand/shallow';
import {ScrollList, ScrollListRef} from 'ink-scroll-list';

import TextInput from 'ink-text-input';

import useStore from '../../store/index.js';
import useNavigation from '../../hooks/useNavigation/index.js';

import {Mode} from '../../store/type.js';

const ListPane = () => {
	const {mode, list, selectedIndex} = useStore(
		useShallow(s => ({
			list: s.list,
			mode: s.mode,
			focusPane: s.focusPane,
			selectedIndex: s.selectedIndex,
			previewData: s.previewData,
		})),
	);
	const {fileLabel = '', setFileLabel} = useNavigation();

	const listRef = useRef<ScrollListRef>(null);

	const isCreatingFile = mode === Mode.Create;
	const isArchivedFile = mode === Mode.Archived;
	const isDeletingFile = mode === Mode.Delete;

	return (
		<>
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
		</>
	);
};

export default ListPane;
