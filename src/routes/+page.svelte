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
	<title>TL;DR - Daily Summaries</title>
	<meta name="description" content="Get your daily TL;DR summaries with sources." />
</svelte:head>

<main class="py-20">
	<article class="mx-auto max-w-2xl font-serif">
		<header class="mb-4">
			<h1 class="text-3xl font-bold">TL;DR</h1>
			<time class="block text-neutral-500" datetime={new Date().toISOString().split('T')[0]}
				>{formattedDate}</time
			>
			<a
				href="https://mistral.ai/fr/news/mistral-3"
				target="_blank"
				class="inline-block underline"
				rel="noopener noreferrer"
				>Summary with Ministral 3 - 14b
			</a>
		</header>

		{#await data.summary}
			<p class="animate-pulse">Loading...</p>
		{:then summary}
			<Content content={summary ?? ''} sources={data.sources ?? []} />
		{/await}
	</article>
</main>
