import { useState } from "react";
import ReactDOM from "react-dom";

export default function PlaceGallery({ place }) {
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  const singlePane = [];
  const doublePane = [];

  for (let i = 0; i < place.photos.length; i++) {
    const photo = place.photos[i];

    if (i % 3 === 0) {
      singlePane.push(photo);
    } else if (i + 1 < place.photos.length) {
      const secondPhoto = place.photos[i + 1];
      doublePane.push({ p1: photo, p2: secondPhoto });
      i++;
    } else {
      doublePane.push({ p1: photo });
    }
  }

  const photoExists = place?.photos?.length > 0;

  const singlePaneElems = singlePane.map((photo, i) => ({
    content: (
      <div key={photo.url} style={{ gridArea: "1/1/auto/auto" }}>
        <img
          src={`http://localhost:4000/uploads/${photo.url}`}
          alt="single"
          className="h-full w-full object-cover"
          style={{ maxHeight: "46rem" }}
        />
      </div>
    ),
    key: photo.url,
    order: i * 2 + 1,
  }));

  const doublePaneElems = doublePane.map((photo, i) => ({
    content: (
      <div
        style={{
          display: "grid",
          gridAutoColumns: "1fr",
          gridAutoRows: "1fr",
          gridTemplateColumns: "1fr 1fr",
          gap: "8px",
        }}
      >
        <div key={photo.p1.url} style={{ gridArea: "1/1/auto/auto" }}>
          <img
            src={`http://localhost:4000/uploads/${photo.p1.url}`}
            alt="double"
            className="h-full w-full object-cover "
          />
        </div>
        {photo.p2 && (
          <div key={photo.p2.url} style={{ gridArea: "1/2/auto/auto" }}>
            <img
              src={`http://localhost:4000/uploads/${photo.p2.url}`}
              alt="double"
              className="h-full w-full object-cover"
            />
          </div>
        )}
      </div>
    ),
    key: photo.p1.url + photo.p2.url,
    order: i * 2 + 2,
  }));

  // eslint-disable-next-line react/no-unstable-nested-components, react/function-component-definition
  const ShowAllPhotoGallery = () => (
    <div className="bg-white min-h-screen max-h-max max-w-full w-screen">
      <div className="sticky flex top-0 p-2 py-2 bg-white">
        <button
          type="button"
          onClick={() => setShowAllPhotos(false)}
          className="py-2 px-3"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      <div className="bg-white p-8 grid gap-4 max-w-6xl mx-auto">
        <div
          style={{ display: "grid", gap: "8px", gripTemplateColumns: "1fr" }}
          className="mx-20"
        >
          {photoExists &&
            singlePaneElems.map((e) => (
              <div
                key={e.key}
                style={{ display: "grid", gridArea: `${e.order}/1/auto/auto` }}
              >
                {e.content}
              </div>
            ))}
          {photoExists &&
            doublePaneElems.map((e) => (
              <div
                key={e.key}
                style={{ display: "grid", gridArea: `${e.order}/1/auto/auto` }}
              >
                {e.content}
              </div>
            ))}
        </div>
      </div>
    </div>
  );

  if (showAllPhotos) {
    return ReactDOM.createPortal(
      <ShowAllPhotoGallery />,
      document.getElementById("photo-gallery")
    );
  }

  return (
    <div className="relative">
      <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-3xl overflow-hidden">
        <div>
          {place.photos?.[0] && (
            <div>
              <img
                onClick={() => setShowAllPhotos(true)}
                className="aspect-square cursor-pointer object-cover"
                src={`http://localhost:4000/uploads/${place.photos[0].url}`}
                alt=""
              />
            </div>
          )}
        </div>
        <div className="grid">
          {place.photos?.[1] && (
            <img
              onClick={() => setShowAllPhotos(true)}
              className="aspect-square cursor-pointer object-cover"
              src={`http://localhost:4000/uploads/${place.photos[1].url}`}
              alt=""
            />
          )}
          <div className="overflow-hidden">
            {place.photos?.[2] && (
              <img
                onClick={() => setShowAllPhotos(true)}
                className="aspect-square cursor-pointer object-cover relative top-2"
                src={`http://localhost:4000/uploads/${place.photos[2].url}`}
                alt=""
              />
            )}
          </div>
        </div>
      </div>
      <button
        type="button"
        onClick={() => setShowAllPhotos(true)}
        className="flex gap-1 absolute bottom-3 right-3 py-2 px-4 bg-gray-200 rounded-2xl 
                    shadow-md shadow-gray-500 bg-opacity-90"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path
            fillRule="evenodd"
            d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
            clipRule="evenodd"
          />
        </svg>
        Show more photos
      </button>
    </div>
  );
}
