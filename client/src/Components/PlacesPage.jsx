import { Link  } from "react-router-dom";
import AccountNav from "./AccountNav";
import { useEffect, useState } from "react";
import axios from 'axios';

const PlacesPage = () => {

  const [places , setPlaces] = useState([]);

  useEffect(() => {
    axios.get('/userPlaces').then(({data}) => {
        setPlaces(data);
    })  
  } , [])

  return (
    <div>

      <AccountNav />

        <div className="text-center">
          <Link
            to={"/account/places/new"}
            className="inline-flex gap-2 bg-primary text-white py-2 px-6 rounded-full"
          >
            Add new Place
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            > 
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </Link>
        </div>

        <div className="mt-4">
             
            {places.length > 0 && places.map((place) => (
              <Link to={'/account/places/'+ place._id} key={place._id}  className="flex cursor-pointer gap-5 bg-gray-100 p-4 rounded-2xl mt-5 mb-5">
        
                <div className=" flex w-32 h-32 shrink-0">
                  {place.photos.length > 0 && (
                    <img className="object-cover rounded-xl border border-b-4 border-b-primary" src={'http://localhost:4100/uploads/'+place.photos[0]} alt="" />
                  )}
                </div>

                <div className="grow-0 shrink">
                  <h2 className="text-xl">{place.title}</h2>
                  <p className="mt-2 ps-4 text-sm grow">{place.description}</p>
                </div>
              </Link> 
            ))}
    
          </div>

    </div>
  );
};

export default PlacesPage;
