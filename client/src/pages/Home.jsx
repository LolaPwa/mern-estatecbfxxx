import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {Swiper, SwiperSlide}from 'swiper/react';
import  SwiperCore from 'swiper';
import {Navigation} from 'swiper/modules';
import 'swiper/css/bundle';
import ListingItem from '../components/ListingItem';

export default function Home() {
    const [offerListings, setOfferListings] = useState([]);
    const [saleListings, setSaleListings] = useState([]);
    const [rentListings, setRentListings] = useState([]);
   SwiperCore.use([Navigation]);
   //console.log(offerListings)
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
          };

          const fetchRentListings = async () => {
            try {
              const res = await fetch('/api/listing/get?type=true&limit=4');
              const data = await res.json();
              setRentListings(data);
              fetchSaleListings();
              
            } catch (error) {
              console.log(error);
            }
          };

          const fetchSaleListings = async () => {
            try {
              const res = await fetch('/api/listing/get?type=sale&limit=4');
              const data = await res.json();
              setSaleListings(data);
              
            } catch (error) {
              console.log(error);
            }
          };
          fetchOfferListings();
        }, []);
  return (
    <div>
      {/*top*/}
      <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto'>
        <h1 className='text-slate-700 font-bold text-3xl lg:text-6xl'>
          Securing vacant properties, <span className='text-slate-500'> finding</span>
          <br />
          affordable housing.
        </h1>
        <div className='text-black-400 text-xs sm:text-sm'>
          Are you looking to secure your vacant property whilst at the same time providing 
          affortable accommodation for those most in need,then LolaEstates is the right place to begin.
          
          <br />
          Are you looking for temporary accommodation at a discount then we have a wide range of luxury 
          properties to select from.  
      </div>
      <Link
      to={'/search'}
      className='text-xs sm:text-sm text-green-800 font-bold hover:underline'
      >
        Click here to begin your search
      </Link>
</div>
{/*swiper*/}
<Swiper navigation>
            {offerListings &&
            offerListings.length > 0 &&
            offerListings.map((listing) => (
                <SwiperSlide>
                    <div 
                    style={{background: `url(${listing.imageUrls[0]}) 
                    center no-repeat`, 
                    backgroundSize:'cover',
                      width:'100%'}}
                    className='h-[500px]'
                    key={listing._id}
                    ></div>
                </SwiperSlide>
            ))}
        </Swiper> 
  
    {/*listing results for offer, sale and rent**/}
    <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
      {offerListings && offerListings.length >0 && (
        <div className=''>
          <div className='my-3'>
            <h2 className='text-2xl font-semibold text-slate-600'>Recent offers</h2>
            <Link className='text-sm text-blue-800 hover:underline' to={'/search?offer=true'}>Show more offers</Link>
          </div>
          <div className='flex flex-wrap gap-4'>
            {offerListings.map((listing) => (
              <ListingItem listing={listing} key={listing._id} />
            ))}
          </div>
    </div>
      )}

      {rentListings && rentListings.length >0 && (
        <div className=''>
          <div className='my-3'>
            <h2 className='text-2xl font-semibold text-slate-600'>Recent places for rent</h2>
            <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=rent'}>Show more places to rent</Link>
          </div>
          <div className='flex flex-wrap gap-4'>
            {rentListings.map((listing) => (
              <ListingItem listing={listing} key={listing._id} />
            ))}
          </div>
    </div>
      )}

      {saleListings && saleListings.length >0 && (
        <div className=''>
          <div className='my-3'>
            <h2 className='text-2xl font-semibold text-slate-600'>Recent places for sale</h2>
            <Link className='text-sm text-blue-800 hover:underline' to={'/search?offer=true'}>Show more places for sale</Link>
          </div>
          <div className='flex flex-wrap gap-4'>
            {saleListings.map((listing) => (
              <ListingItem listing={listing} key={listing._id} />
            ))}
          </div>
    </div>
      )}
        </div>
    </div>
  );
  }
  
