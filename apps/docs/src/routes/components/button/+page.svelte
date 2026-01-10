<script lang="ts">
	import { Button, Card, InputText, Checkbox, SelectOption } from "@rief/kit";
	import type { SelectOptionItem, ButtonProps } from "@rief/kit";
	import CodeBlock from "../../../lib/components/CodeBlock.svelte";
	import ComponentPlayground from "../../../lib/components/ComponentPlayground.svelte";
	import type { PlaygroundField } from "../../../lib/components/playground/types";
	import {
		DocSection,
		FeaturesList,
		APIReference,
		ExampleCard,
		CodeExample,
		InfoCard
	} from "../../../lib/components";
	import type { PropRow, APISection } from "../../../lib/components";

	type ButtonStyling = NonNullable<ButtonProps["styling"]>;
	type ButtonBehavior = NonNullable<ButtonProps["behavior"]>;

	// Playground state
	let label = "Click me";
	let variant: "filled" | "outlined" | "text" | "link" = "filled";
	let size: "sm" | "md" | "lg" | "xl" = "md";
	let semantic: string = "";
	let fullRounded = false;
	let disabled = false;
	let loading = false;
	let loadingMessage = "Loading...";
	let state: "default" | "active" | "selected" | "highlight" | "" = "";
	let iconPosition: "left" | "right" | "only" | "" = "";
	let href = "";
	let target = "";
	let showIcon = false;

	// Playground state object - initialize with defaults
	let playgroundState: Record<string, any> = {
		label: "Click me",
		variant: "filled",
		size: "md",
		semantic: "",
		fullRounded: false,
		disabled: false,
		loading: false,
		loadingMessage: "Loading...",
		state: "",
		iconPosition: "",
		href: "",
		target: "",
		showIcon: false
	};

	const listTabs = [
		{ name: "Features", value: "features" },
		{ name: "Example", value: "example" },
		{ name: "Playground", value: "playground" },
		{ name: "Reference", value: "reference" },
		{ name: "Styling System", value: "styling" }
	];

	let activeTab = "features";

	// Code generator function
	function generateButtonCode(state: Record<string, any>): string {
		const lines: string[] = [];
		const scriptOpen = "<" + "script" + ">";
		const scriptClose = "</" + "script" + ">";
		lines.push(scriptOpen);
		lines.push('  import { Button } from "@rief/kit";');
		if (state.showIcon) {
			lines.push("  // Import your icon component");
		}
		lines.push(scriptClose);
		lines.push("");

		const stylingProps: string[] = [];
		if (state.variant !== "filled") stylingProps.push("variant: '" + state.variant + "'");
		if (state.size !== "md") stylingProps.push("size: '" + state.size + "'");
		if (state.semantic) stylingProps.push("semantic: '" + state.semantic + "'");
		if (state.fullRounded) stylingProps.push("fullRounded: true");

		const behaviorProps: string[] = [];
		if (state.disabled) behaviorProps.push("disabled: true");
		if (state.loading) {
			behaviorProps.push("loading: true");
			if (state.loadingMessage !== "Loading...") {
				behaviorProps.push("loadingMessage: '" + state.loadingMessage + "'");
			}
		}
		if (state.state) behaviorProps.push("state: '" + state.state + "'");
		if (state.iconPosition) behaviorProps.push("iconPosition: '" + state.iconPosition + "'");
		if (state.href) behaviorProps.push("href: '" + state.href + "'");
		if (state.target) behaviorProps.push("target: '" + state.target + "'");

		lines.push("<Button");
		lines.push('  label="' + state.label + '"');
		if (stylingProps.length > 0) {
			lines.push("  styling={{");
			lines.push("    " + stylingProps.join(",\n    "));
			lines.push("  }}");
		}
		if (behaviorProps.length > 0) {
			lines.push("  behavior={{");
			lines.push("    " + behaviorProps.join(",\n    "));
			lines.push("  }}");
		}
		if (state.showIcon && state.iconPosition) {
			lines.push(">");
			lines.push('  <Icon name="icon-name" slot="icon" />');
			lines.push("</Button>");
		} else {
			lines.push("/>");
		}

		return lines.join("\n");
	}

	// SelectOption options
	const variantOptions: SelectOptionItem[] = [
		{ value: "filled", label: "Filled" },
		{ value: "outlined", label: "Outlined" },
		{ value: "text", label: "Text" },
		{ value: "link", label: "Link" }
	];

	const sizeOptions: SelectOptionItem[] = [
		{ value: "sm", label: "Small" },
		{ value: "md", label: "Medium" },
		{ value: "lg", label: "Large" },
		{ value: "xl", label: "Extra Large" }
	];

	const semanticOptions: SelectOptionItem[] = [
		{ value: "", label: "None" },
		{ value: "primary", label: "Primary" },
		{ value: "secondary", label: "Secondary" },
		{ value: "success", label: "Success" },
		{ value: "danger", label: "Danger" },
		{ value: "warning", label: "Warning" },
		{ value: "info", label: "Info" }
	];

	const stateOptions: SelectOptionItem[] = [
		{ value: "", label: "Default" },
		{ value: "active", label: "Active" },
		{ value: "selected", label: "Selected" },
		{ value: "highlight", label: "Highlight" }
	];

	const iconPositionOptions: SelectOptionItem[] = [
		{ value: "", label: "None" },
		{ value: "left", label: "Left" },
		{ value: "right", label: "Right" },
		{ value: "only", label: "Icon Only" }
	];

	// Sync playground state changes to individual variables
	$: {
		label = playgroundState.label ?? "Click me";
		variant = (playgroundState.variant ?? "filled") as typeof variant;
		size = (playgroundState.size ?? "md") as typeof size;
		semantic = playgroundState.semantic ?? "";
		fullRounded = playgroundState.fullRounded ?? false;
		disabled = playgroundState.disabled ?? false;
		loading = playgroundState.loading ?? false;
		loadingMessage = playgroundState.loadingMessage ?? "Loading...";
		state = (playgroundState.state ?? "") as typeof state;
		iconPosition = (playgroundState.iconPosition ?? "") as typeof iconPosition;
		href = playgroundState.href ?? "";
		target = playgroundState.target ?? "";
		showIcon = playgroundState.showIcon ?? false;
	}

	// Update showIcon when iconPosition changes
	$: if (playgroundState.iconPosition) {
		playgroundState.showIcon = playgroundState.iconPosition !== "";
	}

	// Playground fields configuration
	const playgroundFields: PlaygroundField[] = [
		{ type: "text", key: "label", label: "Label", placeholder: "Enter button label" },
		{ type: "select", key: "variant", label: "Variant", options: variantOptions },
		{ type: "select", key: "size", label: "Size", options: sizeOptions },
		{ type: "select", key: "semantic", label: "Semantic", options: semanticOptions },
		{ type: "select", key: "state", label: "State", options: stateOptions },
		{ type: "select", key: "iconPosition", label: "Icon Position", options: iconPositionOptions },
		{ type: "checkbox", key: "fullRounded", label: "Full Rounded" },
		{ type: "checkbox", key: "disabled", label: "Disabled" },
		{ type: "checkbox", key: "loading", label: "Loading" },
		{
			type: "text",
			key: "loadingMessage",
			label: "Loading Message",
			placeholder: "Loading message text",
			showWhen: (s: Record<string, any>) => s.loading === true
		},
		{
			type: "text",
			key: "href",
			label: "Href (Link URL)",
			placeholder: "e.g. /dashboard or https://example.com"
		},
		{
			type: "text",
			key: "target",
			label: "Target",
			placeholder: "e.g. _blank",
			showWhen: (s: Record<string, any>) => !!s.href
		}
	];

	// Simple icon component for examples
	const SaveIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>`;
	const ArrowRightIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>`;
	const CloseIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;

	// Computed props for playground button
	let playgroundStyling: ButtonStyling;
	let playgroundBehavior: ButtonBehavior;

	$: playgroundStyling = {
		variant,
		size,
		...(semantic && { semantic }),
		...(fullRounded && { fullRounded })
	};

	$: playgroundBehavior = {
		disabled,
		loading,
		...(loading && { loadingMessage }),
		...(state ? { state } : {}),
		...(iconPosition ? { iconPosition } : {}),
		...(href ? { href } : {}),
		...(target ? { target } : {})
	};

	// Documentation data
	const features = [
		"🎨 4 Visual Variants: filled, outlined, text, link",
		"📏 4 Size Options: sm, md, lg, xl",
		"🎯 Multiple States: default, active, selected, highlight",
		"🔗 Link Support: Automatic conversion to anchor tags",
		"♿ Accessibility: Full WCAG compliance with ARIA support",
		"🎭 Loading States: Built-in spinner and custom loading content",
		"🎨 Theming: Extensive CSS custom properties for styling",
		"🔧 TypeScript: Full type safety with comprehensive interfaces",
		"🎯 Icon Support: Flexible icon positioning (left, right, icon-only)"
	];

	const coreProps: PropRow[] = [
		{ prop: "label", type: "string", default: '""', description: "Button text content" },
		{ prop: "ariaLabel", type: "string", default: "undefined", description: "Accessibility label" }
	];

	const stylingProps: PropRow[] = [
		{
			prop: "styling.variant",
			type: "'filled' | 'outlined' | 'text' | 'link'",
			default: "'filled'",
			description: "Visual style variant"
		},
		{
			prop: "styling.semantic",
			type: "'primary' | 'success' | 'warning' | 'danger' | 'info' | string",
			default: "undefined",
			description: "Semantic color variant"
		},
		{
			prop: "styling.size",
			type: "'sm' | 'md' | 'lg' | 'xl'",
			default: "'md'",
			description: "Button size"
		},
		{
			prop: "styling.fullRounded",
			type: "boolean",
			default: "false",
			description: "Apply full border radius"
		},
		{
			prop: "styling.fillColor",
			type: "string",
			default: "undefined",
			description: "Custom background color"
		},
		{
			prop: "styling.textColor",
			type: "string",
			default: "undefined",
			description: "Custom text color"
		},
		{
			prop: "styling.outlineColor",
			type: "string",
			default: "undefined",
			description: "Custom border color"
		},
		{
			prop: "styling.className",
			type: "string",
			default: '""',
			description: "Additional CSS classes"
		}
	];

	const behaviorProps: PropRow[] = [
		{
			prop: "behavior.disabled",
			type: "boolean",
			default: "false",
			description: "Disable the button"
		},
		{
			prop: "behavior.state",
			type: "'default' | 'active' | 'selected' | 'highlight'",
			default: "undefined",
			description: "Button state"
		},
		{
			prop: "behavior.loading",
			type: "boolean",
			default: "false",
			description: "Show loading state"
		},
		{
			prop: "behavior.loadingMessage",
			type: "string",
			default: '"Loading..."',
			description: "Text shown during loading"
		},
		{
			prop: "behavior.iconPosition",
			type: "'left' | 'right' | 'only'",
			default: "'left'",
			description: "Icon placement"
		},
		{
			prop: "behavior.href",
			type: "string",
			default: "undefined",
			description: "URL (converts to anchor tag)"
		},
		{ prop: "behavior.target", type: "string", default: "undefined", description: "Link target" },
		{
			prop: "behavior.rel",
			type: "string",
			default: "undefined",
			description: "Link rel attribute"
		},
		{
			prop: "behavior.stopPropagation",
			type: "boolean",
			default: "false",
			description: "Stop event propagation"
		}
	];

	const eventsRows: PropRow[] = [
		{
			prop: "click",
			type: "MouseEvent",
			default: "-",
			description: "Fired when button is clicked"
		},
		{
			prop: "focus",
			type: "FocusEvent",
			default: "-",
			description: "Fired when button receives focus"
		},
		{
			prop: "blur",
			type: "FocusEvent",
			default: "-",
			description: "Fired when button loses focus"
		},
		{
			prop: "keydown",
			type: "KeyboardEvent",
			default: "-",
			description: "Fired when a key is pressed"
		},
		{
			prop: "dragstart",
			type: "Object with event property",
			default: "-",
			description: "Fired when drag starts"
		}
	];

	const apiSections: APISection[] = [
		{ title: "Core Props", rows: coreProps },
		{ title: "Styling Props", rows: stylingProps },
		{ title: "Behavior Props", rows: behaviorProps },
		{ title: "Events", rows: eventsRows }
	];
