import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookingWidget from "./BookingWidget";
import PlacePhotosGallery from "./PlacePhotosGallery";
import MapLink from "./MapLink";

const PlaceInfoPage = () => {
  const { id } = useParams();
  const [place, setPlace] = useState(null);

  useEffect(() => {
    if (!id) {
      return;
    }

    axios.get(`/places/${id}`).then((response) => {
      setPlace(response.data);
    });
  }, [id]);

  if (!place) return "";


  return (
    <div className="mt-8">
      <h1 className="sm:text-2xl lg:text-3xl me-">{place.title}</h1>
        
       <MapLink>{place.address}</MapLink>

      <PlacePhotosGallery place={place} />

        <div className="mt-10 text-justify">
          <h2 className="font-semibold text-2xl mb-2">Description</h2>
          {place.description}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] mt-10">
              <div className="flex flex-col gap-2 pe-5">
                  <span><b>Check-in Time : </b>{place.checkIn}</span>
                  <span><b>Check-out Time : </b>{place.checkOut}</span>
                  <span><b>Max Guest&apos;s  : </b>{place.maxGuests}</span> 

                  <div className="mt-5 text-justify">
                    <h2 className="font-semibold text-2xl mb-2"> Extra Info </h2>
                    {place.extraInfo}
                  </div>

              </div>


              <BookingWidget place = {place} />

             
        </div>

    </div>
  );
};

export default PlaceInfoPage;
