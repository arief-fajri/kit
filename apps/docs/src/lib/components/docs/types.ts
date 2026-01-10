export interface PropRow {
	prop: string;
	type: string;
	default: string;
	description: string;
}

export interface APISection {
	title: string;
	rows: PropRow[];
}
