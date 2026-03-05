import cx from 'clsx';
import {Box} from 'ink';
import {useShallow} from 'zustand/shallow';

import ListPane from './components/ListPane/index.js';
import PreviewPane from './components/PreviewPane/index.js';

import useStore from './store/index.js';
import useDimension from './hooks/useDimension.js';

import {FocusPane} from './store/type.js';

const App = () => {
	const {focusPane} = useStore(
		useShallow(s => ({
			focusPane: s.focusPane,
		})),
	);

	const {dimensions} = useDimension();

	return (
		<Box width={dimensions.width} height={dimensions.height}>
			<Box
				width="30%"
				borderStyle="round"
				flexDirection="column"
				borderColor={cx({green: focusPane === FocusPane.List})}
			>
				<ListPane />
			</Box>
			<Box
				width="70%"
				borderStyle="round"
				flexDirection="column"
				borderColor={cx({red: focusPane === FocusPane.Preview})}
			>
				<PreviewPane />
			</Box>
		</Box>
	);
};

export default App;
