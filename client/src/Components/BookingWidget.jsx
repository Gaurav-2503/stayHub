import axios from "axios";
import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const BookingWidget = (props) => {
  const { place } = props;

  BookingWidget.propTypes = {
    place: PropTypes.object,
  };

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [numGuests, setNumGuests] = useState(0);
  const [name, setName] = useState("");
  const [phoneNum, setPhoneNum] = useState("");

  const [redirect, setRedirect] = useState("");

  const {user} = useContext(UserContext);

  useEffect(() => {

    if(user) {
      setName(user.name)
    }

  } , [user])

  let numberOfNights = 0;

  if (checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }

  function bookPlace() {
    const load = {
      place: place._id,
      checkIn,
      checkOut,
      numGuests,
      name,
      phoneNum,
      price: numberOfNights * place.price,
    };

    axios
      .post("/bookplace", load)
      .then((response) => {
        if (response.status === 200) {
          const bookingId = response.data._id;
          console.log(response);

          setRedirect(`/account/booking/${bookingId}`);
        } else {
          console.log(response.status);
          // setRedirect('/login')
        }
      })
      .catch((e) => {
        console.log(e);
        if (e.response.status === 401) {

          alert("Login or Register to Book");
          
          setTimeout(() => {
           setRedirect('/login')
          }, 3000);
          
        }
      });
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div>
      <div className=" bg-gray-50 shadow rounded-2xl p-4">
        <div className="text-center text-2xl">
          <b>Price : </b>${place.price} / per night
        </div>

        <div className="border border-black rounded-2xl mt-4">
          <div className="flex">
            <div className="py-3 px-4 ">
              <label>Check in : </label>
              <input
                type="date"
                className="bg-transparent"
                value={checkIn}
                onChange={(ev) => setCheckIn(ev.target.value)}
              />
            </div>

            <div className="border-l  border-black py-3 px-4">
              <label>Check Out : </label>
              <input
                type="date"
                className="bg-transparent"
                value={checkOut}
                onChange={(ev) => setCheckOut(ev.target.value)}
              />
            </div>
          </div>

          <div className="border-t border-black py-3 px-4">
            <label>Number of Guest : </label>
            <input
              type="Number"
              className="bg-transparent"
              value={numGuests}
              onChange={(ev) => setNumGuests(ev.target.value)}
            />

            {checkIn && checkOut && (
              <>
                <label>Your full name : </label>
                <input
                  type="text"
                  className="bg-transparent"
                  value={name}
                  onChange={(ev) => setName(ev.target.value)}
                />

                <label>Phone Number </label>
                <input
                  type="tel"
                  className="bg-transparent"
                  value={phoneNum}
                  onChange={(ev) => setPhoneNum(ev.target.value)}
                />
              </>
            )}
          </div>
        </div>

        <button
          className=" mt-6 text-white font-bold w-full bg-primary py-2 rounded-3xl"
          onClick={bookPlace}
        >
          Book this place
          {numberOfNights > 0 && (
            <span>
              {" "}
              at{" "}
              <b className="text-gray-800">
                ${numberOfNights * place.price}
              </b>{" "}
            </span>
          )}
          {numberOfNights > 0 && (
            <>
              <span className="text-black">
                {" "}
                <b className="text-white">For</b> {numberOfNights} nights{" "}
              </span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default BookingWidget;
