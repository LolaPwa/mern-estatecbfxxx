import {useEffect, useState}from 'react';
import {Link}from 'react-router-dom';
import {Swiper, SwiperSlide}from 'swiper/react';
import  SwiperCore from 'swiper';
import {Navigation} from 'swiper/modules';
import 'swiper/css/bundle';
import ListingItem from '../components/ListingItem';

export default function Home() {
    const [offerListing, setOfferListings] = useState([]);
    const [saleListing, setSaleListings] = useState([]);
    const [rentListing, setRentListings] = useState([]);
    SwiperCore.use([Navigation]);
    console.log(offerListings)
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
              log(error);
            }
          };
          fetchOfferListings();
        }, []);
        







  return (
    <div>Home</div>
  )
}
