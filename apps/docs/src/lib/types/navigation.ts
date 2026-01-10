export type ComponentStatus = 'stable' | 'beta' | 'experimental' | 'deprecated';

export interface NavigationItem {
	title: string;
	href: string;
	status?: ComponentStatus;
}

export interface NavigationSection {
	title: string;
	items: NavigationItem[];
}
