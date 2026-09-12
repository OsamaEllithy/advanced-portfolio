import { useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

/**
 * Scrolls to a section by id without ever putting a hash in the address bar.
 * From another route it goes home first and hands the target over in router
 * state, which Home picks up once it has mounted.
 */
export function useSectionNav() {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  return useCallback(
    (id) => {
      if (pathname === '/') {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
        return
      }
      navigate('/', { state: { scrollTo: id } })
    },
    [navigate, pathname],
  )
}
