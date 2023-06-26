import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

import Perks from "./Perks";

export default function Places() {
  const { action } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [photoLink, setPhotoLink] = useState("");
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [addInfo, setAddInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
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

  const addPhotoByLink = async (ev) => {
    ev.preventDefault();
    const { data: filename } = await axios.post("upload-by-link", { link: photoLink });
    setAddedPhotos((prev) => [...prev, filename]);
    setPhotoLink("");
  };

  const uploadPhoto = async (ev) => {
    const { files } = ev.target;
    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append("photos", files[i]);
    }

    const { data: filenames } = await axios.post("/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    setAddedPhotos((prev) => [...prev, ...filenames]);
  };

  return (
    <div>
      {action !== "new" && (
        <div className="text-center">
          <Link
            className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full"
            to="/account/places/new"
          >
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
            Add New Place
          </Link>
        </div>
      )}
      {action === "new" && (
        <div>
          <form action="">
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
            <div className="flex gap-2">
              <input
                type="text"
                value={photoLink}
                onChange={(ev) => setPhotoLink(ev.target.value)}
                placeholder="Add using a link .... jpg"
              />
              <button
                type="button"
                className="bg-gray-200 w-initial rounded-2xl px-4"
                onClick={addPhotoByLink}
              >
                Add&nbsp;Photo
              </button>
            </div>
            <div className="mt-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
              {addedPhotos.length > 0 &&
                addedPhotos.map((link) => (
                  <div key={link} className="h-32 flex relative">
                    <img
                      className="rounded-2xl w-full object-cover"
                      src={`http://localhost:4000/uploads/${link}`}
                      alt=""
                    />
                  </div>
                ))}
              <label
                className="h-32 cursor-pointer flex items-center gap-1 justify-center 
                            border bg-transparent rounded-2xl p-2 text-2xl text-gray-600"
                type="button"
                htmlFor="upload-by-device"
              >
                <input
                  type="file"
                  multiple
                  className="hidden"
                  id="upload-by-device"
                  onChange={uploadPhoto}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-7 h-7 mt-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                  />
                </svg>
                Upload
              </label>
            </div>
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
      )}
    </div>
  );
}
