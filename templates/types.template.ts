// [ComponentName] component types
export type [ComponentName]Variant = '[variant1]' | '[variant2]' | '[variant3]' | '[variant4]';
export type [ComponentName]Size = 'sm' | 'md' | 'lg' | 'xl';
export type [ComponentName]State = '[state1]' | '[state2]' | '[state3]';
export type [CustomType] = '[option1]' | '[option2]' | '[option3]';

export interface [ComponentName]Props {
	/** [Primary prop description] */
	[primaryProp]?: string;
	/** [Component variant style] */
	variant?: [ComponentName]Variant;
	/** [Component size] */
	size?: [ComponentName]Size;
	/** [Component state] */
	state?: [ComponentName]State;
	/** [Custom CSS class] */
	className?: string;
	/** [Disabled state] */
	disabled?: boolean;
	/** [Loading/processing state] */
	loading?: boolean;
	/** [Loading message] */
	loadingMessage?: string;
	/** [Custom prop 1 description] */
	[customProp1]?: string;
	/** [Custom prop 2 description] */
	[customProp2]?: string;
	/** [Custom prop 3 description] */
	[customProp3]?: boolean;
	/** [Custom type prop description] */
	[customTypeProp]?: [CustomType];
	/** [Event handler description] */
	on[PrimaryEvent]?: (event: [EventType]) => void;
}
