<script lang="ts">
    import { createTable, Render, Subscribe, createRender, } from "svelte-headless-table";
    import { readable } from "svelte/store";
    import * as Table from "$lib/components/ui/table";
    import DataTableActions from "./data-table-actions.svelte";
    import { addPagination,  addSortBy, addTableFilter,addHiddenColumns, addSelectedRows, } from "svelte-headless-table/plugins";
    import ArrowUpDown from "lucide-svelte/icons/arrow-up-down";
    import { Button } from "$lib/components/ui/button";
    import { Input } from "$lib/components/ui/input";
    import ChevronDown from "lucide-svelte/icons/chevron-down";
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
    import DataTableCheckbox from "./data-table-checkbox.svelte";
    
   
    type Payment = {
      id: string;
      amount: number;
      status: "pending" | "processing" | "success" | "failed";
      email: string;
    };
   
    const data: Payment[] = [
      { id: "m5gr84i9", amount: 316, status: "success", email: "ken99@yahoo.com" },
      { id: "2n4q7j6a", amount: 192, status: "processing", email: "lily97@gmail.com" },
      { id: "e5v2t4u7", amount: 129, status: "pending", email: "john33@hotmail.com" },
      { id: "p6r3z9nq", amount: 267, status: "failed", email: "james88@aol.com" },
      { id: "a6x5c3vz", amount: 194, status: "success", email: "jane55@outlook.com" },
      { id: "x8y9d7pm", amount: 275, status: "processing", email: "philip66@yahoo.com" },
      { id: "5u7h3j2c", amount: 143, status: "pending", email: "sarah22@gmail.com" },
      { id: "4v9n3xq9", amount: 241, status: "failed", email: "patrick11@hotmail.com" },
      { id: "d2b1m9xg", amount: 199, status: "success", email: "lisa77@aol.com" },
      { id: "f6h5r8uq", amount: 259, status: "processing", email: "mark44@outlook.com" },
      { id: "8h7g3c5e", amount: 155, status: "pending", email: "james88@yahoo.com" },
    ];

   
    const table = createTable(readable(data), {
    page: addPagination(),
    sort: addSortBy(),
    filter: addTableFilter({
      fn: ({ filterValue, value }) =>
        value.toLowerCase().includes(filterValue.toLowerCase()),
    }),
    hide: addHiddenColumns(),
    select: addSelectedRows(),
  });
   
    const columns = table.createColumns([
    table.column({
      accessor: "id",
      header: (_, { pluginStates }) => {
        const { allPageRowsSelected } = pluginStates.select;
        return createRender(DataTableCheckbox, {
          checked: allPageRowsSelected,
        });
      },
      cell: ({ row }, { pluginStates }) => {
        const { getRowState } = pluginStates.select;
        const { isSelected } = getRowState(row);
 
        return createRender(DataTableCheckbox, {
          checked: isSelected,
        });
      },
    plugins: {
        sort: {
          disable: true,
        },
        filter: {
          exclude: true,
        },
      },
  }),
  table.column({
    accessor: "status",
    header: "Status",
    plugins: {
        sort: {
          disable: true,
        },
        filter: {
          exclude: true,
        },
      },
  }),
  table.column({
    accessor: "email",
    header: "Email",
  }),
  table.column({
    accessor: "amount",
    header: "Amount",
    cell: ({ value }) => {
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(value);
      return formatted;
    },
    plugins: {
        sort: {
          disable: true,
        },
        filter: {
          exclude: true,
        },
      },
  }),
  table.column({
    accessor: ({ id }) => id,
    header: "",
    cell: ({ value }) => {
        return createRender(DataTableActions, { id: value });
      },
    plugins: {
        sort: {
          disable: true,
        },
        filter: {
          exclude: true,
        },
      },
  }),
]);
   
    const { headerRows, pageRows, tableAttrs, tableBodyAttrs, pluginStates, flatColumns, rows, } =
    table.createViewModel(columns);
 
  const { hasNextPage, hasPreviousPage, pageIndex } = pluginStates.page;
  const { filterValue } = pluginStates.filter;
  const { hiddenColumnIds } = pluginStates.hide;
  
  const ids = flatColumns.map((col) => col.id);
  let hideForId = Object.fromEntries(ids.map((id) => [id, true]));
 
  $: $hiddenColumnIds = Object.entries(hideForId)
    .filter(([, hide]) => !hide)
    .map(([id]) => id);
 
  const hidableCols = ["status", "email", "amount"];
</script>
   
<div>
    <div class="flex items-center py-4">
        <Input
          class="max-w-sm"
          placeholder="Filter emails..."
          type="text"
          bind:value={$filterValue}
        />
        <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild let:builder>
              <Button variant="outline" class="ml-auto" builders={[builder]}>
                Columns <ChevronDown class="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              {#each flatColumns as col}
                {#if hidableCols.includes(col.id)}
                  <DropdownMenu.CheckboxItem bind:checked={hideForId[col.id]}>
                    {col.header}
                  </DropdownMenu.CheckboxItem>
                {/if}
              {/each}
            </DropdownMenu.Content>
          </DropdownMenu.Root>
      </div>
   <div class="rounded-md border">
    <Table.Root {...$tableAttrs}>
      <Table.Header>
        {#each $headerRows as headerRow}
          <Subscribe rowAttrs={headerRow.attrs()}>
            <Table.Row>
              {#each headerRow.cells as cell (cell.id)}
                <Subscribe attrs={cell.attrs()} let:attrs props={cell.props()} let:props>
                  <Table.Head {...attrs}>
                    {#if cell.id === "amount"}
                      <div class="text-right">
                        <Render of={cell.render()} />
                      </div>
                      {:else if cell.id === "email"}
                      <Button variant="ghost" on:click={props.sort.toggle}>
                        <Render of={cell.render()} />
                        <ArrowUpDown class={"ml-2 h-4 w-4"} />
                      </Button>
                    {:else}
                      <Render of={cell.render()} />
                    {/if}
                  </Table.Head>
                </Subscribe>
              {/each}
            </Table.Row>
          </Subscribe>
        {/each}
      </Table.Header>
      <Table.Body {...$tableBodyAttrs}>
        {#each $pageRows as row (row.id)}
          <Subscribe rowAttrs={row.attrs()} let:rowAttrs>
            <Table.Row {...rowAttrs}>
              {#each row.cells as cell (cell.id)}
                <Subscribe attrs={cell.attrs()} let:attrs>
                  <Table.Cell {...attrs}>
                    {#if cell.id === "amount"}
                      <div class="text-right font-medium">
                        <Render of={cell.render()} />
                      </div>
                    {:else if cell.id === "status"}
                      <div class="capitalize">
                        <Render of={cell.render()} />
                      </div>
                    {:else}
                      <Render of={cell.render()} />
                    {/if}
                  </Table.Cell>
                </Subscribe>
              {/each}
            </Table.Row>
          </Subscribe>
        {/each}
      </Table.Body>
    </Table.Root>
  </div>
  <div class="flex items-center justify-end space-x-4 py-4">
    <Button
      variant="outline"
      size="sm"
      on:click={() => ($pageIndex = $pageIndex - 1)}
      disabled={!$hasPreviousPage}>Previous</Button
    >
    <Button
      variant="outline"
      size="sm"
      disabled={!$hasNextPage}
      on:click={() => ($pageIndex = $pageIndex + 1)}>Next</Button
    >
  </div>
</div>