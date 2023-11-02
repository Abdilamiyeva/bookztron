import PropTypes from 'prop-types'
import Genres from '@/components/genres'
import NewArrivals from '@/components/new-arrivals'
import '../App.css'

function Home({ selectedGenres, setSelectedGenres, wishList, setWishList }) {
  return (
    <div className='mt-3 '>
      
      <img src="../../public/books__home__bg__img.jpeg" alt=""  className='w-[100%]'/>
      <div className='bg__img'>
      <Genres
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
      />
      <div className='pb-[60px]'>
        <h2 className='arrival__title font-black text-5xl    text-center shadow '>New Arrivals</h2>
        <NewArrivals setWishList={setWishList} wishList={wishList} />
      </div>
      
      </div>
    </div>
  )
}
export default Home

Home.propTypes = {
  selectedGenres: PropTypes.array,
  setSelectedGenres: PropTypes.func,
  wishList: PropTypes.array,
  setWishList: PropTypes.func,
}
