import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function SingleProduct({ products }) {
  const [singleProduct, setSingleProduct] = useState(null);
  const { productID } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const data = products.find((item) => item._id === productID);
      setSingleProduct(data);
    };

    fetchData();
  }, [productID, products]);
  console.log(singleProduct);

  return (
    <div className="flex  mt-[130px] gap-10 items-center w-[1000px] mx-auto">
      {singleProduct ? (
        <div className="w-[400px]">
          <img   src={singleProduct.imgSrc} alt={singleProduct.imgAlt} className="w-4/5" />
        </div>
      ) : null}
      <div className="w-3/4">
        {singleProduct ? (
          <>
            <h1 className="text-2xl text-black mb-3 font-bold">
              {singleProduct.bookName}
            </h1>
            <hr />
            <h2  > <span className="font-bold">Author :</span> {singleProduct.author}</h2>
            <p className="text-gray-400 mt-4"><span className="font-bold mr-2 text-black" >Description:</span>{singleProduct.description}</p>

            <p className=" mt-4"><span className="font-bold  mr-4">Rating:</span>{singleProduct.rating}</p>
            
            <div className="mt-3 font-bold  flex gap-4  " >
              <div>
                <span className="font-bold">Rs.</span> ${singleProduct.discountedPrice } 
              <span className="ml-4">Rs.</span>
              <del>${singleProduct.originalPrice}</del>
              </div>
              <p className="text-red-800">({singleProduct.discountPercent}% off)</p>
              </div>
              <div className="flex ">
              <button className="p-2  flex-1 rounded mr-3 text-neutral-50 mt-10 w-1/2  bg-pink-700">Add  to wishlist  </button>
              <button className="flex-1 p-2  rounded  text-neutral-50 mt-10 bg-orange-400 w-1/2"> Add to Cart </button>
              </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default SingleProduct;
