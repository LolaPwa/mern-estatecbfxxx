import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';


export default function Home() {
    const [offerListings, setOfferListings] = useState([]);
    const [saleListings, setSaleListings] = useState([]);
    const [rentListings, setRentListings] = useState([]);
   
    console.log(saleListings)
   // console.log(offerListings)
        useEffect(() => {
        const fetchOfferListings = async () => {
            try {
              const res = await fetch('/api/listing/get?offer=true&limit=4');
              const data = await res.json();
              setOfferListings(data);
              fetchRentListings();
            } catch (error) {
              console.log(error);
            }
          }
            const fetchRentListings = async () => {
            try {
              const res = await fetch('/api/listing/get?type=rent&limit=4');
              const data = await res.json();
              setRentListings(data);
              fetchSaleListings();
            } catch (error) {
              console.log(error);
            }
        }
        const fetchSaleListings = async () => {
            try {
              const res = await fetch('/api/listing/get?type=sale&limit=4');
              const data = await res.json();
              setSaleListings(data);
            } catch (error) {
              console.log(error);
            }
        }
            fetchOfferListings();
        }, []);
   
    return (
        <div>

            {/* top */} 

    <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto'>
        <h1 className='text-slate-700 font-bold text-3xl lg:text-6xl'>
          Find your next <span className='text-slate-500'>perfect</span>
          <br />
          place with ease
        </h1>
        <div className='text-gray-400 text-xs sm:text-sm'>
          Lola Estates is the right and perfect place to acquire your place to live.
          <br />
          We have a wide range of properties for you to select from.  
      </div>
      <Link
      to={'/search'}
      className='text-xs sm:text-sm text-blue-800 font-bold hover:underline'
      >
        Lets begin your journey...
      </Link>
</div>
</div>
    )
}
 {/* swiper */} 


 

{/* listing results for offer, sale */}  





 