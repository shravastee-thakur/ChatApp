import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import assets from "../assets/assets";

const Profile = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();
  const [name, setName] = useState("Martin Johnson");
  const [bio, setBio] = useState("Hi everyone, im using quick chat");

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#024751]">
      <div className="border-2 bg-white/8 text-white border-gray-500 p-4 flex flex-col gap-6 rounded-lg shadow-lg w-5/6 max-w-2xl">
        <form className="flex flex-col gap-5 flex-1">
          <h3 className="text-lg">Profile Details</h3>
          <label
            htmlFor="avatar"
            className="flex items-center gap-3 cursor-pointer"
          >
            <input
              onChange={(e) => setSelectedImage(e.target.files[0])}
              type="file"
              id="avatar"
              accept=".png, .jpg, .jpeg"
              hidden
            />
            <img
              src={
                selectedImage
                  ? URL.createObjectURL(selectedImage)
                  : assets.avatar_icon
              }
              className={`w-12 h-12 mt-4 ${selectedImage && "rounded-full"}`}
            />
            upload profile image
          </label>

          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            required
            placeholder="Your name"
            className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-300"
          />

          <textarea
            onChange={(e) => setBio(e.target.value)}
            value={bio}
            rows={4}
            className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-300"
            placeholder="provide a short bio..."
            required
          ></textarea>

          <button
            type="submit"
            className="py-3 bg-sky-300 rounded-md cursor-pointer"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
