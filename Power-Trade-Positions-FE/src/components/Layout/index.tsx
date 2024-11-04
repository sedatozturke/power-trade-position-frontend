import React from 'react'
import { NavLink } from 'react-router-dom'

interface ILayoutProps {
  children: React.ReactNode
  loading?: boolean
  activePage?: string
}

const Layout = ({ children, loading, activePage }: ILayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gray-800 text-white shadow-lg">
        <div className="container mx-auto flex justify-between items-center p-4">
          <h1 className="text-xl font-bold">Axpo's Power Trade Positions</h1>
          <nav className="space-x-4">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-sky-400"
                  : "hover:text-sky-400"
              }>
              Home
            </NavLink>
            <NavLink
              to="/reports"
              className={({ isActive }) =>
                isActive || activePage === "reports"
                  ? "text-sky-400"
                  : "hover:text-sky-400"
              }>
              Reports
            </NavLink>
          </nav>
        </div>
      </header>

      {
        loading ?
          (
            <div className="flex-grow flex items-center justify-center">
              <div className="w-16 h-16 border-4 border-gray-600 border-t-transparent border-solid rounded-full animate-spin"></div>
            </div>
          )
          :
          (
            <main className="flex-grow container mx-auto p-4 py-8">
              {children}
            </main>
          )
      }

      <footer className="bg-gray-800 text-white text-center py-2">
        <p>Developed for Axpo's Challenge</p>
      </footer>
    </div>
  )
}

export default Layout