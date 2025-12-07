<script lang="ts">
</script>

<button
	class="mt-4 inline-block rounded border transition-colors border-black px-4 py-1 hover:text-white text-sm hover:bg-black"
	on:click={() => {
		navigator.share
			? navigator.share({
					title: 'TL;DR - Daily AI Summaries',
					text: 'Check out TL;DR for daily AI-generated news summaries!',
					url: window.location.href
				})
			: alert('Sharing is not supported in this browser.');
	}}
>
	Share
</button>
