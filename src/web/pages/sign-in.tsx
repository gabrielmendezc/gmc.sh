import Head from 'next/head'
import Image from 'next/image'
import { Fragment } from 'react'
import Link from 'next/link'
import SignInForm from '../components/sign-in-form'

function SignIn() {
  return (
    <Fragment>
      <Head>
        <title>Gmc.sh • Sign in to your account</title>
      </Head>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="flex flex-col items-center">
            <Link href="/">
              <a>
                <Image
                  className="mx-auto h-12 w-auto"
                  src="/logo.svg"
                  alt="Gmc.sh logo"
                  width="55px"
                  height="50px"
                  priority
                />
              </a>
            </Link>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Sign in to your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or{' '}
              <a
                href="#"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                start your 14-day free trial
              </a>
            </p>
          </div>
          <SignInForm />
        </div>
      </div>
    </Fragment>
  )
}

export default SignIn
