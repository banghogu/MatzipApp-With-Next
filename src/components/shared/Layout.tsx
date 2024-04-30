import React from 'react'
import Navbar from './Navbar'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="layout__div">
      <Navbar />
      {children}
    </div>
  )
}

export default Layout
