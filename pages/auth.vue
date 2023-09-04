<style scoped>
button, input {
  display: block;
  margin-bottom: 1rem;
}
</style>

<template>
  <h1>Sign in</h1>
  <input placeholder="email" />
  <input placeholder="password" />
  <button @click="onSignInWithEmail()">Sign in with email and password</button>
  <button @click="onSignInWithGoogle()">Sign in with Google</button>
</template>

<script setup lang="ts">
const onSignInWithEmail = async () => {
  console.debug('onSignInWithEmail()')
}

const onSignInWithGoogle = async () => {
  console.debug('onSignInWithGoogle()')
}
</script>
