<script lang="ts">
  import { get, readable } from 'svelte/store';
  import {
    Render,
    Subscribe,
    createRender,
    createTable,
  } from 'svelte-headless-table';
  import {
    addColumnFilters,
    addHiddenColumns,
    addPagination,
    addSelectedRows,
    addSortBy,
    addTableFilter,
  } from 'svelte-headless-table/plugins';
  import type { Task } from '../(data)/schemas.js';
  import {
    DataTableCheckbox,
    DataTableColumnHeader,
    DataTablePagination,
    // DataTablePriorityCell,
    DataTableRowActions,
    DataTableStatusCell,
    DataTableTitleCell,
    DataTableToolbar,
  } from './index.js';

  import * as Table from '$lib/registry/new-york/ui/table/index.js';
  import { Button } from "$lib/components/ui/button/index.js";
  // export let data: Task[];
  // export let data = [];
  export let data: Task[] = [];
  import LoaderCircle from "lucide-svelte/icons/loader-circle";

  let isRunning = false;

  // Simulate a loading operation
  async function handleStartClick() {
    isRunning = true;
  }

  const table = createTable(readable(data), {
    select: addSelectedRows(),
    sort: addSortBy({
      toggleOrder: ['asc', 'desc'],
    }),
    page: addPagination(),
    filter: addTableFilter({
      fn: ({ filterValue, value }) => {
        return value.toLowerCase().includes(filterValue.toLowerCase());
      },
    }),
    colFilter: addColumnFilters(),
    hide: addHiddenColumns(),
  });

  const columns = table.createColumns([
    table.display({
      id: 'select',
      header: (_, { pluginStates }) => {
        const { allPageRowsSelected } = pluginStates.select;
        return createRender(DataTableCheckbox, {
          checked: allPageRowsSelected,
          'aria-label': 'Select all',
        });
      },
      cell: ({ row }, { pluginStates }) => {
        const { getRowState } = pluginStates.select;
        const { isSelected } = getRowState(row);
        return createRender(DataTableCheckbox, {
          checked: isSelected,
          'aria-label': 'Select row',
          class: 'translate-y-[2px]',
        });
      },
      plugins: {
        sort: {
          disable: true,
        },
      },
    }),
    table.column({
      accessor: 'ad_code',
      // header: () => {
      //   return 'Ad Code';
      // },
      header: 'Ad Code',
      id: 'ad_code',
      plugins: {
        sort: {
          disable: false,
        },
      },
    }),
    table.column({
      accessor: 'exp_serial',
      // header: () => {
      //   return 'Exp Serial';
      // },
      header: 'Exp Serial',
      id: 'exp_serial',
      plugins: {
        sort: {
          disable: false,
        },
      },
    }),
    table.column({
      accessor: 'exp_year',
      // header: () => {
      //   return 'Exp Year';
      // },
      header: 'Exp Year',
      id: 'exp_year',
      plugins: {
        sort: {
          disable: false,
        },
      },
    }),
    table.column({
      accessor: 'invoice_no',
      // header: () => {
      //   return 'Invoice No';
      // },
      header: 'Invoice No',
      id: 'invoice_no',
      plugins: {
        sort: {
          disable: false,
        },
      },
    }),
    // table.column({
    // 	accessor: "title",
    // 	header: "Title",
    // 	id: "title",
    // 	cell: ({ value, row }) => {
    // 		if (row.isData()) {
    // 			return createRender(DataTableTitleCell, {
    // 				value,
    // 				labelValue: row.original.label,
    // 			});
    // 		}
    // 		return value;
    // 	},
    // }),
    table.column({
      accessor: 'status',
      header: 'Status',
      id: 'status',
      cell: ({ value }) => {
        return createRender(DataTableStatusCell, {
          value,
        });
      },
      plugins: {
        colFilter: {
          fn: ({ filterValue, value }) => {
            if (filterValue.length === 0) return true;
            if (!Array.isArray(filterValue) || typeof value !== 'string')
              return true;
            return filterValue.some((filter) => {
              return value.includes(filter);
            });
          },
          initialFilterValue: [],
          render: ({ filterValue }) => {
            return get(filterValue);
          },
        },
      },
    }),
    // table.column({
    //   accessor: 'priority',
    //   id: 'priority',
    //   header: 'Priority',
    //   cell: ({ value }) => {
    //     return createRender(DataTablePriorityCell, {
    //       value,
    //     });
    //   },
    //   plugins: {
    //     colFilter: {
    //       fn: ({ filterValue, value }) => {
    //         if (filterValue.length === 0) return true;
    //         if (!Array.isArray(filterValue) || typeof value !== 'string')
    //           return true;

    //         return filterValue.some((filter) => {
    //           return value.includes(filter);
    //         });
    //       },
    //       initialFilterValue: [],
    //       render: ({ filterValue }) => {
    //         return get(filterValue);
    //       },
    //     },
    //   },
    // }),
    table.display({
      id: 'actions',
      header: () => {
        return 'Actions';
      },
      cell: ({ row }) => {
        if (row.isData() && row.original) {
          return createRender(DataTableRowActions, {
            row: row.original,
          });
        }
        return '';
      },
    }),
  ]);

  const tableModel = table.createViewModel(columns);
  const { headerRows, pageRows, tableAttrs, tableBodyAttrs } = tableModel;
    // Destructuring the pagination state
    const{pluginStates}=tableModel;
    const { pageIndex, pageSize } = pluginStates.page;
