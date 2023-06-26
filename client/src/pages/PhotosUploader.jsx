import { useState } from "react";
import axios from "axios";

export default function PhotosUploader({ addedPhotos, onChange }) {
  const [photoLink, setPhotoLink] = useState("");

  const addPhotoByLink = async (ev) => {
    ev.preventDefault();
    const { data: filename } = await axios.post("upload-by-link", { link: photoLink });
    onChange((prev) => [...prev, filename]);
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

    onChange((prev) => [...prev, ...filenames]);
  };
  return (
    <>
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
    </>
  );
}
