<script lang="ts">
	import { DatePicker } from '@rief/kit';
	import type {
		DatePickerChangeEvent,
		DateRangeValue,
		DateValue,
		DateMultipleValue
	} from '@rief/kit';

	let bookingDate: DateValue = new Date();
	let sprintRange: DateRangeValue = [null, null];
	let milestones: DateMultipleValue = [];

	let showWeekNumbers = false;
	let firstDayOfWeek: 0 | 1 = 1;
	let variant: 'default' | 'minimal' | 'rounded' | 'bordered' = 'default';

	const disabledDates = [offsetDate(-1), offsetDate(2)];

	function offsetDate(days: number): Date {
		const date = new Date();
		date.setDate(date.getDate() + days);
		return date;
	}

	function handleSingle(event: CustomEvent<DatePickerChangeEvent>) {
		if (event.detail.mode === 'single') {
			bookingDate = event.detail.value as DateValue;
		}
	}

	function handleRange(event: CustomEvent<DatePickerChangeEvent>) {
		if (event.detail.mode === 'range') {
			sprintRange = event.detail.value as DateRangeValue;
		}
	}

	function handleMultiple(event: CustomEvent<DatePickerChangeEvent>) {
		if (event.detail.mode === 'multiple') {
			milestones = event.detail.value as DateMultipleValue;
		}
	}

	function formatDate(value: DateValue) {
		if (!value) return '—';
		const date = value instanceof Date ? value : new Date(value);
		return date.toLocaleDateString(undefined, { dateStyle: 'medium' });
	}

	const datePickerSnippet = `&lt;DatePicker
  mode="range"
  rangeValue={range}
  on:change={(event) =&gt; range = event.detail.value}
  firstDayOfWeek={1}
  showWeekNumbers
/&gt;`;
</script>

<svelte:head>
	<title>DatePicker - Kit Documentation</title>
	<meta
		name="description"
		content="DatePicker examples for single, range, and multi selection modes."
	/>
</svelte:head>