</script>

<svelte:head>
	<title>Button - @rief/kit</title>
</svelte:head>

<div class="space-y-6">
	<div>
		<h1 class="text-2xl md:text-4xl font-bold mb-3 md:mb-4">Button</h1>
		<p class="text-base md:text-lg text-gray-600 dark:text-gray-400">
			A highly customizable, accessible button component with multiple variants, sizes, states, and
			can function as both a button and a link.
		</p>
	</div>

	<div class="w-full flex items-center px-2 pt-2 border-b gap-2 sticky top-0 bg-white z-[100]">
		{#each listTabs as tab}
			<Button
				label={tab.name}
				styling={{
					variant: "text",
					className: "!rounded-b-none"
				}}
				behavior={{ state: activeTab === tab.value ? "active" : "default" }}
				on:click={() => {
					activeTab = tab.value;
				}}
			/>
		{/each}
	</div>

	<div class="w-full px-2">
		{#if activeTab === "playground"}
			<ComponentPlayground
				fields={playgroundFields}
				bind:state={playgroundState}
				generateCode={generateButtonCode}
			>
				<svelte:fragment slot="preview">
					{#if showIcon && iconPosition}
						<Button {label} styling={playgroundStyling} behavior={playgroundBehavior}>
							<span slot="icon" class="inline-flex items-center">{@html SaveIcon}</span>
						</Button>
					{:else}
						<Button {label} styling={playgroundStyling} behavior={playgroundBehavior} />
					{/if}
				</svelte:fragment>
			</ComponentPlayground>
		{:else if activeTab === "features"}
			<DocSection title="Features">
				<FeaturesList {features} />
			</DocSection>
		{:else if activeTab === "example"}
			<DocSection title="Examples">
				<div class="space-y-6">
					<ExampleCard
						title="Basic Usage"
						code={`<script>
		import { Button } from '@rief/kit';
	</script>
	
	<Button label="Click me" styling={{ variant: 'filled' }} />`}
					>
						<svelte:fragment slot="preview">
							<Button label="Click me" styling={{ variant: "filled" }} />
						</svelte:fragment>
					</ExampleCard>

					<ExampleCard
						title="Variants"
						code={`<Button label="Filled" styling={{ variant: 'filled' }} />
	<Button label="Outlined" styling={{ variant: 'outlined' }} />
	<Button label="Text" styling={{ variant: 'text' }} />
	<Button label="Link" styling={{ variant: 'link' }} />`}
					>
						<svelte:fragment slot="preview">
							<Button label="Filled" styling={{ variant: "filled" }} />
							<Button label="Outlined" styling={{ variant: "outlined" }} />
							<Button label="Text" styling={{ variant: "text" }} />
							<Button label="Link" styling={{ variant: "link" }} />
						</svelte:fragment>
					</ExampleCard>

					<ExampleCard
						title="Sizes"
						code={`<Button label="Small" styling={{ size: 'sm' }} />
	<Button label="Medium" styling={{ size: 'md' }} />
	<Button label="Large" styling={{ size: 'lg' }} />
	<Button label="Extra Large" styling={{ size: 'xl' }} />`}
						previewClassName="items-center"
					>
						<svelte:fragment slot="preview">
							<Button label="Small" styling={{ size: "sm" }} />
							<Button label="Medium" styling={{ size: "md" }} />
							<Button label="Large" styling={{ size: "lg" }} />
							<Button label="Extra Large" styling={{ size: "xl" }} />
						</svelte:fragment>
					</ExampleCard>

					<ExampleCard
						title="Semantic Colors"
						code={`<Button label="Primary" styling={{ variant: 'filled', semantic: 'primary' }} />
	<Button label="Success" styling={{ variant: 'filled', semantic: 'success' }} />
	<Button label="Warning" styling={{ variant: 'filled', semantic: 'warning' }} />
	<Button label="Danger" styling={{ variant: 'filled', semantic: 'danger' }} />
	<Button label="Info" styling={{ variant: 'filled', semantic: 'info' }} />`}
					>
						<svelte:fragment slot="preview">
							<Button label="Primary" styling={{ variant: "filled", semantic: "primary" }} />
							<Button label="Success" styling={{ variant: "filled", semantic: "success" }} />
							<Button label="Warning" styling={{ variant: "filled", semantic: "warning" }} />
							<Button label="Danger" styling={{ variant: "filled", semantic: "danger" }} />
							<Button label="Info" styling={{ variant: "filled", semantic: "info" }} />
						</svelte:fragment>
					</ExampleCard>

					<ExampleCard
						title="States"
						code={`<Button label="Default" behavior={{ state: 'default' }} />
	<Button label="Active" behavior={{ state: 'active' }} />
	<Button label="Selected" behavior={{ state: 'selected' }} />
	<Button label="Highlight" behavior={{ state: 'highlight' }} />`}
					>
						<svelte:fragment slot="preview">
							<Button label="Default" behavior={{ state: "default" }} />
							<Button label="Active" behavior={{ state: "active" }} />
							<Button label="Selected" behavior={{ state: "selected" }} />
							<Button label="Highlight" behavior={{ state: "highlight" }} />
						</svelte:fragment>
					</ExampleCard>

					<ExampleCard
						title="Icons"
						code={`<script>
		import { Button } from '@rief/kit';
		import Icon from './Icon.svelte';
	</script>
	
	<!-- Icon on the left (default) -->
	<Button label="Save" behavior={{ iconPosition: 'left' }}>
		<Icon name="save" slot="icon" />
	</Button>
	
	<!-- Icon on the right -->
	<Button label="Next" behavior={{ iconPosition: 'right' }}>
		<Icon name="arrow-right" slot="icon" />
	</Button>
	
	<!-- Icon only -->
	<Button behavior={{ iconPosition: 'only' }} ariaLabel="Close">
		<Icon name="close" slot="icon" />
	</Button>`}
					>
						<svelte:fragment slot="preview">
							<Button label="Save" behavior={{ iconPosition: "left" }}>
								<span slot="icon" class="inline-flex items-center">{@html SaveIcon}</span>
							</Button>
							<Button label="Next" behavior={{ iconPosition: "right" }}>
								<span slot="icon" class="inline-flex items-center">{@html ArrowRightIcon}</span>
							</Button>
							<Button behavior={{ iconPosition: "only" }} ariaLabel="Close">
								<span slot="icon" class="inline-flex items-center">{@html CloseIcon}</span>
							</Button>
						</svelte:fragment>
					</ExampleCard>

					<ExampleCard
						title="Loading States"
						code={`<script>
		let loading = false;
	
		async function handleSubmit() {
			loading = true;
			try {
				await submitForm();
			} finally {
				loading = false;
			}
		}
	</script>
	
	<Button
		label="Submit"
		behavior={{
			loading: loading,
			loadingMessage: 'Submitting...'
		}}
		on:click={handleSubmit}
	/>`}
					>
						<svelte:fragment slot="preview">
							<Button
								label="Submit"
								behavior={{
									loading: true,
									loadingMessage: "Submitting..."
								}}
							/>
							<Button label="Upload" behavior={{ loading: true }} />
						</svelte:fragment>
					</ExampleCard>

					<ExampleCard
						title="Links"
						code={`<!-- Internal link -->
	<Button label="Go to Dashboard" behavior={{ href: '/dashboard' }} />
	
	<!-- External link (automatically gets target="_blank" and rel="noopener noreferrer") -->
	<Button label="Visit Site" behavior={{ href: 'https://example.com' }} />`}
					>
						<svelte:fragment slot="preview">
							<Button label="Internal Link" behavior={{ href: "/dashboard" }} />
							<Button label="External Link" behavior={{ href: "https://example.com" }} />
						</svelte:fragment>
					</ExampleCard>

					<ExampleCard
						title="Custom Styling"
						code={`<Button
		label="Custom Colors"
		styling={{
			fillColor: '#ff6b6b',
			textColor: '#ffffff',
			outlineColor: '#ff5252'
		}}
	/>
	
	<Button label="Full Rounded" styling={{ fullRounded: true }} />`}
					>
						<svelte:fragment slot="preview">
							<Button
								label="Custom Colors"
								styling={{
									fillColor: "#ff6b6b",
									textColor: "#ffffff"
								}}
							/>
							<Button label="Full Rounded" styling={{ fullRounded: true }} />
						</svelte:fragment>
					</ExampleCard>
				</div>
			</DocSection>
		{:else if activeTab === "styling"}
			<DocSection title="Styling System">
				<div class="space-y-6">
					<InfoCard
						description="The Button component uses an extensive CSS custom properties (CSS variables) system for complete theming and customization. This allows you to create consistent design systems, implement dark/light themes, and customize every aspect of the button's appearance."
					/>

					<CodeExample
						title="CSS Custom Properties Overview"
						code={`/* The Button component uses CSS custom properties for all styling */
	/* Naming convention: --btn-property-variant-state */
	
	/* === VARIANT COLORS === */
	--btn-bg-filled              /* Filled variant background */
	--btn-bg-filled-hover        /* Filled variant hover state */
	--btn-bg-filled-active        /* Filled variant active state */
	--btn-text-filled            /* Filled variant text color */
	
	--btn-bg-outlined-hover       /* Outlined variant hover background */
	--btn-border-outlined         /* Outlined variant border color */
	--btn-text-outlined           /* Outlined variant text color */
	
	--btn-bg-text-hover           /* Text variant hover background */
	--btn-text-text               /* Text variant text color */
	
	--btn-text-link               /* Link variant text color */
	
	/* === SIZES === */
	--btn-padding-x-sm            /* Small size horizontal padding */
	--btn-padding-y-sm            /* Small size vertical padding */
	--btn-font-size-sm            /* Small size font size */
	--btn-border-radius-sm        /* Small size border radius */
	
	/* Similar for md, lg, xl sizes */
	
	/* === STATES === */
	--btn-bg-selected             /* Selected state background */
	--btn-text-selected           /* Selected state text */
	--btn-bg-highlight            /* Highlight state background */
	--btn-bg-disabled             /* Disabled state background */
	--btn-text-disabled           /* Disabled state text */
	
	/* === FOCUS === */
	--btn-focus-ring-color        /* Focus ring color */
	--btn-focus-ring-width        /* Focus ring width */
	--btn-focus-ring-offset       /* Focus ring offset */
	
	/* === TYPOGRAPHY === */
	--btn-font-family             /* Font family */
	--btn-font-weight             /* Font weight */
	--btn-line-height             /* Line height */
	
	/* === TRANSITIONS === */
	--btn-transition-duration     /* Transition duration */
	--btn-transition-timing       /* Transition timing function */`}
						language="css"
					/>

					<CodeExample
						title="Global Theme Setup"
						code={`/* Create a global CSS file (e.g., app.css or theme.css) */
	
	:root {
		/* === DESIGN TOKENS === */
		--color-primary: #3b82f6;
		--color-primary-hover: #2563eb;
		--color-primary-active: #1d4ed8;
		
		--color-success: #10b981;
		--color-warning: #f59e0b;
		--color-danger: #ef4444;
		
		/* === BUTTON GLOBAL STYLES === */
		/* Filled Variant */
		--btn-bg-filled: var(--color-primary);
		--btn-bg-filled-hover: var(--color-primary-hover);
		--btn-bg-filled-active: var(--color-primary-active);
		--btn-text-filled: #ffffff;
		
		/* Outlined Variant */
		--btn-bg-outlined-hover: rgba(59, 130, 246, 0.05);
		--btn-border-outlined: var(--color-primary);
		--btn-text-outlined: var(--color-primary);
		
		/* Text Variant */
		--btn-bg-text-hover: rgba(59, 130, 246, 0.05);
		--btn-text-text: var(--color-primary);
		
		/* Link Variant */
		--btn-text-link: var(--color-primary);
		
		/* Focus */
		--btn-focus-ring-color: var(--color-primary);
		
		/* Typography */
		--btn-font-family: 'Inter', sans-serif;
		--btn-font-weight: 500;
	}`}
						language="css"
					/>

					<CodeExample
						title="Dark Theme"
						code={`/* Dark theme is automatically applied via data-theme attribute */
	
	[data-theme='dark'] {
		--color-surface: #1f2937;
		--color-surface-hover: #374151;
		--color-on-surface: #f9fafb;
		
		/* Dark theme button overrides */
		--btn-bg-filled: var(--color-primary);
		--btn-bg-outlined-hover: rgba(59, 130, 246, 0.1);
		--btn-bg-text-hover: rgba(59, 130, 246, 0.1);
		--btn-bg-disabled: #374151;
		--btn-text-disabled: #6b7280;
		--btn-border-disabled: #4b5563;
	}
	
	/* Usage in HTML */
	/* <html data-theme="dark"> */
	/*   <Button label="Dark Theme Button" /> */
	/* </html> */
	
	/* Or programmatically */
	/* document.documentElement.setAttribute('data-theme', 'dark'); */`}
						language="css"
					/>

					<CodeExample
						title="Component-Specific Overrides"
						code={`/* Target specific button instances with custom classes */
	
	/* Custom button variant */
	.btn-success {
		--btn-bg: var(--color-success);
		--btn-bg-hover: #059669;
		--btn-bg-active: #047857;
		--btn-text: #ffffff;
		--btn-border: var(--color-success);
		--btn-focus-ring-color: var(--color-success);
	}
	
	.btn-danger {
		--btn-bg: var(--color-danger);
		--btn-bg-hover: #dc2626;
		--btn-bg-active: #b91c1c;
		--btn-text: #ffffff;
		--btn-border: var(--color-danger);
		--btn-focus-ring-color: var(--color-danger);
	}
	
	/* Scoped styling for specific contexts */
	.header-cta-button {
		--btn-bg: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		--btn-bg-hover: linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%);
		--btn-text: #ffffff;
		--btn-border-radius: 9999px;
		--btn-padding-x: 2rem;
	}
	
	.sidebar-nav-button {
		--btn-bg: transparent;
		--btn-bg-hover: rgba(59, 130, 246, 0.1);
		--btn-text: var(--color-on-surface);
		--btn-text-hover: var(--color-primary);
		--btn-justify-content: flex-start;
	}`}
						language="css"
					/>

					<CodeExample
						title="Using Custom Classes"
						code={`<script>
		import { Button } from '@rief/kit';
	</script>
	
	<!-- Apply custom styling via className -->
	<Button 
		label="Success Action" 
		styling={{ className: 'btn-success' }} 
	/>
	
	<Button 
		label="Delete" 
		styling={{ className: 'btn-danger' }} 
	/>
	
	<Button 
		label="CTA Button" 
		styling={{ className: 'header-cta-button' }} 
	/>`}
						language="svelte"
					/>

					<CodeExample
						title="Design System Integration"
						code={`/* Map your design system tokens to button properties */
	
	:root {
		/* Design System Tokens */
		--ds-color-primary-500: #3b82f6;
		--ds-color-primary-600: #2563eb;
		--ds-color-primary-700: #1d4ed8;
		--ds-space-2: 0.5rem;
		--ds-space-4: 1rem;
		--ds-radius-md: 0.375rem;
		--ds-text-base: 1rem;
		
		/* Button Mappings */
		--btn-bg-filled: var(--ds-color-primary-500);
		--btn-bg-filled-hover: var(--ds-color-primary-600);
		--btn-bg-filled-active: var(--ds-color-primary-700);
		--btn-padding-x-md: var(--ds-space-4);
		--btn-padding-y-md: var(--ds-space-2);
		--btn-border-radius-md: var(--ds-radius-md);
		--btn-font-size-md: var(--ds-text-base);
	}
	
	/* Tailwind CSS Integration */
	.btn-tailwind {
		--btn-bg: theme('colors.blue.500');
		--btn-bg-hover: theme('colors.blue.600');
		--btn-text: theme('colors.white');
		--btn-border-radius: theme('borderRadius.md');
		--btn-padding-x: theme('spacing.4');
		--btn-padding-y: theme('spacing.2');
	}`}
						language="css"
					/>

					<CodeExample
						title="Responsive Theming"
						code={`/* Mobile-first responsive button sizing */
	
	:root {
		--btn-padding-x-responsive: 0.75rem;
		--btn-padding-y-responsive: 0.375rem;
		--btn-font-size-responsive: 0.875rem;
	}
	
	@media (min-width: 640px) {
		:root {
			--btn-padding-x-responsive: 1rem;
			--btn-padding-y-responsive: 0.5rem;
			--btn-font-size-responsive: 1rem;
		}
	}
	
	@media (min-width: 1024px) {
		:root {
			--btn-padding-x-responsive: 1.25rem;
			--btn-padding-y-responsive: 0.625rem;
			--btn-font-size-responsive: 1.125rem;
		}
	}
	
	.btn-responsive {
		--btn-padding-x: var(--btn-padding-x-responsive);
		--btn-padding-y: var(--btn-padding-y-responsive);
		--btn-font-size: var(--btn-font-size-responsive);
	}`}
						language="css"
					/>

					<CodeExample
						title="Animation Customization"
						code={`/* Custom transitions and animations */
	
	.btn-smooth {
		--btn-transition-duration: 0.3s;
		--btn-transition-timing: cubic-bezier(0.4, 0, 0.2, 1);
	}
	
	.btn-bouncy {
		--btn-transition-duration: 0.2s;
		--btn-transition-timing: cubic-bezier(0.68, -0.55, 0.265, 1.55);
	}
	
	/* Custom hover effects */
	.btn-lift:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
	}
	
	.btn-glow:hover {
		box-shadow: 0 0 20px rgba(59, 130, 246, 0.4);
	}`}
						language="css"
					/>

					<CodeExample
						title="Dynamic Theming with JavaScript"
						code={`<script>
		import { Button } from '@rief/kit';
		
		// Define theme configurations
		const buttonTheme = {
			primary: {
				'--btn-bg': '#3b82f6',
				'--btn-bg-hover': '#2563eb',
				'--btn-text': '#ffffff'
			},
			secondary: {
				'--btn-bg': '#6b7280',
				'--btn-bg-hover': '#4b5563',
				'--btn-text': '#ffffff'
			}
		};
		
		let theme = 'primary';
		$: buttonStyles = Object.entries(buttonTheme[theme])
			.map(([key, value]) => \`\${key}: \${value}\`)
			.join('; ');
	</script>
	
	<Button label="Dynamic Theme" style={buttonStyles} />
	
	<button on:click={() => theme = theme === 'primary' ? 'secondary' : 'primary'}>
		Toggle Theme
	</button>`}
						language="svelte"
					/>

					<InfoCard description="Key Features">
						<ul class="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mt-4">
							<li>
								<strong>Semantic Naming:</strong> Use meaningful class names that describe purpose, not
								appearance
							</li>
							<li>
								<strong>Layer Overrides:</strong> Use CSS specificity wisely - global defaults, theme
								overrides, component-specific styles
							</li>
							<li>
								<strong>Maintain Consistency:</strong> Keep spacing, colors, and typography consistent
								across your design system
							</li>
							<li>
								<strong>Test Accessibility:</strong> Ensure sufficient color contrast and focus indicators
								in all themes
							</li>
							<li>
								<strong>Performance:</strong> Minimize the number of custom properties to avoid performance
								issues
							</li>
						</ul>
					</InfoCard>
				</div>
			</DocSection>
		{:else if activeTab === "reference"}
			<DocSection title="API Reference">
				<APIReference sections={apiSections} />
			</DocSection>

			<DocSection title="Events">
				<InfoCard
					description="The Button component dispatches several events that you can listen to:"
				>
					<CodeBlock
						code={`<script>
		import { Button } from '@rief/kit';
	
		function handleClick(event) {
			console.log('Button clicked', event);
		}
	
		function handleFocus(event) {
			console.log('Button focused', event);
		}
	
		function handleBlur(event) {
			console.log('Button blurred', event);
		}
	
		function handleKeydown(event) {
			console.log('Key pressed', event);
		}
	</script>
	
	<Button
		label="Interactive Button"
		on:click={handleClick}
		on:focus={handleFocus}
		on:blur={handleBlur}
		on:keydown={handleKeydown}
	/>`}
						language="svelte"
					/>
				</InfoCard>
			</DocSection>

			<DocSection title="Accessibility">
				<InfoCard description="The Button component is fully accessible by default:">
					<ul class="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
						<li>Proper semantic markup (<code>&lt;button&gt;</code> or <code>&lt;a&gt;</code>)</li>
						<li>
							ARIA attributes for screen readers (aria-label, aria-busy, aria-disabled,
							aria-pressed)
						</li>
						<li>Keyboard navigation support (Enter, Space)</li>
						<li>Focus management with visible focus indicators</li>
						<li>Loading state announcements</li>
					</ul>
					<CodeBlock
						code={`<!-- Accessible icon-only button -->
	<Button behavior={{ iconPosition: 'only' }} ariaLabel="Delete item" on:click={deleteItem}>
		<TrashIcon slot="icon" />
	</Button>`}
						language="svelte"
					/>
				</InfoCard>
			</DocSection>

			<DocSection title="Advanced Usage">
				<div class="space-y-6 w-full">
					<CodeExample
						title="Form Integration"
						code={`<script>
		let submitting = false;
		let isFormValid = true;
	
		async function handleSubmit(event) {
			event.preventDefault();
			submitting = true;
			try {
				await submitForm();
			} finally {
				submitting = false;
			}
		}
	</script>
	
	<form on:submit|preventDefault={handleSubmit}>
		<Button
			label="Submit Form"
			behavior={{
				loading: submitting,
				disabled: !isFormValid
			}}
		/>
	</form>`}
						language="svelte"
					/>

					<CodeExample
						title="Dynamic Content"
						code={`<script>
		let expanded = false;
	
		function toggle() {
			expanded = !expanded;
		}
	</script>
	
	<Button on:click={toggle}>
		<span slot="icon">
			{#if expanded}
				<ChevronUpIcon />
			{:else}
				<ChevronDownIcon />
			{/if}
		</span>
		{expanded ? 'Collapse' : 'Expand'}
	</Button>`}
						language="svelte"
					/>

					<CodeExample
						title="Conditional Rendering"
						code={`<script>
		let isEditing = false;
		let isPrimary = true;
		let currentState = 'default';
		let isValid = true;
	</script>
	
	<Button
		label={isEditing ? 'Save' : 'Edit'}
		styling={{
			variant: isPrimary ? 'filled' : 'outlined'
		}}
		behavior={{
			state: currentState,
			disabled: !isValid
		}}
	/>`}
						language="svelte"
					/>
				</div>
			</DocSection>

			<DocSection title="TypeScript">
				<InfoCard description="The component exports comprehensive TypeScript types:">
					<CodeBlock
						code={`import type { ButtonProps, ButtonStyling, ButtonBehavior } from '@rief/kit';
	
	const buttonConfig: ButtonProps = {
		label: 'Typed Button',
		styling: {
			variant: 'filled',
			size: 'lg',
			semantic: 'primary'
		},
		behavior: {
			state: 'default',
			loading: false
		}
	};`}
						language="typescript"
					/>
				</InfoCard>
			</DocSection>
		{/if}
	</div>
</div>
