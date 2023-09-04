import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithRedirect,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
  getRedirectResult
} from 'firebase/auth'

const googleAuthProvider = new GoogleAuthProvider()
googleAuthProvider.addScope('email')

type IdentityUpdateCallback = (info: UserInfo | null) => void

export type UserInfo = {
  id: string | null
  name: string | null
  isAnonymous: boolean | null
}

export async function signInWithGoogle() {
  await signInWithRedirect(getAuth(), googleAuthProvider)
}

// * Returns true if the provided url is a valid sign in link
export async function signInWithPassword(email: string, password: string) {
  return await signInWithEmailAndPassword(getAuth(), email, password)
}

export async function signOut() {
  await firebaseSignOut(getAuth())
}

// export async function getUserToken() {
//   const user = getAuth().currentUser
//   if (!user) {
//     throw new Error('Failed to retrieve user token, user is not signed in or firebase is not initialized.')
//   }
//   return await user.getIdToken()
// }

export function onIdentityUpdated(callback: IdentityUpdateCallback) {
  onAuthStateChanged(getAuth(), user => {
    callback(user ? {
      id: user.uid,
      name: user.displayName,
      isAnonymous: user.isAnonymous
    } : null)
  })
}

export async function isRedirectSignIn() {
  const userCredential = await getRedirectResult(getAuth())
  return !!userCredential
}
