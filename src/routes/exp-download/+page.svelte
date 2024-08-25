<!-- <script lang="ts">
	import DataTable from "./(components)/data-table.svelte";
	import UserNav from "./(components)/user-nav.svelte";
	import data from "./(data)/exp_download_data.json";
	import { urls } from "$lib/Common/Rendering_Data/urls.js";
    import { _fetch_data } from "$lib/API/GET";
	let expData;
	_fetch_data(urls.expDownloadUrl).then(data => expData = data);
	_fetch_data(urls.expDownloadUrl).then(data => console.log(data));
</script>

<div class="md:hidden">
</div>
<div class="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
	<div class="flex items-center justify-between space-y-2">
		<div>
			<h2 class="text-2xl font-bold tracking-tight">Welcome back!</h2>
			<p class="text-muted-foreground">Here's a list of your tasks for this month!</p>
		</div>
		<div class="flex items-center space-x-2">
			<UserNav />
		</div>
	</div>
	<DataTable {data} />
</div> -->












<!-- <script lang="ts">
	import DataTable from "./(components)/data-table.svelte";
	import UserNav from "./(components)/user-nav.svelte";
	import { urls } from "$lib/Common/Rendering_Data/urls.js";
    import { _fetch_data } from "$lib/API/GET";

	// Initialize expData as an empty array
	let expData = [];

	// Fetch data asynchronously
	_fetch_data(urls.expDownloadUrl).then(data => {
		expData = data || [];  // Fallback to an empty array if data is undefined
		console.log(data); // For debugging
	});
</script>

<div class="md:hidden">
</div>
<div class="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
	<div class="flex items-center justify-between space-y-2">
		<div>
			<h2 class="text-2xl font-bold tracking-tight">Welcome back!</h2>
			<p class="text-muted-foreground">Here's a list of your tasks for this month!</p>
		</div>
		<div class="flex items-center space-x-2">
			<UserNav />
		</div>
	</div>
	{#if expData.length === 0}
		<p>Loading data...</p>
	{:else}
		<DataTable {expData} />
	{/if}
</div> -->












<!-- <script lang="ts">
	import DataTable from "./(components)/data-table.svelte";
	import UserNav from "./(components)/user-nav.svelte";
	import { urls } from "$lib/Common/Rendering_Data/urls.js";
    import { _fetch_data } from "$lib/API/GET";

	let expData = [];

	// Fetch data asynchronously and structure it
	_fetch_data(urls.expDownloadUrl).then(data => {
		expData = data.map(item => ({
			ad_code: item.ad_code || "",
			exp_serial: item.exp_serial || "",
			exp_year: item.exp_year || "",
			invoice_no: item.invoice_no || "",
			status: item.status || ""
		}));
		console.log(expData); // For debugging
	});
</script>

<div class="md:hidden">
</div>
<div class="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
	<div class="flex items-center justify-between space-y-2">
		<div>
			<h2 class="text-2xl font-bold tracking-tight">Welcome back!</h2>
			<p class="text-muted-foreground">Here's a list of your tasks for this month!</p>
		</div>
		<div class="flex items-center space-x-2">
			<UserNav />
		</div>
	</div>
	{#if expData.length === 0}
		<p>Loading data...</p>
	{:else}
		<DataTable {expData} />
	{/if}
</div> -->






<!-- <script lang="ts">
	import DataTable from "./(components)/data-table.svelte";
	import UserNav from "./(components)/user-nav.svelte";
	import { urls } from "$lib/Common/Rendering_Data/urls.js";
    import { _fetch_data } from "$lib/API/GET";
	import { taskSchema, type Task } from "./(data)/schemas"; // Adjust path as necessary
	import { z } from "zod";

	let data: Task[] = [];

	// Fetch data asynchronously, validate and structure it
	_fetch_data(urls.expDownloadUrl).then(data => {
		try {
			// Validate the data against the schema
			const parsedData = z.array(taskSchema).parse(data);
			data = parsedData;
		} catch (error) {
			console.error("Data validation failed:", error);
			data = []; // Fallback to an empty array on validation error
		}
		console.log(data); // For debugging
	});
</script>

<div class="md:hidden">
</div>
<div class="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
	<div class="flex items-center justify-between space-y-2">
		<div>
			<h2 class="text-2xl font-bold tracking-tight">Welcome back!</h2>
			<p class="text-muted-foreground">Here's a list of your tasks for this month!</p>
		</div>
		<div class="flex items-center space-x-2">
			<UserNav />
		</div>
	</div>
	{#if data.length === 0}
		<p>Loading data...</p>
	{:else}
		<DataTable {data} />
	{/if}
</div> -->







<script lang="ts">
    import DataTable from "./(components)/data-table.svelte";
    import UserNav from "./(components)/user-nav.svelte";
    import { urls } from "$lib/Common/Rendering_Data/urls.js";
    import { _fetch_data } from "$lib/API/GET";
    import { taskSchema, type Task } from "./(data)/schemas";
    import { z } from "zod";

    let data: Task[] = [];
    let isLoading = true; // Track loading state

    // Fetch data asynchronously, validate and structure it
    _fetch_data(urls.expDownloadUrl).then(response => {
        console.log("Raw response data:", response); // Log the raw response

        try {
            // Validate the data against the schema
            const parsedData = z.array(taskSchema).parse(response);
            data = parsedData;
        } catch (error) {
            console.error("Data validation failed:", error);
            data = []; // Fallback to an empty array on validation error
        } finally {
            isLoading = false; // Data fetching is complete
        }
    });
</script>

<div class="md:hidden">
</div>
<div class="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
    <div class="flex items-center justify-between space-y-2">
        <div>
            <h2 class="text-2xl font-bold tracking-tight">Welcome back!</h2>
            <p class="text-muted-foreground">Here's a list of your tasks for this month!</p>
        </div>
        <div class="flex items-center space-x-2">
            <UserNav />
        </div>
    </div>
    {#if isLoading}
        <p>Loading data...</p>
    {:else if data.length === 0}
        <p>No data available</p>
    {:else}
        <DataTable {data} />
    {/if}
</div>

