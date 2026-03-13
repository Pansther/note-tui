import chalk from 'chalk';
import {marked} from 'marked';
import TerminalRenderer from 'marked-terminal';

import useTheme from '../../theme/index.js';

const useMarked = () => {
	const {textColor, accentColor, secondaryColor} = useTheme(s => s.themeConfig);

	marked.setOptions({
		// @ts-ignore
		renderer: new TerminalRenderer({
			tab: 2,
			firstHeading: chalk.bold.hex(accentColor),
			heading: chalk.bold.hex(secondaryColor),
			listitem: chalk.hex(textColor),
			paragraph: chalk.hex(textColor),
			link: chalk.underline.hex(secondaryColor),
			href: chalk.underline.hex(secondaryColor),
			table: chalk.hex(textColor),
			list(body, ordered) {
				if (ordered) {
					let count = 1;
					return body.replace(/\*/g, () => `${count++}.`);
				}

				return body.replace(/\*/g, chalk.hex(accentColor)('●'));
			},
			hr: () => chalk.gray('─'.repeat(30)) + '\n',
		}),
	});

	return marked;
};

export default useMarked;
