import {RefObject, useEffect, useState} from 'react';
import {useStdout} from 'ink';
import {ScrollViewRef} from 'ink-scroll-view';

const useDimension = ({
	viewRef,
}: {
	viewRef: RefObject<ScrollViewRef | null>;
}) => {
	const {stdout} = useStdout();

	const [dimensions, setDimensions] = useState({
		width: stdout?.columns || 80,
		height: stdout?.rows || 24,
	});

	useEffect(() => {
		const onResize = () => {
			setDimensions({
				width: stdout?.columns || 80,
				height: stdout?.rows || 24,
			});

			viewRef.current?.remeasure();
		};

		stdout?.on('resize', onResize);

		return () => {
			stdout?.off('resize', onResize);
		};
	}, [stdout]);

	return {
		dimensions,
	};
};

export default useDimension;
