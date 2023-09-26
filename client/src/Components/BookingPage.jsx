import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import MapLink from "./MapLink";
import PlacePhotosGallery from "./PlacePhotosGallery";
import BookingDates from "./BookingDates";

const BookingPage = () => {

    const {id} = useParams();

    const [booking, setBooking] = useState(null);

    useEffect(() => {

      if(id) {
        axios.get('/bookings').then((response) => {

          const foundBooking = response.data.find(({_id}) =>_id === id);
          if(foundBooking) {
            setBooking(foundBooking);
          }

        })
      }

    } , [id])

    if(!booking) {
      return ''
    }

  return (
    <div>
      <h1 className="sm:text-2xl lg:text-3xl me-">{booking.place.title}</h1>

      <MapLink>{booking.place.address}</MapLink>

      <div className="bg-gray-300 p-6 mb-4 rounded-2xl flex justify-between items-center">
        <div>
          <h2 className="text-2xl">Your Booking Information</h2>
       
        <BookingDates
          booking={booking}
          classNames={"mt-2 mb-2 text-md text-black"}
        />

        </div>

        <div className="bg-primary p-6 text-white rounded-2xl">
            <div>Total Price : </div>
            <div className="text-3xl">${booking.price} </div>
        </div>

      </div>

      <PlacePhotosGallery place={booking.place} />
    </div>
  );
}

export default BookingPage