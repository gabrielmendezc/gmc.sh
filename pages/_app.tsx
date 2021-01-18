import GlobalStyles from 'components/global-styles'
import Toast from 'components/toast'
import ToastContainer from 'components/toast-container'
import { AppProps } from 'next/app'
import { Fragment } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { Hydrate } from 'react-query/hydration'
import { ToastProvider } from 'react-toast-notifications'
import 'tailwindcss/tailwind.css'

const queryClient = new QueryClient()

function App({ Component, pageProps }: AppProps) {
  return (
    <Fragment>
      <GlobalStyles />
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <ToastProvider components={{ Toast, ToastContainer }}>
            <Component {...pageProps} />
          </ToastProvider>
        </Hydrate>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </Fragment>
  )
}

export default App
