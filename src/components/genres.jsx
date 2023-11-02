import { genres } from '@/constants/genre'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import '../App.css'
function Genres({ setSelectedGenres }) {
  const navigate = useNavigate()
  const handleClick = (item) => {
    setSelectedGenres(item)
    navigate('/shop')
  }
  return (
  
    <div className=' pt-[70px] w-[1300px] mx-auto '>
    <div className="content mt-[30px] ml-[220px] mb-10 flex justify-center items-center">
      <h2>Genres</h2>
      <h2>Genres</h2>
    </div>
    
    <div className='flex justify-around  gap-10 mb-12'>
      
      {genres.map((genre) => (
        
        <div
          onClick={() => handleClick([genre])}
          key={genre.title}
          className='shadow-lg bg-cyan-600 w-[200px] h-[120px]  text-white rounded text-2xl  p-10  flex justify-center items-center text-lg cursor-pointer'
        >

          <h3> {genre.title}</h3>
         
        </div>
      ))}
    </div>
    </div>
  )
}
export default Genres

Genres.propTypes = {
  selectedGenres: PropTypes.array,
  setSelectedGenres: PropTypes.func,
}
