<script lang="ts">
	import DataTable from '$lib/Common/Table/data-table.svelte';
	import UserNav from "$lib/Common/Table/user-nav.svelte";
	import data from "$lib/Common/data/tasks.json";
	import { _fetch_data } from "$lib/API/GET";
	_fetch_data(urls.expDownloadUrl).then(data => console.log(data));
	import { urls } from "$lib/Common/Rendering_Data/urls.js";
	import {columns} from "$lib/Common/Rendering_Data/column_headers"
	console.log(urls)
	console.log(columns)
	// import DataTable from "./(components)/data-table.svelte";
	// import UserNav from "./(components)/user-nav.svelte";
	// import data from "./(data)/tasks.json";
	// import TasksLight from "$lib/img/examples/tasks-light.png?enhanced";
	// import TasksDark from "$lib/img/examples/tasks-dark.png?enhanced";
</script>

<div class="md:hidden">
	<!-- <enhanced:img src={TasksLight} alt="Tasks" class="block dark:hidden" />
	<enhanced:img src={TasksDark} alt="Tasks" class="hidden dark:block" /> -->
</div>
<div class="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
	<div class="flex items-center justify-between space-y-2">
		<!-- <div>
			<h2 class="text-2xl font-bold tracking-tight">Welcome back!</h2>
			<p class="text-muted-foreground">Here's a list of your tasks for this month!</p>
		</div> -->
		<div class="flex items-center space-x-2">
			<!-- <UserNav /> -->
		</div>
	</div>
	<DataTable {data} />
</div>
