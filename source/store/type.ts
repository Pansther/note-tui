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

export interface NoteMetadata {
	createdDate: string;
	updatedDate: string;
	deletedDate?: string;
}
