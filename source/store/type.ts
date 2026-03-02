export interface ListItem {
	label: string;
	filename: string;
}

export enum FocusPane {
	List,
	Preview,
}

export enum Mode {
	Idle,
	Create,
	Edit,
	Archived,
}