<div class="component-docs">
	<header class="docs-header">
		<p class="eyebrow">Input Field</p>
		<h1>DatePicker</h1>
		<p class="lede">
			All-in-one calendar input that supports single values, ranges, and multiple selections with
			rich internationalization, keyboard support, and inline actions.
		</p>
	</header>

	<section class="demo-section">
		<div class="section-header">
			<h2>Single Date</h2>
			<p>Great for booking flows or any one-off date input.</p>
		</div>

		<div class="demo-panel">
			<DatePicker
				{variant}
				size="md"
				value={bookingDate}
				on:change={handleSingle}
				{firstDayOfWeek}
				{showWeekNumbers}
				{disabledDates}
			/>

			<div class="control-columns">
				<label>
					<span>Variant</span>
					<select bind:value={variant}>
						<option value="default">default</option>
						<option value="minimal">minimal</option>
						<option value="rounded">rounded</option>
						<option value="bordered">bordered</option>
					</select>
				</label>

				<label>
					<span>First day of week</span>
					<select bind:value={firstDayOfWeek}>
						<option value="0">Sunday</option>
						<option value="1">Monday</option>
					</select>
				</label>

				<label class="toggle-row">
					<input type="checkbox" bind:checked={showWeekNumbers} />
					Show ISO week numbers
				</label>
			</div>

			<p class="selection-output">
				Selected date: <strong>{formatDate(bookingDate)}</strong>
			</p>
		</div>
	</section>

	<section class="demo-section">
		<div class="section-header">
			<h2>Range + Multiple</h2>
			<p>Switch <code>mode</code> to unlock two more selection behaviors.</p>
		</div>

		<div class="demo-panel range-grid">
			<div>
				<h3>Sprint window</h3>
				<DatePicker
					mode="range"
					rangeValue={sprintRange}
					on:change={handleRange}
					closeOnSelect={false}
					showToday={true}
					showClear={true}
				/>

				<p class="selection-output">
					{#if sprintRange[0] && sprintRange[1]}
						{formatDate(sprintRange[0])} → {formatDate(sprintRange[1])}
					{:else}
						<span class="chip chip--muted">Pick a start and end</span>
					{/if}
				</p>
			</div>

			<div>
				<h3>Milestones</h3>
				<DatePicker
					mode="multiple"
					multipleValue={milestones}
					on:change={handleMultiple}
					variant="rounded"
				/>

				<div class="chip-row">
					{#if milestones.length > 0}
						{#each milestones as date (String(date))}
							<span class="chip">{formatDate(date)}</span>
						{/each}
					{:else}
						<span class="chip chip--muted">No milestones chosen</span>
					{/if}
				</div>
			</div>
		</div>
	</section>

	<section class="demo-section">
		<div class="section-header">
			<h2>Usage Snippet</h2>
		</div>

		<div class="info-panel">
			<pre class="code-block"><code>{@html datePickerSnippet}</code></pre>
			<ul class="key-points">
				<li>
					<code>mode</code> controls whether <code>value</code>, <code>rangeValue</code>, or
					<code>multipleValue</code> is used.
				</li>
				<li>Disable dates with an array or a function that receives the current day.</li>
				<li>Listen to the <code>change</code> event for normalized date data.</li>
			</ul>
		</div>
	</section>
</div>

<style>
	.component-docs {
		max-width: 960px;
		margin: 0 auto;
		padding: 2rem 1rem 4rem;
		display: flex;
		flex-direction: column;
		gap: 2.5rem;
	}

	.docs-header {
		border-bottom: 1px solid var(--color-border, #e5e7eb);
		padding-bottom: 1.5rem;
	}

	.eyebrow {
		font-size: 0.85rem;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: var(--color-text-secondary, #6b7280);
		margin: 0 0 0.4rem;
	}

	.docs-header h1 {
		font-size: 2.75rem;
		margin: 0 0 0.75rem;
	}

	.lede {
		margin: 0;
		line-height: 1.6;
		color: var(--color-text-secondary, #4b5563);
		max-width: 60ch;
	}

	.demo-section {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.section-header h2 {
		margin: 0;
		font-size: 1.6rem;
	}

	.section-header p {
		margin: 0.2rem 0 0;
		color: var(--color-text-secondary, #6b7280);
	}

	.demo-panel,
	.info-panel {
		border: 1px solid var(--color-border, #e5e7eb);
		border-radius: 0.75rem;
		background: var(--color-surface, #fff);
		padding: 1.5rem;
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.control-columns {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
		gap: 1rem;
	}

	label span {
		display: block;
		font-size: 0.85rem;
		margin-bottom: 0.35rem;
		color: var(--color-text-secondary, #6b7280);
	}

	select {
		width: 100%;
		border-radius: 0.5rem;
		padding: 0.65rem 0.75rem;
		border: 1px solid var(--color-border, #d1d5db);
		background: var(--color-surface, #fff);
	}

	.toggle-row {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.95rem;
		color: var(--color-text-secondary, #4b5563);
	}

	.selection-output {
		margin: 0;
		color: var(--color-text-secondary, #4b5563);
	}

	.range-grid {
		gap: 2rem;
	}

	.range-grid > div {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.range-grid h3 {
		margin: 0;
	}

	.chip-row {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.chip {
		background: var(--color-surface-secondary, #f5f5f5);
		border: 1px solid var(--color-border, #e5e7eb);
		border-radius: 999px;
		padding: 0.25rem 0.75rem;
		font-size: 0.85rem;
	}

	.chip--muted {
		color: var(--color-text-secondary, #9ca3af);
	}

	.code-block {
		font-family: 'Menlo', 'Monaco', 'SFMono-Regular', monospace;
		font-size: 0.85rem;
		background: #0f172a;
		color: #f8fafc;
		padding: 1rem;
		border-radius: 0.5rem;
		overflow-x: auto;
		margin: 0;
	}

	.key-points {
		margin: 0;
		padding-left: 1.2rem;
		color: var(--color-text-secondary, #4b5563);
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
	}

	@media (max-width: 768px) {
		.range-grid {
			display: flex;
			flex-direction: column;
		}
	}
</style>
