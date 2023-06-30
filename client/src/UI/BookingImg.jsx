import Image from "./Image";

export default function BookingImg({ place, index = 0, className = null }) {
  if (!place.photos?.length) {
    return "";
  }
  if (!className) {
    className = "object-cover";
  }
  return <Image className={className} src={place.photos[index].url} alt="" />;
}
