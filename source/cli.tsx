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

render(<App />);
