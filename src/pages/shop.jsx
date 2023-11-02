import PropTypes from 'prop-types'
import { Slider } from '@/components/ui/slider'
import { useEffect, useState } from 'react'
import Card from '@/components/card'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { genres } from '@/constants/genre'
import { Button } from '@/components/ui/button'
import '../App.css'
function Shop({
  products,
  selectedGenres,
  setSelectedGenres,
  handleLikeBtnClick,
  wishList,
}) {
  const [sliderValues, setSliderValues] = useState({
    min: 0,
    max: 0,
  })
  const [range, setRange] = useState([sliderValues?.min, sliderValues?.max])
  const [filteredProducts, setFilteredProducts] = useState([])

  const handleRangeChange = (value) => {
    setRange(value)
  }

  useEffect(() => {
    if (!selectedGenres.length) {
      setSelectedGenres([...genres])
    }
  }, [])
  useEffect(() => {
    if (products) {
      setFilteredProducts(products)
    }
  }, [products])

  useEffect(() => {
    if (products.length) {
      setSliderValues(
        products.reduce(
          (acc, curr) =>
            curr.originalPrice > acc.max
              ? { ...acc, max: curr.originalPrice }
              : acc,
          { min: 0, max: 0 }
        )
      )
    }
  }, [products])

  useEffect(() => {
    let newProducts = products.filter(
      (product) =>
        (product.discountedPrice >= range[0] ||
          product.originalPrice >= range[0]) &&
        (product.discountedPrice <= range[1] ||
          product.originalPrice <= range[1])
    )

    newProducts = newProducts.filter(
      (pr) =>
        selectedGenres.findIndex(
          (gr) => gr.title.toUpperCase() == pr.genre.toUpperCase()
        ) !== -1
    )

    setFilteredProducts([...newProducts])
  }, [range, selectedGenres])
  useEffect(() => {
    setRange([sliderValues.min, sliderValues.max])
  }, [sliderValues])

  const handleGenreChange = (title) => {
    const currentGrIdx = selectedGenres.findIndex((gr) => gr.title == title)
    if (currentGrIdx === -1) {
      setSelectedGenres((prev) => [...prev, { title }])
    } else {
      selectedGenres.splice(currentGrIdx, 1)
      setSelectedGenres([...selectedGenres])
    }
  }
  const onClear = () => {
    setSelectedGenres([...genres])
    setRange([0, sliderValues.max])
  }

  return (
    <div className='container mt-[90px] relative flex items-start justify-between gap-[20px]  h-[400vh] '>
      
      <div className=' w-[20%]  pt-[50px]     h-[400vh]   '>
          <Button onClick={onClear} className='mb-5'>
            Clear Filter
          </Button>
          <h2 className='text-center font-extrabold mb-5 mt-10'>Price</h2>
          <div className="flex items-center justify-between gap-3 mb-10">
            <label className="flex gap-2 items-center">
              <span className='text-[14px] font-bold'> Min</span>
              <input
                className="border-2 w-20 text-center"
                type="number"
                min={0}
                value={range[0]}
              />
            </label>
            -
            <label className="flex gap-2 items-center">
            <span className='text-[14px] font-bold'> Max</span>
              <input
                className="border-2 w-20 text-center "
                type="number"
                max={1000}
                value={range[1]}
              />
            </label>
          </div>
          <Slider
            defaultValue={[sliderValues.min, sliderValues.max]}
            max={sliderValues?.max}
            min={0}
            step={0.5}
            value={range}
            onValueChange={handleRangeChange}
            formatLabel={(value) => `${Math.round(value)}  `}
          />
          <div className='mt-8'>
            {genres.map((genre) => (
              <div className='flex items-center space-x-2 mt-2' key={genre.title}>
                <Checkbox
                  id={genre.title}
                  checked={
                    selectedGenres.findIndex((gr) => gr.title == genre.title) !== -1
                  }
                  onCheckedChange={() => handleGenreChange(genre.title)}
                />
                <Label
                  htmlFor={genre.title}
                  className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                >
                  {genre.title}
                </Label>
              </div>
            ))}
          </div>
          {/* <Label htmlFor="r1" className="underline text-xl">
            Sort By
          </Label> */}
          {/* <RadioGroup defaultValue="comfortable" className="mt-2">
            <div className="flex items-center space-x-2" onClick={handleSortHigher}>
              <RadioGroupItem value="default" id="r1" />
              <Label htmlFor="r1">Price - Low to High</Label>
            </div>
            <div className="flex items-center space-x-2" onClick={handleSortLower}>
              <RadioGroupItem value="comfortable" id="r2" />
              <Label htmlFor="r2">Price - High to Low</Label>
            </div>
          </RadioGroup> */}

      </div>
      <div className=' w-[73%] mt-8 mr-[80px]'>
        <h2 className=' text-center mb-6 font-bold text-2xl' >Showing {filteredProducts.length} products</h2>
        <div className='   flex justify-around gap-5 flex-wrap'>
        
        {filteredProducts.length ? ( 
          filteredProducts.map((product) => (
            <Card
              key={product._id}
              {...product}
              handleLikeBtnClick={handleLikeBtnClick}
              isLiked={
                wishList.findIndex(
                  (wishItem) => wishItem._id === product._id
                ) === -1
              }
            />
          ))
        ) : (
          <h1 className='text-center'>Not found</h1>
        )}
      </div>
      </div>
      
    </div>
  )
}
export default Shop

Shop.propTypes = {
  sliderValues: PropTypes.object,
  setSliderValues: PropTypes.func,
  products: PropTypes.array,
  selectedGenres: PropTypes.array,
  setSelectedGenres: PropTypes.func,
  handleLikeBtnClick: PropTypes.func,
  wishList: PropTypes.array,
}
