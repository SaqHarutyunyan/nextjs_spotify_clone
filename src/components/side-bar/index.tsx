import Image from "next/image";
import Link from "next/link";
import React from "react";
import { CgMediaPodcast } from "react-icons/cg";
import { FaHeart, FaPlus } from "react-icons/fa";

const SideBar = () => {
  return (
    <div className=" bg-black w-[300px] h-screen  text-white px-2 py-5 space-y-6">
      {/* Spotify Logo */}
      <Link href={"/"} className="flex items-center pl-2 mb-5">
        <Image
          width={100}
          height={100}
          src="/logo.png"
          alt="Spotify"
          className="w-28"
        />
      </Link>

      {/* Navigation Links */}
      <div className="space-y-2">
        <div className="flex items-center pl-3 cursor-pointer px-6 py-2 rounded-md hover:bg-[#282828]">
          <Link className="flex items-center gap-6" href="/">
            <Image
              width={24}
              height={24}
              src="/home.png"
              alt="Spotify"
              className="w-6"
            />
            <span className="font-bold">Home</span>
          </Link>
        </div>
        <div className="flex items-center pl-3 cursor-pointer px-6 py-2 rounded-md hover:bg-[#282828]">
          <Link className="flex items-center gap-6" href="/search">
            <Image
              width={24}
              height={24}
              src="/search.png"
              alt="Spotify"
              className="w-6"
            />
            <span className="font-bold">Search</span>
          </Link>
        </div>
        <div className="flex items-center pl-3 cursor-pointer px-6 py-2 rounded-md hover:bg-[#282828]">
          <Link className="flex items-center gap-6" href="/">
            <Image
              width={24}
              height={24}
              src="/library.png"
              alt="Spotify"
              className="w-6"
            />
            <span className="font-bold">Library</span>
          </Link>
        </div>
        <div className="mt-[40px]">
          <div className="flex items-center gap-6 pl-3 cursor-pointer px-6 py-2 rounded-md hover:bg-[#282828]">
            <div className="w-6 h-6 bg-white flex justify-center items-center rounded-sm">
              <FaPlus color="black" />
            </div>
            <span>Create Playlist</span>
          </div>
          <Link
            href={"/favorite"}
            className="flex items-center gap-6 pl-3 cursor-pointer px-6 py-2 rounded-md hover:bg-[#282828]"
          >
            <div className="liked_song flex items-center justify-center w-6 h-6">
              <FaHeart color="white" />
            </div>
            <span>Liked Songs</span>
          </Link>
          <div className="flex items-center gap-6 pl-3 cursor-pointer px-6 py-2 rounded-md hover:bg-[#282828]">
            <div className="bg-[#004638] rounded-sm w-6 h-6 flex items-center justify-center">
              <CgMediaPodcast color="#159643" />
            </div>
            <span>Your Episodes</span>
          </div>
        </div>
      </div>

      {/* Playlist Items */}
      <div className="flex flex-col gap-1 px-3 text-gray-400">
        <p>FAV</p>
        <p>Daily Mix 1</p>
        <p>Discover Weekly</p>
        <p>Malayalam</p>
        <p>Dance/Electronic Mix</p>
        <p>EDM / Popular</p>
      </div>

      {/* Install App */}
      <div className="border-t border-gray-700 pt-4">
        <div className="flex items-center px-3 py-2 rounded-md cursor-pointer hover:bg-[#282828] hover:text-green-500">
          <span>Install App</span>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
