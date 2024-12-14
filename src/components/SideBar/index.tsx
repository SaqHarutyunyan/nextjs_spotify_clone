import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaHeart, FaHome, FaPlus, FaPodcast, FaSearch } from "react-icons/fa";

const SideBar = () => {
    return (
        <div className=" bg-black w-[300px] h-screen  text-white p-4 space-y-6">
            {/* Spotify Logo */}
            <div className="flex items-center space-x-2 mb-4">
                <Image
                    width={100}
                    height={100}
                    src="https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg"
                    alt="Spotify"
                    className="w-28"
                />
            </div>

            {/* Navigation Links */}
            <div className="space-y-4">
                <div className="flex items-center space-x-2 cursor-pointer p-2 rounded-md hover:bg-[#282828] hover:text-green-500">
                    <FaHome />
                    <Link href="/">Home</Link>
                </div>
                <div className="flex items-center space-x-2 cursor-pointer p-2 rounded-md hover:bg-[#282828] hover:text-green-500">
                    <FaSearch />
                    <Link href="/search">Search</Link>
                </div>
                <div className="flex items-center space-x-2 cursor-pointer p-2 rounded-md hover:bg-[#282828] hover:text-green-500">
                    <FaPlus />
                    <span>Create Playlist</span>
                </div>
                <div className="flex items-center space-x-2 cursor-pointer p-2 rounded-md hover:bg-[#282828] hover:text-green-500">
                    <FaHeart />
                    <span>Liked Songs</span>
                </div>
                <div className="flex items-center space-x-2 cursor-pointer p-2 rounded-md hover:bg-[#282828] hover:text-green-500">
                    <FaPodcast />
                    <span>Your Episodes</span>
                </div>
            </div>

            {/* Playlist Items */}
            <div className="space-y-2 text-gray-400">
                <p>FAV</p>
                <p>Daily Mix 1</p>
                <p>Discover Weekly</p>
                <p>Malayalam</p>
                <p>Dance/Electronic Mix</p>
                <p>EDM / Popular</p>
            </div>

            {/* Install App */}
            <div className="border-t border-gray-700 pt-4">
                <div className="flex items-center space-x-2 cursor-pointer hover:text-green-500">
                    <span>Install App</span>
                </div>
            </div>
        </div>
    );
};

export default SideBar;
