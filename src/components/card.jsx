import PropTypes from 'prop-types'
import { badgeVariants } from '@/components/ui/badge'
import { useNavigate } from 'react-router-dom'
import '../App.css'
function Card({
  bookName,
  originalPrice,
  author,
  discountedPrice,
  imgSrc,
  imgAlt,
  badgeText,
  discountPercent,
  _id,
  genre,
  isLiked,
  handleLikeBtnClick,
}) {
  const navigate = useNavigate()

  const handleClick = (e) => {
    e.stopPropagation()
    handleLikeBtnClick(_id)
  }
  // console.log(handleClick(_id));
  return (
    <div
      className= 'bg-white card__shadow w-[250px] h-[390px] ease-in-out duration-300  border rounded  cursor-pointer p-1 text-center relative'
      onClick={() => navigate('/product/' + _id)}
    >
      <span
        className={`${badgeVariants({
          variant: 'destructive',
        })} absolute top-0 left-0 rounded-none`}
      >
        {badgeText}
      </span>
      <span
        onClick={handleClick}
        className={` flex mt-4 mr-5 absolute top-0 right-0 bg-none rounded-none`}
      >
        
        <i className={ ` text-[25px] fa-sharp fa-regular fa-heart ${!isLiked ? "text-red-700 " : 'text-black'}`} ></i>
      </span>
      <img
        src={imgSrc}
        alt={imgAlt}
        className='w-[150px] mb-3 mx-auto mt-2 h-[200px] object-contain'
      />
      <h3 className='text-[18px ] w-[180px] mx-auto font-bold mb-3'> {bookName}</h3>
      <span className='my-4 inline-block text-[14px] italic font-semibold '>-By {author}</span>
      <div className='flex justify-between items-center'>
        <p className='ml-4 font-black'>R.s {discountedPrice}</p>
        <del className='ml-[-20px]'>R.s {originalPrice}</del>
        <span className='text-red-500 text-[10px] mr-[20px] '>({discountPercent}% off )</span>
      </div>
      <span >{genre}</span>
    </div>
  )
}
export default Card

Card.propTypes = {
  bookName: PropTypes.string,
  originalPrice: PropTypes.number,
  author: PropTypes.string,
  discountedPrice: PropTypes.number,
  imgSrc: PropTypes.string,
  imgAlt: PropTypes.string,
  badgeText: PropTypes.string,
  discountPercent: PropTypes.number,
  _id: PropTypes.string,
  genre: PropTypes.string,
  isLiked: PropTypes.any,
  handleLikeBtnClick: PropTypes.func,
}
