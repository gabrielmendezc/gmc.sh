import { PropsWithChildren } from 'react'

type ErrorAlertProps = PropsWithChildren<{
  isOpen: boolean
  onClose: () => void
}>

function ErrorAlert({ isOpen, onClose, children }: ErrorAlertProps) {
  if (!isOpen) {
    return null
  }

  return (
    <div className="rounded-md max-w-md bg-red-50 p-4 fixed bottom-5 right-5 z-10">
      <div className="flex">
        <button className="flex-shrink-0 self-start" onClick={onClose}>
          <svg
            className="h-5 w-5 text-red-400 hover:text-red-500 transition-colors"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <div className="ml-3">{children}</div>
      </div>
    </div>
  )
}

export default ErrorAlert
