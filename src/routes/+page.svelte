<script>
    import { Card, CardHeader, CardContent, CardDescription, CardFooter, CardTitle } from '$lib/components/ui/card';
    import { cardDetails } from '$lib/Common/Rendering_Data/service_homepage_data';
    let cards = Object.values(cardDetails);
</script>

<h1 class="text-3xl font-semibold leading-none tracking-tight text-center mt-7 pt-[10px]">Services</h1>
<div class="container mx-auto px-4 mt-10">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {#each cards as card}
            <Card>
                <CardHeader>
                    <CardTitle>{card.title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <CardDescription>{card.description}</CardDescription>
                </CardContent>
                <CardFooter>
                    <a href={card.url} class="text-blue-500 hover:underline">Enter</a>
                </CardFooter>
            </Card>
        {/each}
    </div>
</div>
