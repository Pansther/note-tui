import {useEffect, useRef, useState} from 'react';

const TIMEOUT = 100;

const useDebounce = (value?: string) => {
	const timeoutRef = useRef<NodeJS.Timeout>(undefined);
	const [debounced, setDebounced] = useState(value);

	useEffect(() => {
		clearTimeout(timeoutRef.current);

		timeoutRef.current = setTimeout(() => {
			setDebounced(value);
		}, TIMEOUT);
	}, [value]);

	return debounced;
};

export default useDebounce;