</script>

<div class="space-y-4">

    <!-- Conditionally render the button based on isRunning -->
    {#if isRunning}
    <Button disabled>
      <LoaderCircle class="mr-2 h-4 w-4 animate-spin" />
      Running
    </Button>
  {:else}
    <Button variant="destructive" on:click={handleStartClick}>
      Start
    </Button>
  {/if}

  
  <!-- Toolbar and pagination components -->
  <DataTableToolbar {tableModel} {data} />
  <DataTablePagination {tableModel} />

  <div class="rounded-md border">
    <Table.Root {...$tableAttrs}>
      <Table.Header>
        {#each $headerRows as headerRow}
          <Subscribe rowAttrs={headerRow.attrs()}>
            <Table.Row>
              <!-- Render checkbox and column headers -->
              {#each headerRow.cells as cell (cell.id)}
                <Subscribe
                  attrs={cell.attrs()}
                  props={cell.props()}
                  let:attrs
                  let:props
                >
                  {#if cell.id === 'select'}
                    <Table.Head {...attrs}>
                      <Render of={cell.render()} />
                    </Table.Head>
                  {/if}
                </Subscribe>
              {/each}

              <!-- Render SL column header -->
              <Table.Head>
                <span>SL</span>
              </Table.Head>

              <!-- Render other column headers -->
              {#each headerRow.cells as cell (cell.id)}
                <Subscribe
                  attrs={cell.attrs()}
                  props={cell.props()}
                  let:attrs
                  let:props
                >
                  {#if cell.id !== 'select' && cell.id !== 'actions'}
                    <Table.Head {...attrs}>
                      <DataTableColumnHeader
                        {props}
                        {tableModel}
                        cellId={cell.id}
                      >
                        <Render of={cell.render()} />
                      </DataTableColumnHeader>
                    </Table.Head>
                  {/if}

                  {#if cell.id === 'actions'}
                    <Table.Head {...attrs}>
                      <Render of={cell.render()} />
                    </Table.Head>
                  {/if}
                </Subscribe>
              {/each}
            </Table.Row>
          </Subscribe>
        {/each}
      </Table.Header>

      <Table.Body {...$tableBodyAttrs}>
        {#if $pageRows.length}
          {#each $pageRows as row, i (row.id)}
            <Subscribe rowAttrs={row.attrs()} let:rowAttrs>
              <Table.Row {...rowAttrs}>
                <!-- Render the checkbox -->
                {#each row.cells as cell (cell.id)}
                  <Subscribe attrs={cell.attrs()} let:attrs>
                    {#if cell.id === 'select'}
                      <Table.Cell {...attrs}>
                        <Render of={cell.render()} />
                      </Table.Cell>
                    {/if}
                  </Subscribe>
                {/each}

                <!-- Render the SL number -->
                <Table.Cell>
                  <!-- Correct calculation for SL number -->
                  <span>{($pageIndex * $pageSize) + (i + 1)}</span>
                </Table.Cell>

                <!-- Render the rest of the cells -->
                {#each row.cells as cell (cell.id)}
                  <Subscribe attrs={cell.attrs()} let:attrs>
                    {#if cell.id !== 'select' && cell.id !== 'actions'}
                      <Table.Cell {...attrs}>
                        <Render of={cell.render()} />
                      </Table.Cell>
                    {/if}

                    {#if cell.id === 'actions'}
                      <Table.Cell {...attrs}>
                        <Render of={cell.render()} />
                      </Table.Cell>
                    {/if}
                  </Subscribe>
                {/each}
              </Table.Row>
            </Subscribe>
          {/each}
        {:else}
          <Table.Row>
            <Table.Cell colspan={columns.length + 1} class="h-24 text-center">
              No results.
            </Table.Cell>
          </Table.Row>
        {/if}
      </Table.Body>
    </Table.Root>
  </div>

  <!-- Bottom pagination -->
  <DataTablePagination {tableModel} />
</div>