import Navbar from './Navbar'
import React, { ReactNode } from "react";

interface Props {
    children?: ReactNode
    // any props that come into the component
}
 
export default function Layout({ children }: Props ) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  )
}