import axios from "axios";
import { useEffect, useState } from "react";
import {Link} from 'react-router-dom'

const IndexPage = () => {
  const [places, setPLaces] = useState([]);

  useEffect(() => {
    axios.get("/places").then((response) => {
      setPLaces(response.data);
    });
  }, []);
 
  return (
    <div className="mt-9 gap-x-9 gap-y-12 grid sm:grid-cols-2 lg:grid-cols-4">
      {places.length > 0 &&  places.map((place) => (
          <Link to={'/place/' + place._id} key={place._id}>
            <div className="bg-gray-300 rounded-2xl flex overflow-hidden border-b-4 border-white hover:border-primary mb-3">
              {place.photos?.[0] && (
                <img
                  className="rounded-2xl aspect-square object-cover hover:scale-110 "
                  src={"http://localhost:4100/uploads/" + place.photos?.[0]}
                />
              )}
            </div>

            <h3 className="font-bold">{place.address}</h3>
            <h2 className="text-sm truncate text-gray-500  leading-4">
              {place.title}
            </h2>

            <div className="mt-2">
              <span className="font-bold">${place.price} </span>
              per night
            </div>
          </Link>
        ))}
    </div>
  );
};

export default IndexPage;
