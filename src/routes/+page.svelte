<script lang="ts">
	import Content from '$lib/components/Content.svelte';
	import type { PageProps } from './$types';

	const { data }: PageProps = $props();

	const DATE_FORMAT_OPTIONS: Intl.DateTimeFormatOptions = {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	};

	const formattedDate = new Date().toLocaleDateString('en-US', DATE_FORMAT_OPTIONS);
</script>

<svelte:head>
	<title>TL;DR - Daily AI Summaries</title>
	<meta name="description" content="Get your daily TL;DR summaries with sources." />
</svelte:head>

<main class="py-20 px-4">
	<article class="mx-auto max-w-2xl">
		<header class="mb-4">
			<h1 class="text-3xl mb-2 font-bold">TL;DR</h1>
			<p class=" text-neutral-600">
				Daily news summarized with <a
					href="https://mistral.ai/fr/news/mistral-3"
					target="_blank"
					class="inline-block underline italic"
					rel="noopener noreferrer"
					>Ministral 3 (14B)
				</a> every morning at 9am
			</p>
			<time class="block text-sm text-neutral-500" datetime={new Date().toISOString().split('T')[0]}
				>Last refresh: {formattedDate}</time
			>
		</header>

		{#await data.summary}
			<p class="animate-pulse">Loading...</p>
		{:then summary}
			<Content content={summary ?? ''} sources={data.sources ?? []} />
		{/await}
	</article>
</main>
