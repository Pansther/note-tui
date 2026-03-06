export interface ListItem {
	label: string;
	filename: string;
}

export enum FocusPane {
	List = 1,
	Preview,
}

export enum Mode {
	Idle,
	Create,
	Edit,
	Archived,
	Trash,
	Delete,
}

export interface NoteMetadata {
	createdDate: string;
	updatedDate: string;
	deletedDate?: string;
}
