import { initAuth0 } from '@auth0/nextjs-auth0'

const isProd = String(process.env.NODE_ENV) === 'production'

export const getProdPath = () => {
  if (!process.env.VERCEL_GITHUB_COMMIT_REF) {
    return `https://app.gmc.sh`
  }

  const currentBranch = process.env.VERCEL_GITHUB_COMMIT_REF.toLowerCase()
    .replace('/', '-')
    .replace('_', '-')

  if (currentBranch === 'main') {
    return `https://app.gmc.sh` // we have a production URL env in the project we are working on
  }

  return `https://gmc-sh${currentBranch}.vercel.app`
}

export default initAuth0({
  domain: process.env.AUTH0_DOMAIN as string,
  clientId: process.env.AUTH0_CLIENT_ID as string,
  clientSecret: process.env.AUTH0_CLIENT_SECRET as string,
  scope: 'openid profile',
  redirectUri: isProd
    ? `${getProdPath()}/api/callback`
    : 'http://localhost:3000/api/callback',
  postLogoutRedirectUri: isProd
    ? `${getProdPath()}/auth`
    : 'http://localhost:3000/auth',
  session: {
    // The secret used to encrypt the cookie.
    cookieSecret: process.env.AUTH0_COOKIE_SECRET as string,
    // The cookie lifetime (expiration) in seconds. Set to 8 hours by default.
    cookieLifetime: 60 * 60 * 8,
    // (Optional) The cookie domain this should run on. Leave it blank to restrict it to your domain.
    cookieDomain: '',
    // (Optional) SameSite configuration for the session cookie. Defaults to 'lax', but can be changed to 'strict' or 'none'. Set it to false if you want to disable the SameSite setting.
    cookieSameSite: 'lax',
    // (Optional) Store the id_token in the session. Defaults to false.
    storeIdToken: false,
    // (Optional) Store the access_token in the session. Defaults to false.
    storeAccessToken: false,
    // (Optional) Store the refresh_token in the session. Defaults to false.
    storeRefreshToken: false,
  },
  oidcClient: {
    // (Optional) Configure the timeout in milliseconds for HTTP requests to Auth0.
    httpTimeout: 2500,
    // (Optional) Configure the clock tolerance in milliseconds, if the time on your server is running behind.
    clockTolerance: 10000,
  },
})
