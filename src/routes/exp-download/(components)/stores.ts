import { writable } from "svelte/store";

// Stores for shared pagination state
export const stored_pageSize = writable(10); // Default page size
export const stored_pageIndex = writable(0); // Default page index
