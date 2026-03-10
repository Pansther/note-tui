#!/usr/bin/env node
import {render} from 'ink';
import App from './app.js';

// const cli = meow(
// 	`
// 	Usage
// 	  $ note-tui
//
// 	Options
// 		--name  Your name
//
// 	Examples
// 	  $ note-tui --name=Jane
// 	  Hello, Jane
// `,
// 	{
// 		importMeta: import.meta,
// 		flags: {
// 			name: {
// 				type: 'string',
// 			},
// 		},
// 	},
// );

const {waitUntilExit} = render(<App />);

await waitUntilExit();

const cleanup = () => {
	process.stdout.write('\x1b[0m\x1b[2J\x1b[0;0H');
	process.stdout.write('\x1b]111\x07');
	process.exit();
};

process.on('SIGINT', cleanup);
process.on('exit', cleanup);
