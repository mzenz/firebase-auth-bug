<style scoped>
button, input {
  display: block;
  margin-bottom: 1rem;
}
</style>

<template>
  <h1>Sign in</h1>
  <input ref="email" placeholder="email" :disabled="emailSent" />
  <button @click="onSignInWithEmail()" :disabled="emailSent">{{ `${emailSent ? 'Email sent!' : 'Send sign in link via email'}` }}</button>
  <button @click="onSignInWithGoogle()">Sign in with Google</button>
  <button @click="onSignOut()">Sign out</button>
  <span v-if="signedIn" style="color: limegreen">{{ `Signed in! Name: ${userName}, email: ${userEmail}`}}</span>
  <span v-else style="color: red">{{'Not signed in'}}</span>
</template>

<script setup lang="ts">
import { initializeApp } from 'firebase/app'
import {
  getAuth,
  onAuthStateChanged,
  signInWithRedirect,
  GoogleAuthProvider,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
  signOut,
  getRedirectResult
} from 'firebase/auth'
import { ref, onMounted } from 'vue'

const FIREBASE_API_KEY = 'AIzaSyB402Oi6ywKle5f3zf6Dl_wJS6UJLnAlOw'
const FIREBASE_AUTH_DOMAIN = 'minipcr-dev.firebaseapp.com'
const FIREBASE_PROJECT_ID = 'minipcr-dev'
const FIREBASE_APP_ID = '1:403930344505:web:75d639e9297e4e4c9671e8'
const FIREBASE_MEASUREMENT_ID = 'G-6TCKN65TBC'

const continueUrl = 'http://localhost:3000/'

const email = ref<HTMLInputElement>()
const emailSent = ref(false)
const signedIn = ref(false)
const userName = ref('')
const userEmail = ref('')

const googleAuthProvider = new GoogleAuthProvider()
googleAuthProvider.addScope('email')

onMounted(async () => {
  const url = new URL(window.location.href).href
  const urlParams = new URLSearchParams(window.location.search)
  const email = urlParams.get('email')

  console.debug('application mounted, url:', url)
  initializeApp({
      apiKey: FIREBASE_API_KEY,
      authDomain: FIREBASE_AUTH_DOMAIN,
      projectId: FIREBASE_PROJECT_ID,
      appId: FIREBASE_APP_ID,
      measurementId: FIREBASE_MEASUREMENT_ID,
  })
  console.debug('Firebase initialized.')

  const auth = getAuth()

  onAuthStateChanged(auth, user => {
    console.debug('User identity:', user)
    if (user) {
      signedIn.value = true
      userName.value = user.displayName ? user.displayName : '<no name>'
      userEmail.value = user.email ? user.email : '<no email>'
    }
  })

  if (isSignInWithEmailLink(auth, url) && email) {
    console.debug('Signing in with email link...')
    await signInWithEmailLink(auth, email, url)
    console.debug('Signed in with email link successfully!')
  } else {
    console.debug('Signing in with Google...')
    const credential = await getRedirectResult(auth)
    if (credential) {
      console.debug('Signed in with Google successfully.')
      console.debug(credential.user)
    }
  }
})

const onSignInWithEmail = async () => {
  const address = email.value?.value
  console.debug('onSignInWithEmail()', address)
  if (address) {
    await sendSignInLinkToEmail(getAuth(), address, {
      handleCodeInApp: true,
      url: `${continueUrl}?email=${address}`
    })
    console.debug('Sign in link sent!.')
    emailSent.value = true
  }
}

const onSignInWithGoogle = async () => {
  console.debug('onSignInWithGoogle()')
  await signInWithRedirect(getAuth(), googleAuthProvider)
}

async function onSignOut() {
  await signOut(getAuth())
  signedIn.value = false
}
</script>
