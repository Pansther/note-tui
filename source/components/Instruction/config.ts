import {FocusPane, Mode} from '../../store/type.js';

interface KeyItem {
	key: string;
	label: string;
	focusPane?: FocusPane;
}

const {Idle, Create, Edit, Archived, Trash, Delete} = Mode;

export const KEY_INSTRUCTION: Record<Mode, KeyItem[]> = {
	[Idle]: [
		{
			key: '↓/j',
			label: 'down',
		},
		{
			key: '↑/k',
			label: 'up',
		},
		{
			key: '←/h',
			label: 'focus note',
		},
		{
			key: '→/l',
			label: 'focus preview',
		},
		{
			key: 'tab',
			label: 'toggle focus',
		},
		{
			key: '<C-d>',
			label: 'scroll down',
		},
		{
			key: '<C-u>',
			label: 'scroll up',
		},
		{
			key: 'g',
			label: 'go top',
		},
		{
			key: 'G',
			label: 'go bottom',
		},
		{
			key: 'e/enter',
			label: 'edit',
			focusPane: FocusPane.List,
		},
		{
			key: 'n',
			label: 'create note',
			focusPane: FocusPane.List,
		},
		{
			key: 'd',
			label: 'archived',
			focusPane: FocusPane.List,
		},
		{
			key: 't',
			label: 'open trash view',
			focusPane: FocusPane.List,
		},
		{
			key: 'q/<C-c>',
			label: 'exit',
		},
	],
	[Create]: [
		{
			key: 'enter',
			label: 'confirm create',
		},
	],
	[Edit]: [],
	[Archived]: [
		{
			key: 'y/enter',
			label: 'confirm',
		},
		{
			key: 'n/esc',
			label: 'cancel',
		},
	],
	[Trash]: [
		{
			key: '↓/j',
			label: 'down',
		},
		{
			key: '↑/k',
			label: 'up',
		},
		{
			key: '<C-d>',
			label: 'scroll down',
		},
		{
			key: '<C-u>',
			label: 'scroll up',
		},
		{
			key: 'g',
			label: 'go top',
		},
		{
			key: 'G',
			label: 'go bottom',
		},
		{
			key: 'r',
			label: 'restore note',
			focusPane: FocusPane.List,
		},
		{
			key: 'd',
			label: 'delete note',
			focusPane: FocusPane.List,
		},
		{
			key: 'q/esc',
			label: 'back to note',
		},
	],
	[Delete]: [
		{
			key: 'y/enter',
			label: 'confirm',
		},
		{
			key: 'n/esc',
			label: 'cancel',
		},
	],
};
