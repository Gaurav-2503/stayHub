import axios from "axios";
import { useEffect, useState } from "react";
import Perks from "./Perks";
import PhotosUploader from "./PhotosUploader";
import AccountNav from "./AccountNav";
import { Navigate, useParams } from "react-router-dom";


const PlacesFormPage = () => {

  const {id} = useParams();

  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [price , setPrice] = useState(0);
  const [redirect , setRedirect] = useState(false);

  useEffect(() => {

    if(!id) {
      return;
    }

    axios.get('/places/' + id).then(response => {
      const {data} = response;

      setTitle(data.title);
      setAddress(data.address);
      setAddedPhotos(data.photos);
      setDescription(data.description);
      setPerks(data.perks);
      setExtraInfo(data.extraInfo);
      setCheckIn(data.checkIn);
      setCheckOut(data.checkOut);
      setMaxGuests(data.maxGuests);
      setPrice(data.price);
    })

  } ,[id] )  // id of the post from params
   

  function createHeader(text) {
    return <h2 className="text-2xl mt-5">{text}</h2>;
  }

  function createDescription(text) {
    return <p className="text-gray-400 text-sm">{text}</p>;
  }

  function genTemplate(title, description) {
    return (
      <>
        {createHeader(title)}
        {createDescription(description)}
      </>
    );
  }

  // this function is for saving new place and updating the place also
  async function savePlace(ev) {

    ev.preventDefault();

    
    const placeData = {
      title , address , addedPhotos ,
      description , perks , extraInfo , 
      checkIn , checkOut , maxGuests , 
      price
    };

    if(id) {
      
      // update existing place 
      await axios.put('/places' , {
        id , ...placeData
      });
      // now we want to redirect after adding a place 
      setRedirect(true);
      
    }else{
      // new place 
  
      await axios.post('/places' , placeData);
      // now we want to redirect after adding a place 
      setRedirect(true);
    }
  } 

  if(redirect) {
    return <Navigate to={'/account/places'} />
  }

  return (
    <div>

        <AccountNav />

      <form onSubmit={savePlace}>
        {genTemplate(
          "Title",
          "Title for your place , should be short and catchy"
        )}
        <input
          type="text"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
          placeholder="Title"
        />

        {genTemplate("Address", "Adresss of this place")}
        <input
          type="text"
          value={address}
          onChange={(ev) => setAddress(ev.target.value)}
          placeholder="Address"
        />

        {genTemplate("Photos", "Add Original and Clean Photos of place")}

        <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />

        {genTemplate("Description", "Description of the place")}
        <textarea
          value={description}
          onChange={(ev) => setDescription(ev.target.value)}
        ></textarea>

        {genTemplate("Perks", "Select all the perks of your place")}

        <div className="mt-3 gap-3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          <Perks selected={perks} onChange={setPerks} />
        </div>

        {genTemplate("Extra Information", "House rules , etc..")}
        <textarea
          value={extraInfo}
          onChange={(ev) => setExtraInfo(ev.target.value)}
        ></textarea>

        {genTemplate(
          "Check in & Check Out Times , Max guests",
          "Add check in & out times  , remeber to have a time window for cleaning the house"
        )}

        <div className=" mt-3 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div>
            <h3 className="-mb-2">Check in time : </h3>
            <input
              value={checkIn}
              onChange={(ev) => setCheckIn(ev.target.value)}
              type="text"
              placeholder="15:00"
            />
          </div>

          <div>
            <h3 className="-mb-2">Check Out time : </h3>
            <input
              value={checkOut}
              onChange={(ev) => setCheckOut(ev.target.value)}
              type="text"
              placeholder="14:00"
            />
          </div>

          <div>
            <h3 className="-mb-2">Max Number of Guests : </h3>
            <input
              value={maxGuests}
              onChange={(ev) => setMaxGuests(ev.target.value)}
              type="number"
              placeholder="14:00"
            />
          </div>

          <div>
            <h3 className="-mb-2">Price per Night </h3>
            <input
              value={price}
              onChange={(ev) => setPrice(ev.target.value)}
              type="number"
              placeholder="$"
            />
          </div>

        </div>

        <div className="">
          <button className="primary" type="submit">
            Save{" "}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PlacesFormPage;
