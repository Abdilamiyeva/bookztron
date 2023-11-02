import PropTypes from 'prop-types'
import Card from '@/components/card'
import { useEffect, useState } from 'react'
import { instance } from '@/utils/use-request'
import { Link } from 'react-router-dom'

function WishList() {
  const [data, setData] = useState([])
  const getData = async () => {
    const data = await instance.get('/user')
    setData(data.data?.user?.wishlist)
    
  }
  const click = async (id) => {
    await instance.delete('/wishlist/' + id)
    getData()
  }
  useEffect(() => {
    getData()
  console.log(data);


  }, [])
 
  return (
    <div className=' flex justify-center items-center  mt-[130px] flex-wrap gap-10'>
      {data?.length ? (
        data.map((wishItem) => (
          <Card key={wishItem._id} {...wishItem} handleLikeBtnClick={click} />
        ))
      ) : (
        <div className='mx-auto text-center'>
          <h3 className='text-2xl  font-bold italic  mb-8 '>0 items in Wishlist</h3>
          <i className="fa-regular fa-heart animate-bounce inline-block py-4 px-8 text-9xl text-red-600 rounded-lg"></i>
          <h2 className='text-4xl font-bold italic mb-[50px]'>Your wishlist is empty 🙃</h2>
          <Link to={'/shop'} className=' text-2xl bg-pink-900 hover:bg-pink-700 py-3 text-neutral-100  rounded  px-5'> Go to shop </Link>
        </div>
      )}
     
    </div>
  )
}
export default WishList

WishList.propTypes = {
  wishList: PropTypes.array,
  setWishList: PropTypes.func,
}
