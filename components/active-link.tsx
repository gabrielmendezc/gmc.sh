import Link, { LinkProps } from 'next/link'
import { useRouter } from 'next/router'
import { Children, cloneElement, ReactHTMLElement, ReactNode } from 'react'

type ActiveLinkProps = {
  children: ReactNode
  activeClassName: string
}

function ActiveLink({
  activeClassName,
  children,
  ...props
}: ActiveLinkProps & LinkProps) {
  const { pathname } = useRouter()
  const child = Children.only(children) as ReactHTMLElement<HTMLAnchorElement>
  const childClassName = child.props.className || ''

  let href: string
  if (typeof props.href !== 'string') {
    if (!props.href.pathname) {
      throw new Error(`Cannot use an ActiveLink without providing a pathname.`)
    }
    href = props.href.pathname
  } else {
    href = props.href
  }

  const className =
    pathname === href
      ? `${childClassName} ${activeClassName}`.trim()
      : childClassName

  return (
    <Link {...props}>
      {cloneElement(child, {
        className: className || undefined,
      })}
    </Link>
  )
}

export default ActiveLink
