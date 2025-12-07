<script lang="ts">
	import { marked } from 'marked';
	import type { ContentChunk } from '@mistralai/mistralai/models/components';
	let { content }: { content: string | ContentChunk[] } = $props();

	const today = new Date().toLocaleDateString('en-US', {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});
</script>

<div class="max-w-2xl mx-auto font-serif">
	<h1 class="mb-4 font-bold text-2xl">TL;DR</h1>
	<p class="mb-4 block">{today}</p>

	<div class="prose prose-base">
		{@html marked(typeof content === 'string' ? content : JSON.stringify(content))}
	</div>
</div>
