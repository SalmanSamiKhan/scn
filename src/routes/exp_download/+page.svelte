<script lang="ts">
	import DataTable from "./(components)/data-table.svelte";
	import UserNav from "./(components)/user-nav.svelte";
	import data from "./(data)/exp_download_data.json";
    import { _fetch_data } from "$lib/API/GET";
	_fetch_data(urls.expDownloadUrl).then(data => console.log(data));
	import { urls } from "$lib/Common/Rendering_Data/urls.js";
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
</div>
