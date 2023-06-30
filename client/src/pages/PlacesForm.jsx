import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";

import AccountNav from "../layouts/AccountNav";
import Perks from "../Perks";
import PhotosUploader from "../PhotosUploader";

export default function PlacesForm() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [addInfo, setAddInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [price, setPrice] = useState(100);
  const [redirect, setRedirect] = useState(false);
  // TODO: use reducers

  useEffect(() => {
    if (!id) return;

    const fetchPlaces = async () => {
      const { data } = await axios.get(`/places/${id}`);
      setTitle(data.title);
      setAddress(data.address);
      setAddedPhotos(data.photos);
      setDescription(data.description);
      setPerks(data.perks);
      setAddInfo(data.addInfo);
      setCheckIn(data.checkIn);
      setCheckOut(data.checkOut);
      setMaxGuests(data.maxGuests);
      setPrice(data.price);
    };

    fetchPlaces();
  }, [id]);

  const inputHeader = (text) => <h2 className="text-2xl mt-4">{text}</h2>;

  const inputDescription = (text) => <p className="text-gray-500 text-sm">{text}</p>;

  // TODO: use preInput to populate input components
  const preInput = (header, description) => (
    <>
      {inputHeader(header)}
      {inputDescription(description)}
    </>
  );

  const savePlace = async (ev) => {
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
      price,
    };

    if (id) {
      await axios.put("/places", { id, ...placeData });
    } else {
      await axios.post("/places", placeData);
    }

    setRedirect(true);
  };

  if (redirect) {
    return <Navigate to="/account/places" />;
  }

  return (
    <div>
      <AccountNav />
      <form onSubmit={savePlace}>
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
        <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
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
          <div>
            <h3 className="mt-2 -mb-1">Price per Night</h3>
            <input
              type="number"
              value={price}
              onChange={(ev) => setPrice(ev.target.value)}
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
