import {Box, Text} from 'ink';

import useStore from '../../store/index.js';

import {KEY_INSTRUCTION} from './config.js';

const Instruction = () => {
	const mode = useStore(s => s.mode);
	const pane = useStore(s => s.focusPane);

	const keys = KEY_INSTRUCTION[mode];

	return (
		<Box
			marginX={1}
			width="100%"
			flexWrap="wrap"
			alignItems="flex-start"
			justifyContent="flex-start"
		>
			{keys
				.filter(({focusPane}) => (!focusPane ? true : focusPane === pane))
				.map(({key, label}, i) => (
					<Text key={i} color="gray">
						{key}: {label}
						{i === keys.length - 1 ? '' : ','}{' '}
					</Text>
				))}
		</Box>
	);
};

export default Instruction;
