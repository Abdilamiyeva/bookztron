import PropTypes from 'prop-types'
import { Toaster } from '@/components/ui/toaster'
function Layout({ children }) {
  return (
    <div className=''>
      {children}
      <Toaster />
    </div>
  )
}
export default Layout

Layout.propTypes = {
  children: PropTypes.any,
}
