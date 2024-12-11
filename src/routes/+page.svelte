<script lang="ts">
	import { enhance } from '$app/forms';
	import { blur, fade, fly, scale, slide } from 'svelte/transition';
	import { Image, Logo, Menu, Send } from '$lib/components/icons';
	import autosize from 'svelte-autosize';
	import Rectangle from '$lib/components/icons/Rectangle.svelte';
	import ReplyBox from '$lib/components/ReplyBox.svelte';
	import type { ActionData, PageData } from './$types';
	import { Reply, type ReplyType } from '$lib/types';
	import { tick } from 'svelte';

	let { form, data }: { form: ActionData; data: PageData } = $props();
	// let replies: ReplyType[] = $state([]);
	let imageGenerationSelected = $state(false);
	let promptInFocus = $state(false);
	let prompt = $state('');
	let loading = $state(false);
	let promptElement: HTMLElement | undefined = $state();
	let loader: HTMLElement | undefined = $state();
	let list: HTMLUListElement | undefined = $state();
	let action = $derived(
		imageGenerationSelected ? '?/generateImageResponse' : '?/generateTextResponse'
	);
	let placeholder = $derived(
		loading && imageGenerationSelected
			? 'Loading...'
			: loading && !imageGenerationSelected
				? 'Generating ...'
				: 'Ask anything'
	);
	let promptForm: HTMLFormElement;

	const createImageClicked = () => (imageGenerationSelected = !imageGenerationSelected);

	const handleKeyDown = (event: KeyboardEvent) => {
		if (event.ctrlKey && event.key === 'Enter' && prompt.length) {
			event.preventDefault();
			promptForm.requestSubmit();
		}
	};
	const handleClick = () => {
		if (promptElement) {
			promptElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}
	};

	$effect.pre(() => {
		if (!list) return; // not yet mounted

		data.replies.length;

		if (list.offsetHeight + list.scrollTop > list.scrollHeight - 20) {
			tick().then(() => {
				if (loader) {
					loader?.scrollIntoView({ behavior: 'smooth', block: 'start' });
				}
			});
		}
	});
	$effect(() => console.log(data.replies));
</script>

<svelte:head>
	<title>AI Prompt</title>
</svelte:head>
<main class="min-h-screen bg-[#232323] text-white">
	<section class="container mx-auto max-w-screen-lg px-5 py-12">
		<div class="mb-5 grid">
			<ul id="list" bind:this={list} class="col-span-full row-span-full">
				{#each data.replies as reply, idx (reply.id)}
					<li class="mb-5" id={reply.id} in:fly={{ duration: 300, y: -200 }}>
						<ReplyBox {reply}
						isLast={idx + 1 == data.replies.length}
						isLoading={loading && imageGenerationSelected}
						/>
						<!-- isLast={false} isLoading={false} -->

					</li>
				{/each}
				<!-- {#if loading && imageGenerationSelected}
					<li bind:this={loader} class="col-span-full row-span-full" in:fade out:blur>
						<ReplyBox
							reply={{ id: '', data: '', type: Reply.IMAGE, timestamp: '', loading: true }}
							isLast={true}
							isLoading={true}
						/>
					</li>
				{/if} -->
			</ul>
		</div>
		<div class="flex flex-col justify-center gap-2 md:flex-row">
			<div
				class="flex h-16 w-16 items-center justify-center place-self-center overflow-hidden rounded-full md:place-self-end"
			>
				<Logo />
			</div>

			<form
				method="POST"
				{action}
				use:enhance={() => {
					prompt = '';
					loading = true;
					return async ({ update, result }) => {
						await update();
						loading = false;
						if (promptElement) {
							await tick();
							promptElement.focus();
						}
					};
				}}
				bind:this={promptForm}
				class:bg-opacity-10={promptInFocus}
				class="relative flex min-h-[106px] flex-grow flex-col gap-7 rounded-[30px] border border-white border-opacity-10 bg-white bg-opacity-5 px-2 py-6 outline-none focus:ring-0"
			>
				<div>
					<textarea
						id="prompt"
						name="prompt"
						rows="1"
						use:autosize
						bind:value={prompt}
						bind:this={promptElement}
						onkeydown={handleKeyDown}
						{placeholder}
						class="w-full resize-none border-none bg-transparent px-3 pb-8 pt-0 text-[#F2F1F4] placeholder-white placeholder-opacity-60 outline-none ring-0 focus:outline-none focus:ring-0"
					></textarea>
				</div>
				<div class="absolute bottom-2 left-2 right-2">
					<div class="flex items-center justify-between">
						<div class="flex gap-0.5">
							<button
								type="button"
								onclick={() => (imageGenerationSelected = false)}
								class="align-center flex items-center rounded-full bg-white bg-opacity-0 p-2.5 hover:bg-opacity-5 focus:bg-opacity-5 focus:outline-none"
							>
								<div class="opacity-60">
									<Menu />
								</div>
							</button>
							<button
								type="button"
								onclick={createImageClicked}
								class="align-center relative flex items-center gap-1 rounded-full bg-white bg-opacity-0 p-2.5 hover:bg-opacity-5 focus:bg-opacity-5 focus:outline-none"
							>
								<div class:mode-selected={imageGenerationSelected} class="opacity-60">
									<Image />
								</div>

								{#if imageGenerationSelected}<div transition:slide={{ axis: 'x' }} class="">
										<div class="flex w-full text-nowrap text-sm leading-4">Create image</div>
									</div>
								{/if}</button
							>
						</div>
						{#if prompt.length || loading}
							<button
								type={loading ? 'button' : 'submit'}
								onclick={handleClick}
								transition:fade
								class="flex h-10 w-10 items-center justify-center rounded-full bg-[#F2EDFD] hover:animate-pulse hover:opacity-80 focus:animate-pulse focus:outline-none focus:ring-0"
								aria-label={loading ? 'Stop' : 'Send'}
							>
								<div>
									{#if loading}
										<Rectangle />
									{:else}
										<Send />
									{/if}
								</div>
							</button>
						{/if}
					</div>
				</div>
			</form>
		</div>
	</section>
</main>

<style>
	.mode-selected {
		@apply pr-1 opacity-100;
	}
</style>
