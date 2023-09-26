import { useEffect, useState } from "react";
import AccountNav from "./AccountNav";
import axios from "axios";
import { Link } from "react-router-dom";
import BookingDates from "./BookingDates";

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios.get("/bookings").then((response) => {
      setBookings(response.data);
    });
  }, []);

  return (
    <div>
      <AccountNav />

      <div className="mt-4">
        {bookings.length > 0 &&
          bookings.map((booking) => (
            <Link
              to={"/account/booking/" + booking._id}
              key={booking._id}
              className="flex cursor-pointer gap-5 bg-gray-100 p-4 rounded-2xl mt-5 mb-5"
            >
              <div className=" flex w-32 h-32 shrink-0">
                {booking.place.photos.length > 0 && (
                  <img
                    className="object-cover rounded-xl border border-b-4 border-b-primary"
                    src={
                      "http://localhost:4100/uploads/" + booking.place.photos[0]
                    }
                    alt=""
                  />
                )}
              </div>

              <div className="grow">
                <h2 className="text-xl">{booking.place.title}</h2>


                <BookingDates
                  booking={booking}
                  classNames={"mt-2 mb-2 text-sm text-gray-500"}
                />

                <div className="flex gap-1 items-center mt-4">
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
                      d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                    />
                  </svg>
                  Total Price : ${booking.price}
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default BookingsPage;
