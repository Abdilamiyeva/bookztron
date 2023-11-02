import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Button } from './ui/button'

function Header({ isLogged, setIsLogged, wishList }) {
  const onLogout = () => {
    localStorage.removeItem('access_token')
    setIsLogged(false)
  }
  return (
    <header className=' fixed  top-0 left-0 mx-auto   w-[100%] z-50 bg-slate-200  flex justify-between py-6 px-[100px]  border-b-2 '>
      <Link className='font-bold text-2xl text-cyan-700  ' to={'/'}>Bookztron</Link>
      <div className=' flex gap-5'>
        {isLogged ? (
          <>
            <Link to={'/shop'} className=' rounded-[100%] w-[40px] h-[40px]  bg-cyan-600   p-2'>
            <i className="text-white fas fa-light fa-shop"></i>
            </Link>
            <Link to={'/wishlist'} className='rounded-[100%] w-[40px] h-[40px] text-center bg-cyan-600 p-2'>
              <i className="text-white fa-regular fa-heart"></i>
              <span className='shadow-2xl border-solid border-2 border-white-500   text-white flex mt-[-34px] text-[10px]  ml-4 bg-red-500 w-[20px] h-[20px] rounded-[100%] flex justify-center items-center align-center p-[3px]'>{wishList?.length}</span>
            </Link>
            <Link to={'/'} className=' rounded-[100%] w-[40px] h-[40px] text-center bg-cyan-600  p-2'>
            <i className= "text-white fas fa-regular fa-cart-shopping"></i>
            </Link>
            <Link to={'/'} className=' rounded-[100%] w-[40px] h-[40px] text-center bg-cyan-600  p-2'>
            <i className="text-white fa-sharp fa-solid fa-lock"></i>
            </Link>
            <Button  className="bg-rose-700" onClick={onLogout}>Logout</Button>
          </>
        ) : (
          <Link to={'/login'} className='p-2 px-4 rounded bg-rose-500 text-white'>
            Login
          </Link>
        )}
      </div>
    </header>
  )
}
export default Header

Header.propTypes = {
  isLogged: PropTypes.any,
  setIsLogged: PropTypes.func,
  wishList:PropTypes.array
}
