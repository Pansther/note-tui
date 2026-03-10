import {useEffect} from 'react';
import cx from 'clsx';
import {Box} from 'ink';
import {useShallow} from 'zustand/shallow';

import ListPane from './components/ListPane/index.js';
import PreviewPane from './components/PreviewPane/index.js';
import Instruction from './components/Instruction/index.js';

import useStore from './store/index.js';
import useTheme from './theme/index.js';
import useDimension from './hooks/useDimension.js';

import {FocusPane} from './store/type.js';

const App = () => {
	const {focusPane} = useStore(
		useShallow(s => ({
			focusPane: s.focusPane,
		})),
	);

	const {dimensions} = useDimension();
	const {accentColor, backgroundColor} = useTheme(s => s.themeConfig);

	useEffect(() => {
		process.stdout.write(`\x1b]11;${backgroundColor}\x07`);
	}, [backgroundColor]);

	useEffect(() => {
		process.stdout.write('\x1b[?1049h');
		process.stdout.write('\x1b[?25l');

		return () => {
			process.stdout.write('\x1b[0m');
			process.stdout.write('\x1b]111\x07');
			process.stdout.write('\x1b[?25h');
			process.stdout.write('\x1b[?1049l');
		};
	}, []);

	return (
		<Box
			flexDirection="column"
			width={dimensions.width}
			height={dimensions.height}
			backgroundColor={backgroundColor}
		>
			<Box>
				<Box
					width="30%"
					borderStyle="round"
					flexDirection="column"
					borderColor={cx({[accentColor]: focusPane === FocusPane.List})}
				>
					<ListPane />
				</Box>
				<Box
					width="70%"
					borderStyle="round"
					flexDirection="column"
					borderColor={cx({[accentColor]: focusPane === FocusPane.Preview})}
				>
					<PreviewPane />
				</Box>
			</Box>

			<Box width="100%">
				<Instruction />
			</Box>
		</Box>
	);
};

export default App;
