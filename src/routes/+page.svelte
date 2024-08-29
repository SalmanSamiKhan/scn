<script>
    import ServiceCard from '$lib/Common/ServiceCards.svelte';
    import { cardDetails } from '$lib/Common/Rendering_Data/service_homepage_data';
    let cards = Object.values(cardDetails);
</script>

<h1 class="text-4xl text-center mt-10 pt-[20px]">Welcome to ALTRBot</h1>
<div class="container mx-auto px-4 mt-10"> <!-- Added margin-top here for spacing -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {#each cards as card}
            <ServiceCard {card} />
        {/each}
    </div>
</div>

<style>
    /* Additional styles for centering and responsiveness */
    .container {
        max-width: 1200px; /* Limits width for large screens */
        margin: 0 auto; /* Centers the container */
        margin-top: 2rem; /* Space between the heading and cards */
    }

    .grid {
        display: grid;
        grid-template-columns: repeat(1, 1fr); /* Default for mobile */
        gap: 1rem;
    }

    @media (min-width: 768px) {
        .grid {
            grid-template-columns: repeat(2, 1fr); /* Adjust for medium screens */
        }
    }

    @media (min-width: 1024px) {
        .grid {
            grid-template-columns: repeat(3, 1fr); /* Adjust for large screens */
        }
    }

    h1 {
        font-weight: bold;
        margin-bottom: 2rem; /* Adds space below the heading */
    }
</style>
