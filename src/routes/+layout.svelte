<script lang="ts">
    import "../app.css";
    import Navbar from "$lib/Common/Navbar/Navbar.svelte";
    import { ModeWatcher } from "mode-watcher";
</script>

<div class="flex flex-col min-h-screen">
    <!-- Navbar -->
    <Navbar />

    <!-- Main content area -->
    <main class="flex-grow">
        <slot />
    </main>

    <!-- Footer -->
    <footer class="w-full p-4 text-center border-t border-opacity-20 border-gray-400 mt-auto">
        <p class="text-primary-neutral-content dark:text-primary-neutral text-sm">Copyright(c) 2024 - Altersense Limited</p>
    </footer>
</div>

<!-- ModeWatcher -->
<ModeWatcher/>

<slot></slot>
