import type { SelectOptionItem } from '@rief/kit';

export interface PlaygroundField {
	type: 'text' | 'select' | 'checkbox';
	key: string;
	label: string;
	placeholder?: string;
	options?: SelectOptionItem[];
	showWhen?: (state: Record<string, any>) => boolean;
}

export type CodeGenerator = (state: Record<string, any>) => string;
