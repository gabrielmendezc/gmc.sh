import Head from 'next/head'
import { authenticatedServerSideProps } from 'utils/authenticated-server-side-props'
import { useState } from 'react'
import Sidebar from 'components/sidebar'
import Header from 'components/header'
import ContentWrapper from 'components/content-wrapper'
import AccountOverview from 'features/account-overview'

export const getServerSideProps = authenticatedServerSideProps()

function Index() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
  const openMobileSidebar = () => setIsMobileSidebarOpen(true)
  const closeMobileSidebar = () => setIsMobileSidebarOpen(false)

  return (
    <>
      <Head>
        <title>Home / Gmc.sh</title>
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
      <div className="h-screen flex overflow-hidden bg-gray-100">
        <Sidebar
          isMobileSidebarOpen={isMobileSidebarOpen}
          onCloseMobileSidebar={closeMobileSidebar}
        />

        <div className="flex-1 overflow-auto focus:outline-none" tabIndex={0}>
          <Header openMobileSidebar={openMobileSidebar} />

          <ContentWrapper>
            <AccountOverview />
          </ContentWrapper>
        </div>
      </div>
    </>
  )
}

export default Index
