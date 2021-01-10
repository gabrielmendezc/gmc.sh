import {
  MostRecentUsersQuery,
  useMostRecentUsersQuery,
} from 'generated/graphql'
import Head from 'next/head'
import { formatDistanceToNow, parseISO } from 'date-fns'
import {
  authenticatedServerSideProps,
  InferAuthenticatedServerSideProps,
} from 'utils/authenticated-server-side-props'
import { ClientError } from 'graphql-request'

export const getServerSideProps = authenticatedServerSideProps()

function Index({
  user,
}: InferAuthenticatedServerSideProps<typeof getServerSideProps>) {
  const { data, error, status } = useMostRecentUsersQuery<
    MostRecentUsersQuery,
    ClientError
  >({
    limit: 10,
  })

  return (
    <div className="container mx-auto py-8 px-4">
      <Head>
        <title>Hello {user.name}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />

        <meta
          name="description"
          content="Organize your life with just a few clicks using our powerful and modern tools."
        />

        <meta name="image" content="https://app.gmc.sh/generic_hero.png" />
        <meta
          name="keywords"
          content="Organize, tasks, schedules, url shortener, free"
        />

        <meta property="og:url" content="https://app.gmc.sh/" />
        <meta property="og:title" content="Home / Gmc.sh" />
        <meta
          property="og:description"
          content="Organize your life with just a few clicks using our powerful and modern tools."
        />
        <meta
          property="og:image"
          content="https://app.gmc.sh/generic_hero.png"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="gmencz" />
        <meta name="twitter:title" content="Home / Gmc.sh" />
        <meta
          name="twitter:description"
          content="Organize your life with just a few clicks using our powerful and modern tools."
        />
        <meta
          name="twitter:image"
          content="https://app.gmc.sh/generic_hero.png"
        />
      </Head>
      <p className="mb-1 font-bold">
        Hi{' '}
        <span role="img" aria-label="man raising hand emoji">
          🙋‍♂️
        </span>
      </p>
      <p className="mb-2 font-bold">This is your profile:</p>
      <pre className="overflow-x-auto">
        {JSON.stringify(
          {
            nickname: user.nickname,
            name: user.name,
            picture: user.picture,
          },
          null,
          2,
        )}
      </pre>
      <div className="mt-4">
        <p className="mb-2 font-bold">
          And here are the most recent users of the app:
        </p>
        {status === 'loading' && <span>loading...</span>}
        {status === 'error' && (
          <strong>
            Error:{' '}
            {error?.response.errors
              ? error.response.errors[0].message
              : error?.message}
          </strong>
        )}
        {status === 'success' && (
          <div className="space-y-4">
            {data?.users.map(({ id, name, last_seen }) => (
              <pre key={id} className="overflow-x-auto">
                {JSON.stringify(
                  {
                    name,
                    last_seen: formatDistanceToNow(parseISO(last_seen), {
                      addSuffix: true,
                    }),
                  },
                  null,
                  2,
                )}
              </pre>
            ))}
          </div>
        )}
      </div>
      <a
        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-4"
        href="/api/logout"
      >
        Logout
      </a>
    </div>
  )
}

export default Index
