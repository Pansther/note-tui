import {AvailableTheme, Themes} from './type.js';

const {
	Catppuccin,
	Everforest,
	Gruvbox,
	Rosepine,
	Tokyonight,
	Nord,
	Monokai,
	Dracula,
} = AvailableTheme;

export const themes: Themes = {
	[Catppuccin]: {
		backgroundColor: '#1E1E2E',
		foregroundColor: '#585B70',
		textColor: '#CDD6F4',
		accentColor: '#89B4FA',
		secondaryColor: '#F5C2E7',
		borderColor: '#313244',
		errorColor: '#F38BA8',
	},
	[Everforest]: {
		backgroundColor: '#2B3339',
		foregroundColor: '#50585D',
		textColor: '#D3C6AA',
		accentColor: '#A7C080',
		secondaryColor: '#DBBC7F',
		borderColor: '#343F44',
		errorColor: '#E67E80',
	},
	[Gruvbox]: {
		backgroundColor: '#282828',
		foregroundColor: '#665C54',
		textColor: '#EBDBB2',
		accentColor: '#FABD2F',
		secondaryColor: '#83A598',
		borderColor: '#3C3836',
		errorColor: '#FB4934',
	},
	[Rosepine]: {
		backgroundColor: '#191724',
		foregroundColor: '#524F67',
		textColor: '#E0DEF4',
		accentColor: '#EBBCBA',
		secondaryColor: '#31748F',
		borderColor: '#26233A',
		errorColor: '#EB6F92',
	},
	[Tokyonight]: {
		backgroundColor: '#1A1B26',
		foregroundColor: '#414868',
		textColor: '#A9B1D6',
		accentColor: '#7AA2F7',
		secondaryColor: '#BB9AF7',
		borderColor: '#24283B',
		errorColor: '#F7768E',
	},
	[Nord]: {
		backgroundColor: '#2E3440',
		foregroundColor: '#4C566A',
		textColor: '#D8DEE9',
		accentColor: '#88C0D0',
		secondaryColor: '#81A1C1',
		borderColor: '#3B4252',
		errorColor: '#BF616A',
	},
	[Monokai]: {
		backgroundColor: '#272822',
		foregroundColor: '#49483E',
		textColor: '#F8F8F2', // ขาวนวลคลาสสิก
		accentColor: '#A6E22E',
		secondaryColor: '#FD971F',
		borderColor: '#3E3D32',
		errorColor: '#F92672',
	},
	[Dracula]: {
		backgroundColor: '#282A36',
		foregroundColor: '#44475A',
		textColor: '#F8F8F2', // ขาวสะอาด
		accentColor: '#BD93F9',
		secondaryColor: '#FF79C6',
		borderColor: '#343746',
		errorColor: '#FF5555',
	},
};
