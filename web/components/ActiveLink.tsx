import { useRouter } from "next/router"
import Link from "next/link"
import React, { Children } from "react"

const ActiveLink = ({ href, children, activeClassName, ...props }) => {
  const { asPath } = useRouter()
  const child = Children.only(children)
  const childClassName = child.props.className || ""

  const className =
    asPath === props.href
      ? `${childClassName} ${activeClassName}`.trim()
      : childClassName

  return (
    <Link href={href} {...props}>
      {React.cloneElement(child, {
        className: className || null,
      })}
    </Link>
  )
}

export default ActiveLink
