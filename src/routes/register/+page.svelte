<script lang="ts">
  import { supabase } from '$lib/supabase';
  import { goto } from '$app/navigation';

  let email = '';
  let password = '';
  let confirmPassword = '';
  let message = '';

  async function register(event: Event) {
    if (password !== confirmPassword) {
      message = 'Passwords do not match.';
      return;
    }

    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
      message = `Error: ${error.message}`;
    } else {
      message = 'Successfully registered! Please check your email to confirm your account.';
      // Optionally redirect to login or another page
      setTimeout(() => {
        goto('/login');
      }, 3000);
    }
  }
</script>

<main>
  <h1>Register</h1>

  <form on:submit|preventDefault={register}>
    <div>
      <label for="email">Email:</label>
      <input type="email" id="email" bind:value={email} required>
    </div>
    <div>
      <label for="password">Password:</label>
      <input type="password" id="password" bind:value={password} required>
    </div>
    <div>
      <label for="confirm-password">Confirm Password:</label>
      <input type="password" id="confirm-password" bind:value={confirmPassword} required>
    </div>
    <button type="submit">Register</button>
  </form>

  {#if message}
    <p>{message}</p>
  {/if}

  <div class="switch-login">
    <span>Already have an account?</span>
    <a href="/login">Login</a>
  </div>
</main>

<style>
  form {
    max-width: 300px;
    margin: 0 auto;
    margin-bottom: .5em;
  }

  form div {
    margin-bottom: 1em;
  }

  input, button {
    width: 100%;
  }
</style>
