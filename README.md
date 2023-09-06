# Firebase SDK auth bug repro

## Steps to reproduce

Start local dev server:

```sh
$ yarn && yarn dev
```

1. Navigate to `http://localhost:3000`
1. Enter a valid email and click on "Send sign in link via email" button.
1. Check your email inbox and click on sign in email. You should get authenticated.
1. Click on "Sign out" button to log off.
1. Click on "Sign in with Google" button and complete redirection flow to authorize app.

## Observed results

- `getRedirectResult()` returns null UserCredential despite Google redirection flow completing successfully.

## Expected results

- `getRedirectResult()` should return a valid UserCredential and `onAuthStateChanged()` should fire accordingly.
