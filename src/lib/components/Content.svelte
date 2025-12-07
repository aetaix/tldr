<script lang="ts">
	import { marked } from 'marked';

	interface Source {
		title: string;
		url: string;
	}

	interface Props {
		content: string;
		sources: Source[];
	}

	const { content, sources }: Props = $props();

	const renderedContent = $derived(marked(content));
	const hasSources = $derived(sources.length > 0);
</script>

<section class="prose prose-base pb-10 border-b border-neutral-100">
	{@html renderedContent}
</section>

{#if hasSources}
	<aside class="mt-8">
		<h2 class="mb-2 text-lg font-semibold">Sources</h2>
		<ul class="list-inside list-disc">
			{#each sources as { title, url }, index (index)}
				<li>
					<a href={url} target="_blank" rel="noopener noreferrer" class="underline">
						{title}
					</a>
				</li>
			{/each}
		</ul>
	</aside>
{/if}
