<script lang="ts">
	import EyeNone from "svelte-radix/EyeNone.svelte";
	import ArrowDown from "svelte-radix/ArrowDown.svelte";
	import ArrowUp from "svelte-radix/ArrowUp.svelte";
	import CaretSort from "svelte-radix/CaretSort.svelte";
	import Cross2 from "svelte-radix/Cross2.svelte"; // Import Cross2 component
	import type { TableViewModel } from "svelte-headless-table";
	import type { Task } from "../(data)/schemas.js";
	import { cn } from "$lib/utils.js";
	import { Button } from "$lib/registry/new-york/ui/button/index.js";
	import * as DropdownMenu from "$lib/registry/new-york/ui/dropdown-menu/index.js";
	import { Input } from "$lib/registry/new-york/ui/input/index.js";
	import { writable, type Writable, get } from "svelte/store"; // Import Writable

	let className: string | undefined | null = undefined;
	export { className as class };
	export let props: {
		select: never;
		sort: {
			order: "desc" | "asc" | undefined;
			toggle: (_: Event) => void;
			clear: () => void;
			disabled: boolean;
		};
		filter: never;
	};
	export let tableModel: TableViewModel<Task>;
	export let cellId: string;

	// Extract necessary plugin states from the tableModel
	const { hiddenColumnIds } = tableModel.pluginStates.hide;
	const columnFilterValues: Writable<Record<string, string>> = writable({});

	// Reactive variable for the current cell's filter value
	$: filterValueForCell = (get(columnFilterValues)[cellId] || '');

	// Update the filter value in the table model for the specific column
	const { pluginStates } = tableModel;

	function handleAscSort(e: Event) {
		console.log(`Sorting column ${cellId} in ascending order`);
		if (props.sort.order === "asc") {
			return;
		}
		props.sort.toggle(e);
	}

	function handleDescSort(e: Event) {
		console.log(`Sorting column ${cellId} in descending order`);
		if (props.sort.order === "desc") {
			return;
		}
		if (props.sort.order === undefined) {
			// We can only toggle, so we toggle from undefined to 'asc' first
			props.sort.toggle(e);
		}
		props.sort.toggle(e); // Then we toggle from 'asc' to 'desc'
	}

	function handleHide() {
		console.log(`Hiding column ${cellId}`);
		hiddenColumnIds.update((ids: string[]) => {
			if (ids.includes(cellId)) {
				return ids;
			}
			return [...ids, cellId];
		});
	}

	function handleFilterInput(event: Event) {
		const value = (event.target as HTMLInputElement).value;
		console.log(`Filtering column ${cellId} with value: ${value}`);

		// Update the local store for the current cell's filter value
		columnFilterValues.update((filters) => ({
			...filters,
			[cellId]: value,
		}));

		// Ensure pluginStates.filter and pluginStates.filter.columnFilters are initialized
		if (!pluginStates.filter) {
			console.error("Filter plugin state is not defined in tableModel.pluginStates");
			return;
		}

		if (!pluginStates.filter.columnFilters) {
			pluginStates.filter.columnFilters = []; // Initialize columnFilters if undefined
		}

		// Find or create the specific column's filter state
		let columnFilter = pluginStates.filter.columnFilters.find(
			(filter: { id: string }) => filter.id === cellId
		);

		if (columnFilter) {
			columnFilter.value.set(value);
		} else {
			// If no filter exists for this column, create one
			columnFilter = {
				id: cellId,
				value: writable(value),
			};
			pluginStates.filter.columnFilters.push(columnFilter);
		}

		// Manually trigger reactivity for the pageRows to update based on the new filter
		tableModel.rows = tableModel.rows;
	}
</script>

{#if !props.sort.disabled}
	<div class={cn("space-y-2", className)}>
		<DropdownMenu.Root>
			<DropdownMenu.Trigger asChild let:builder>
				<Button
					variant="ghost"
					builders={[builder]}
					class="data-[state=open]:bg-accent -ml-3 h-8"
					size="sm"
				>
					<slot />
					{#if props.sort.order === "desc"}
						<ArrowDown class="ml-2 h-4 w-4" />
					{:else if props.sort.order === "asc"}
						<ArrowUp class="ml-2 h-4 w-4" />
					{:else}
						<CaretSort class="ml-2 h-4 w-4" />
					{/if}
				</Button>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content align="start">
				<DropdownMenu.Item on:click={handleAscSort}>
					<ArrowUp class="text-muted-foreground/70 mr-2 h-3.5 w-3.5" />
					Asc
				</DropdownMenu.Item>
				<DropdownMenu.Item on:click={handleDescSort}>
					<ArrowDown class="text-muted-foreground/70 mr-2 h-3.5 w-3.5" />
					Desc
				</DropdownMenu.Item>
				<DropdownMenu.Separator />
				<DropdownMenu.Item on:click={handleHide}>
					<EyeNone class="text-muted-foreground/70 mr-2 h-3.5 w-3.5" />
					Hide
				</DropdownMenu.Item>
			</DropdownMenu.Content>
		</DropdownMenu.Root>

		<!-- Search Input Field below the dropdown -->
		<div class="flex flex-col space-y-2 pb-3">
			<Input
				placeholder="Search"
				class="h-8 w-[150px]"
				type="search"
				on:input={handleFilterInput}
				bind:value={filterValueForCell}
			/>
		</div>
	</div>
{:else}
	<slot />
{/if}
