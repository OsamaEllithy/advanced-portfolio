import { Outlet } from 'react-router-dom'
import Nav from './Nav'
import Footer from '../sections/Footer'
import ScrollToTop from './ScrollToTop'
import { useReveal } from '../hooks/useReveal'

/** The nav and the footer are shared by every route; only the middle changes. */
export default function Layout() {
  useReveal()

  return (
    <div className="app">
      <ScrollToTop />
      <Nav />
      <Outlet />
      <Footer />
    </div>
  )
}
