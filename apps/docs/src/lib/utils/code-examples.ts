/**
 * Centralized code examples for documentation
 * This file stores all code examples in a safe format
 */

import { createSafeCodeString, restoreCodeString } from './code-utils';

/**
 * Code examples stored with safe formatting
 * Use restoreCodeString() when passing to CodeBlock component
 */

export const codeExamples = {
	installation: {
		install: 'npm install @rief/kit',
		peerDependency: 'npm install svelte@^4.0.0',
		usage: restoreCodeString(
			createSafeCodeString(`<script>
  import { Button } from '@rief/kit';
</script>

<Button label="Hello World" />`)
		)
	},

	button: {
		basic: restoreCodeString(
			createSafeCodeString(`<script>
  import { Button } from '@rief/kit';
</script>

<Button label="Click me" />`)
		),
		variants: restoreCodeString(
			createSafeCodeString(`<script>
  import { Button } from '@rief/kit';
</script>

<Button label="Filled" styling={{ variant: 'filled' }} />
<Button label="Outlined" styling={{ variant: 'outlined' }} />
<Button label="Text" styling={{ variant: 'text' }} />`)
		),
		sizes: restoreCodeString(
			createSafeCodeString(`<script>
  import { Button } from '@rief/kit';
</script>

<Button label="Small" styling={{ size: 'sm' }} />
<Button label="Medium" styling={{ size: 'md' }} />
<Button label="Large" styling={{ size: 'lg' }} />`)
		)
	},

	accordion: {
		basic: restoreCodeString(
			createSafeCodeString(`<script>
  import { Accordion } from '@rief/kit';
</script>

<Accordion
  content={{
    title: 'What is @rief/kit?',
    content: '<p>@rief/kit is a modern Svelte component library.</p>'
  }}
/>`)
		)
	}
};

/**
 * Helper function to get code example safely
 */
export function getCodeExample(category: keyof typeof codeExamples, key: string): string {
	const categoryExamples = codeExamples[category];
	if (!categoryExamples || !(key in categoryExamples)) {
		return `// Example not found: ${category}.${key}`;
	}
	return (categoryExamples as Record<string, string>)[key] || '';
}
