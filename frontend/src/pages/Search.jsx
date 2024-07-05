import React, { useState } from 'react'
import  {useQuery} from "react-query"
import { useSearchContext } from '../contexts/SearchContext.jsx'
import * as apiClient from "../api-client.js"
import SearchResultsCard from '../components/SearchResultsCard.jsx'
import Pagination from '../components/Pagination.jsx'
import StarRatingFilter from '../components/StarRatingFilter.jsx'
import HotelTypesFilter from '../components/HotelTypesFilter.jsx'
import FacilitiesFilter from '../components/FacilitiesFilter.jsx'
import PriceFilter from '../components/PriceFilter.jsx'

const Search = () => {
    
    const search  = useSearchContext()
    const [page, setPage] = useState(1)

    const [selectedStars, setSelectedStars] = useState([]);
    const [selectedHotelTypes, setSelectedHotelTypes] = useState([]);
    const [selectedFacilities, setSelectedFacilities] = useState([]);
    const [selectedPrice, setSelectedPrice] = useState();
    const [sortOption, setSortOption] = useState("");
  

    const searchParams = {
      destination: search.destination,
      checkIn:search.checkIn.toISOString(),
      checkOut:search.checkOut.toISOString(),
      adultCount: search.adultCount.toString(),
      childCount: search.childCount.toString(),
      page: page.toString(),
      stars: selectedStars,
      types: selectedHotelTypes,
      facilities: selectedFacilities,
      maxPrice: selectedPrice?.toString(),
      sortOption,

    }

    const {data : hotelData } = useQuery(["searchHotels", searchParams], ()=> apiClient.searchHotels(searchParams))

    const handleStarsChange = (event) => {
      const starRating = event.target.value;
  
      setSelectedStars((prevStars) =>
        event.target.checked
          ? [...prevStars, starRating]
          : prevStars.filter((star) => star !== starRating)
      );
    };

    const handleHotelTypeChange = (
      event
    ) => {
      const hotelType = event.target.value;
  
      setSelectedHotelTypes((prevHotelTypes) =>
        event.target.checked
          ? [...prevHotelTypes, hotelType]
          : prevHotelTypes.filter((hotel) => hotel !== hotelType)
      );
    };
     
    const handleFacilityChange = (event) => {
      const facility = event.target.value;
  
      setSelectedFacilities((prevFacilities) =>
        event.target.checked
          ? [...prevFacilities, facility]
          : prevFacilities.filter((prevFacility) => prevFacility !== facility)
      );
    };
    
    // console.log(hotelData)
  
  return (
    <div className='grid grid-cols-1 lg:grid-cols-[250px_1fr]  gap-5'>
    <div className='min-[1024px]:order-last flex flex-col gap-5 '>
        <div className='flex justify-between items-center '>
        <span className='text-xl font-bold'>
          {hotelData?.pagination.total === 1 ? `${hotelData?.pagination.total} Hotel Found` : `${hotelData?.pagination.total} Hotels Found`}
          {search.destination ? ` in ${search.destination}` : ""}
        </span>

        <select
            value={sortOption}
            onChange={(event) => setSortOption(event.target.value)}
            className="p-2 border rounded-md"
          >
            <option value="">Sort By</option>
            <option value="starRating">Star Rating</option>
            <option value="pricePerNightAsc">
              Price Per Night (low to high)
            </option>
            <option value="pricePerNightDesc">
              Price Per Night (high to low)
            </option>
          </select>



        </div>
        {hotelData?.data.map((hotel, index)=>(
          <SearchResultsCard  key={index} hotel = {hotel} />
        ))}
        <div>
          <Pagination page = {hotelData?.pagination.page || 1} 
            pages={hotelData?.pagination.pages || 1}
            onPageChange={(page)=>setPage(page)}
          />
        </div>
      </div>
      <div className='rounded-lg border border-slate-300 p-5 h-fit sticky top-10'>
        <div className='space-y-5 '>
          <h3 className='text-lg font-semibold border-b border-slate-300 pb-5 '>Filter by: </h3>
          <StarRatingFilter 
            selectedStars={selectedStars}
            onChange={handleStarsChange}
          />
          <HotelTypesFilter
          selectedHotelTypes={selectedHotelTypes}
          onChange={handleHotelTypeChange}
           />
           <FacilitiesFilter
            selectedFacilities={selectedFacilities}
            onChange={handleFacilityChange}
            />
            <PriceFilter
             selectedPrice={selectedPrice}
             onChange={(value) => setSelectedPrice(value)}
             />


        </div>
      </div>
      
      
    </div>
  )
}

export default Search
