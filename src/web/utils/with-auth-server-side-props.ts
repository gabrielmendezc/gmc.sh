import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { V1ApiTypes } from '@gmcsh/shared'
import { API_ENDPOINT } from './constants'
import { ApiError } from './api-error'

async function getLoggedInUser(
  sessionCookie: string,
): Promise<V1ApiTypes.MeResponse> {
  const response = await fetch(`${API_ENDPOINT}/v1/auth/me`, {
    headers: {
      cookie: sessionCookie,
    },
  })

  const data = await response.json()
  if (response.status >= 400 && response.status < 600) {
    throw new ApiError(response.status, data as V1ApiTypes.ErrorResponse)
  }

  return data as V1ApiTypes.MeResponse
}

type WithAuthServerSidePropsOptions = {
  authenticatedPage?: boolean
}

export type AuthenticatedPageProps = {
  user: V1ApiTypes.MeResponse & { isLoggedIn: boolean }
  isLoggedIn: boolean
}

const withAuthServerSideProps = <T>(
  getServerSidePropsFunc?: (
    ctx: GetServerSidePropsContext,
    user?: V1ApiTypes.MeResponse,
  ) => Promise<T>,
  options: WithAuthServerSidePropsOptions = {},
): GetServerSideProps => async ctx => {
  let loggedInUser: V1ApiTypes.MeResponse | Record<string, string> = {}
  try {
    loggedInUser = await getLoggedInUser(ctx.req.headers.cookie || '')
  } catch {
    loggedInUser = {}
  }

  const isLoggedIn = !!loggedInUser.id
  if (options.authenticatedPage && !isLoggedIn) {
    ctx.res.statusCode = 302
    ctx.res.setHeader('Location', '/sign-in')
  }

  if (getServerSidePropsFunc) {
    return {
      props: {
        user: { ...loggedInUser, isLoggedIn },
        ...((await getServerSidePropsFunc(
          ctx,
          isLoggedIn ? (loggedInUser as V1ApiTypes.MeResponse) : undefined,
        )) || {}),
      },
    }
  }

  return {
    props: {
      user: { ...loggedInUser, isLoggedIn },
    },
  }
}

export { withAuthServerSideProps }
