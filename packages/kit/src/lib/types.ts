// Button component types
export interface ButtonProps {
	/** Button text content */
	label?: string;
	/** Button variant style */
	variant?: 'primary' | 'secondary' | 'outline';
	/** Button size */
	size?: 'sm' | 'md' | 'lg';
	/** Disabled state */
	disabled?: boolean;
	/** Click handler */
	onclick?: (event: MouseEvent) => void;
}

// Card component types
export interface CardProps {
	/** Card title */
	title?: string;
	/** Card subtitle */
	subtitle?: string;
}

