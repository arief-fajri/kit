<script lang="ts">
	import { Card, InputText, Checkbox, SelectOption } from "@rief/kit";
	import type { SelectOptionItem } from "@rief/kit";
	import CodeBlock from "./CodeBlock.svelte";
	import type { PlaygroundField, CodeGenerator } from "./playground/types";

	export let fields: PlaygroundField[] = [];
	export let state: Record<string, any> = {};
	export let generateCode: CodeGenerator = () => "";

	$: generatedCode = generateCode(state);

	$: selectValues = fields
		.filter((f) => f.type === "select")
		.reduce(
			(acc, field) => {
				const options = field.options || [];
				acc[field.key] =
					options.find((opt) => opt.value === state[field.key]) || options[0] || null;
				return acc;
			},
			{} as Record<string, SelectOptionItem | null>
		);

	// Create handler map for select fields
	const selectHandlers: Record<
		string,
		(event: CustomEvent<SelectOptionItem | SelectOptionItem[] | null>) => void
	> = {};

	function createSelectHandler(key: string) {
		if (!selectHandlers[key]) {
			selectHandlers[key] = (event: CustomEvent<SelectOptionItem | SelectOptionItem[] | null>) => {
				const selected = event.detail;
				if (selected && !Array.isArray(selected)) {
					state[key] = selected.value;
				} else {
					state[key] = "";
				}
			};
		}
		return selectHandlers[key];
	}
</script>

<section>
	<!-- <h2 class="text-xl md:text-2xl font-semibold mb-4">Playground</h2> -->

	<Card styling={{ className: "!p-0" }}>
		<div class="w-full grid grid-cols-1 lg:grid-cols-3">
			<div class="col-span-1 lg:col-span-2 flex flex-col">
				<div
					class="w-full h-full border-b lg:border-b-0 lg:border-r border-gray-200 dark:border-gray-700"
				>
					<div class="px-4 py-3 md:px-6 md:py-4">
						<h3 class="text-lg font-semibold mb-3 md:mb-4 text-gray-900 dark:text-gray-100">
							Preview
						</h3>
					</div>
					<div class="w-full flex items-center justify-center min-h-[320px] px-4 pb-4 md:pb-6">
						<slot name="preview" {state} />
					</div>
				</div>
				<CodeBlock className="h-[320px]" maxHeight="320px" code={generatedCode} language="svelte" />
			</div>

			<div class="w-full border-t lg:border-t-0 lg:border-l border-gray-200 dark:border-gray-700">
				<div class="px-4 py-3 md:px-6 md:py-4">
					<h3 class="text-lg font-semibold mb-4 md:mb-6 text-gray-900 dark:text-gray-100">
						Configuration
					</h3>
					<div class="w-full space-y-3 md:space-y-4">
						{#each fields as field (field.key)}
							{#if !field.showWhen || field.showWhen(state)}
								{#if field.type === "text"}
									<InputText
										label={field.label}
										bind:value={state[field.key]}
										placeholder={field.placeholder}
										styling={{ size: "md", variant: "default" }}
									/>
								{:else if field.type === "select"}
									<SelectOption
										label={field.label}
										options={field.options || []}
										value={selectValues[field.key]}
										on:update={createSelectHandler(field.key)}
										styling={{ size: "md", variant: "default" }}
									/>
								{:else if field.type === "checkbox"}
									<Checkbox
										label={field.label}
										bind:checked={state[field.key]}
										styling={{ size: "md", variant: "default" }}
									/>
								{/if}
							{/if}
						{/each}
					</div>
				</div>
			</div>
		</div>
	</Card>
</section>
