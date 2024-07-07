<script lang="ts">
  import { supabase } from '$lib/supabase';
  import { goto } from '$app/navigation';
  import { user } from '$lib/user';

  let email = '';
  let password = '';
  let message = '';

  async function login(event: Event) {
    event.preventDefault();

    const { data: authUser, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      message = `Error: ${error.message}`;
    } else {
      user.set(authUser.user);  // Update the user store
      message = 'Successfully logged in!';
      goto('/profile');  // Redirect to the admin page
    }
  }
</script>

<main>
  <h1>Login</h1>

  <form on:submit={login}>
    <div>
      <label for="email">Email:</label>
      <input type="email" id="email" bind:value={email} required>
    </div>
    <div>
      <label for="password">Password:</label>
      <input type="password" id="password" bind:value={password} required>
    </div>
    <button type="submit">Login</button>
  </form>

  {#if message}
    <p>{message}</p>
  {/if}
</main>

<style>
  form {
    max-width: 300px;
    margin: 0 auto;
  }

  form div {
    margin-bottom: 1em;
  }

  label {
    display: block;
  }

  input, button {
    width: 100%;
  }
</style>
