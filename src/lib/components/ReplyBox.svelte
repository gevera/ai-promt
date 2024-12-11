<script lang="ts">
	import { Reply, type ReplyType } from '$lib/types';
	import { fade, blur, fly } from 'svelte/transition';
	import Image from './icons/Image.svelte';

	interface Props {
		reply: ReplyType;
		isLast: boolean;
		isLoading: boolean;
	}

	let { reply, isLast, isLoading }: Props = $props();
</script>

<div transition:fade>
	{#if reply.type === Reply.TEXT}
		<p>
			{@html reply.data}
		</p>
	{:else}
		<div
			class="mx-auto grid aspect-square h-full max-h-[512px] max-w-[512px] rounded-2xl bg-white bg-opacity-5"
		>
			{#if isLast && isLoading}
				<div in:fade out:blur class="relative col-span-full row-span-full grid h-full w-full place-content-center">
					<div
						class="inline-block size-12 animate-spin rounded-full border-2 border-current border-l-transparent border-r-transparent border-t-transparent text-white ring ring-white ring-opacity-10 duration-1000"
					></div>
					<div class="absolute inset-0 flex items-center justify-center">
						<Image />
					</div>
				</div>
			{:else}
				<img
					transition:blur
					src={reply.data}
					alt={reply.id}
					class="col-span-full row-span-full h-full w-full rounded-2xl object-cover aspect-square"
				/>
			{/if}
		</div>
	{/if}
	<br />
	<p class="text-center text-xs underline underline-offset-4 opacity-40">
		{reply.timestamp}
	</p>
</div>
