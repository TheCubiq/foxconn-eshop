<script lang="ts">
	import { supabase } from '$lib/supabase';
	import { user } from '$lib/user';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { get } from 'svelte/store';

	// Define a type for user profile information
	interface UserProfile {
		id: string;
		email: string;
	}

	let profile: UserProfile | null = null;
	let message: string = '';
	let authUser = get(user);

	// Ensure only authenticated users can access the profile page
	if (!authUser) {
		goto('/login');
	}

	onMount(() => {
		// Listen for changes to the user store
		const unsubscribe = user.subscribe((value) => {
			authUser = value;
			if (!authUser) {
				goto('/login');
			} else if (!profile && authUser) {
				profile = {
					id: authUser.id,
					email: authUser.email ?? ''
				};
			}
		});

		return () => unsubscribe();
	});

	async function updateProfile(event: Event) {
		event.preventDefault();
		if (!profile) return;

		// Only allow email updates for simplicity
		const { data, error } = await supabase.auth.updateUser({ email: profile.email });

		if (error) {
			message = `Error: ${error.message}`;
		} else {
			message = 'Profile updated successfully!';
			if (data?.user) user.set(data.user); // Update the user store if user data is returned
		}
	}

	async function logout() {
		const { error } = await supabase.auth.signOut();

		if (error) {
			message = `Error: ${error.message}`;
		} else {
			user.set(null); // Clear the user store
			goto('/login'); // Redirect to login page
		}
	}
</script>

<main>
	<section>
		<h1>User Profile</h1>

		{#if authUser && profile}

			<a href="/orders">My orders</a>

			<form on:submit={updateProfile}>
				<div>
					<label for="email">Email:</label>
					<input type="email" id="email" bind:value={profile.email} required />
				</div>

				<button type="submit">Update Profile</button>
			</form>

			<button on:click={logout} style="margin-top: 1em;">Log Out</button>

			{#if message}
				<p>{message}</p>
			{/if}
		{:else}
			<p>Loading...</p>
		{/if}
	</section>
</main>

<style>

  main {
    padding: 2rem;
  }

	section {
		max-width: 300px;
		margin: 0 auto;

		display: flex;
		flex-direction: column;
		gap: 1em;

	}

	form div {
		margin-bottom: 1em;
	}

	label {
		display: block;
	}

	input,
	button {
		width: 100%;
	}

	a, button {
		background-color: #333;
		padding: 0.5em 1em;
		border-radius: var(--border-rad);
		border: none;
		color: inherit;
	}

</style>
