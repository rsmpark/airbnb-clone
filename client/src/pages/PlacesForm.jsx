import { useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

import AccountNav from "./AccountNav";
import Perks from "./Perks";
import PhotosUploader from "./PhotosUploader";

export default function PlacesForm() {
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [addInfo, setAddInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [redirect, setRedirect] = useState(false);
  // TODO: use reducers

  const inputHeader = (text) => <h2 className="text-2xl mt-4">{text}</h2>;

  const inputDescription = (text) => <p className="text-gray-500 text-sm">{text}</p>;

  // TODO: use preInput to populate input components
  const preInput = (header, description) => (
    <>
      {inputHeader(header)}
      {inputDescription(description)}
    </>
  );

  const addNewPlace = async (ev) => {
    ev.preventDefault();
    const placeData = {
      title,
      address,
      addedPhotos,
      description,
      perks,
      addInfo,
      checkIn,
      checkOut,
      maxGuests,
    };

    await axios.post("/places", placeData);

    setRedirect(true);
  };

  if (redirect) {
    return <Navigate to="/account/places" />;
  }

  return (
    <div>
      <AccountNav />
      <form onSubmit={addNewPlace}>
        {preInput("Title", "Title for your place")}
        <input
          type="text"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
          placeholder="title, for example: Apartment"
        />
        {preInput("Address", "Address for your place")}
        <input
          type="text"
          value={address}
          onChange={(ev) => setAddress(ev.target.value)}
          placeholder="address"
        />
        {preInput("Photos", "more = better")}
        <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
        {preInput("Description", "description of the place")}
        <textarea
          name="description"
          value={description}
          onChange={(ev) => setDescription(ev.target.value)}
        />
        {preInput("Perks", "Select all the perks")}
        <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          <Perks selected={perks} onChange={setPerks} />
        </div>
        {preInput("Additional Details", "House rules, etc...")}
        <textarea value={addInfo} onChange={(ev) => setAddInfo(ev.target.value)} />
        {preInput("Check In/Out Times", "Add check in/out times")}
        <div className="grid gap-2 sm:grid-cols-3">
          <div>
            <h3 className="mt-2 -mb-1">Check In time</h3>
            <input
              type="text"
              value={checkIn}
              onChange={(ev) => setCheckIn(ev.target.value)}
              placeholder="14:00"
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Check Out time</h3>
            <input
              type="text"
              value={checkOut}
              onChange={(ev) => setCheckOut(ev.target.value)}
              placeholder="11:00"
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Max # of Guests</h3>
            <input
              type="number"
              value={maxGuests}
              onChange={(ev) => setMaxGuests(ev.target.value)}
              placeholder=""
            />
          </div>
        </div>
        <button type="submit" className="primary my-4">
          Save
        </button>
      </form>
    </div>
  );
}
