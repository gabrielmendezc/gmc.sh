import { ClientError } from 'graphql-request'
import { NextApiRequest, NextApiResponse } from 'next'
import auth0 from 'utils/auth0'
import { gqlProxyClient } from 'utils/gql-client'

type GqlBody = {
  query?: string
  variables?: Record<string, unknown>
}

export default async function gql(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { query, variables } = req.body as GqlBody

    if (!query) {
      return res.status(400).json({
        message: `Missing query in request body.`,
        code: 'missing-query',
        info: {},
      })
    }

    const session = await auth0.getSession(req)
    if (!session || !session.user) {
      return res.status(401).json({
        message: `You must login to access this resource.`,
        code: 'UNAUTHENTICATED',
      })
    }

    gqlProxyClient.setHeader('Authorization', `Bearer ${session.accessToken}`)
    gqlProxyClient.setHeader('Cookie', req.headers.cookie || '')

    try {
      const data = await gqlProxyClient.request(query, variables)
      return res.status(200).json({
        data,
      })
    } catch (error) {
      console.error(error)
      const errors =
        error instanceof ClientError
          ? error.response.errors || []
          : [
              {
                extensions: {
                  path: '$',
                  code: 'internal-server-error',
                },
                message: 'Internal Server Error',
              },
            ]

      return res.status(200).json({ errors })
    }
  } catch (error) {
    console.error(error)
    res.status(error.status || 400).end(error.message)
  }
}
