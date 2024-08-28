<script>
    import Sun from 'lucide-svelte/icons/sun';
    import Moon from 'lucide-svelte/icons/moon';
    import { toggleMode } from 'mode-watcher';

    let isDropdownOpen = false;
  
    function toggleDropdown() {
      isDropdownOpen = !isDropdownOpen;
    }
</script>
  
<nav class="bg-white border-gray-200 dark:border-gray-600 dark:bg-gray-900">
    <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
        <div class="flex items-center space-x-3 rtl:space-x-reverse">
            <a href="/" class="h-12 text-2xl font-bold whitespace-nowrap dark:text-white">ALTRBOT</a>
        </div>
        <button 
            on:click={toggleDropdown} 
            type="button" 
            class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" 
            aria-controls="mega-menu-full" 
            aria-expanded={isDropdownOpen ? "true" : "false"}>
            <span class="sr-only">Open main menu</span>
            <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
            </svg>
        </button>
        <div id="mega-menu-full" class="items-center justify-between font-medium {isDropdownOpen ? '' : 'hidden'} w-full md:flex md:w-auto md:order-1">
            <ul class="flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <li>
                    <!-- Placeholder for Home link or other links -->
                </li>
                <li>
                    <button on:click={toggleDropdown} class="flex items-center justify-between w-full py-2 px-3 text-lg text-gray-900 rounded md:w-auto hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700">
                        Services
                        <svg class="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
                        </svg>
                    </button>
                </li>
                <li>
                    <a href="/shadchina" class="block py-2 px-3 text-lg text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700">Log In</a>
                </li>
                <li>
                    <button on:click={toggleMode} type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                        <Sun class="h-[1.7rem] w-[1.7rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                        <Moon class="absolute h-[1.7rem] w-[1.7rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />

                        <span class="sr-only">Toggle theme</span>
                    </button>
                </li>
            </ul>
        </div>
    </div>
    <div id="mega-menu-full-dropdown" class="{isDropdownOpen ? '' : 'hidden'} mt-1 border-gray-200 shadow-sm bg-gray-50 md:bg-white border-y dark:bg-gray-800 dark:border-gray-600">
        <div class="grid max-w-screen-xl px-4 py-5 mx-auto text-gray-900 dark:text-white sm:grid-cols-2 md:px-6">
            <ul>
                <li>
                    <a href="#" class="block p-3 text-lg rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                        <div class="font-semibold">PO Extractor</div>
                        <span class="text-sm text-gray-500 dark:text-gray-400">Extract key details from purchase orders like PO numbers and quantities with one click.</span>
                    </a>
                </li>
                <li>
                    <a href="#" class="block p-3 text-lg rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                        <div class="font-semibold">Invoice Extractor</div>
                        <span class="text-sm text-gray-500 dark:text-gray-400">Quickly extract key invoice details like dates, amounts, and compositions.</span>
                    </a>
                </li>
                <li>
                    <a href="#" class="block p-3 text-lg rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                        <div class="font-semibold">EXP Issuance</div>
                        <span class="text-sm text-gray-500 dark:text-gray-400"> Automate EXP issuance by processing entries and integrating EXP numbers into your ERP.</span>
                    </a>
                </li>
            </ul>
            <ul>
                <li>
                    <a href="#" class="block p-3 text-lg rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                        <div class="font-semibold">Booking</div>
                        <span class="text-sm text-gray-500 dark:text-gray-400"> Automate shipping processes with booking management and data entry in the Damco Portal.</span>
                    </a>
                </li>
                <li>
                    <a href="#" class="block p-3 text-lg rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                        <div class="font-semibold">FCR</div>
                        <span class="text-sm text-gray-500 dark:text-gray-400">Effortlessly manage Forwarder's Cargo Receipts by creating FCR entries in the Damco Portal.</span>
                    </a>
                </li>
                <li>
                    <a href="/exp-download" class="block p-3 text-lg rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                        <div class="font-semibold">EXP Download</div>
                        <span class="text-sm text-gray-500 dark:text-gray-400">Upload and organize Excel files for easy EXP downloads from Bangladesh Bank Portal.</span>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</nav>
