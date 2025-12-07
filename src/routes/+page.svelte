<script lang="ts">
	import Content from '$lib/components/Content.svelte';
	import type { PageProps } from './$types';
	let { data }: PageProps = $props();
</script>

<main class="py-20">
	{#await data.tldr}
		<span>Loading...</span>
	{:then tldr}
		<Content content={tldr.response.choices?.[0].message?.content ?? ''} />
	{/await}
</main>
