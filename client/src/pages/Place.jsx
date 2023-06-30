import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import AddressLink from "../AddressLink";
import BookingWidget from "../BookingWidget";
import PlaceGallery from "../PlaceGallery";

export default function Place() {
  const { id } = useParams();
  const [place, setPlace] = useState(null);

  useEffect(() => {
    if (!id) {
      return;
    }

    const fetchPlace = async () => {
      const { data } = await axios.get(`/places/${id}`);
      setPlace(data);
    };

    fetchPlace();
  }, [id]);

  if (!place) return "";

  console.log(place);

  return (
    <div className="mt-4 -mx-8 px-8 pt-8 ">
      <div className="mb-5">
        <h1 className="text-4xl font-medium">{place.title}</h1>
        <AddressLink>{place.address}</AddressLink>
      </div>
      <PlaceGallery place={place} />
      <div className="mt-8 mb-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
        <div>
          <div className="my-4">
            <h2 className="font-semibold text-2xl">Description</h2>
            {place.description}
          </div>
          Check-in: {place.checkIn}
          <br />
          Check-out: {place.checkOut}
          <br />
          Max number of guests: {place.maxGuests}
        </div>
        <div>
          <BookingWidget place={place} />
        </div>
      </div>
      <div className="bg-white -mx-8 px-8 py-8 border-t">
        <div>
          <h2 className="font-semibold text-2xl">Extra info</h2>
        </div>
        <div className="mb-4 mt-2 text-sm text-gray-700 leading-5">{place.addInfo}</div>
      </div>
    </div>
  );
}
