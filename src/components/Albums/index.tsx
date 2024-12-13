import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaPlay } from "react-icons/fa";

interface Album {
    id: string;
    name: string;
    artist: string;
    images: { url: string; width: number; height: number }[];
}

interface AlbumsProps {
    album: Album;
}

const Albums: React.FC<AlbumsProps> = ({ album }) => {
    return (
        <Link href={`/album/${album.id}`}>
            <div
                className="cursor-pointer p-4 rounded-xl shadow-md hover:bg-[#282828] transition-all duration-300 flex flex-col"
                key={album.id}
            >
                <div className="music_item w-full relative">
                    <Image
                        width={150}
                        height={150}
                        src={album.images?.[1]?.url || ""}
                        alt={album.name}
                        className="rounded-lg w-full h-auto object-cover"
                    />
                    <div className="fa_play absolute right-3 opacity-0 bottom-3 w-[48px] h-[48px] bg-[#1ed760] flex justify-center items-center rounded-[50%]">
                        <FaPlay color="black" />
                    </div>
                </div>
                <div className="text-white mt-2">
                    <h3 className="text-sm font-semibold">{album.name}</h3>
                    <p className="text-xs text-gray-400">{album.artist}</p>
                </div>
            </div>
        </Link>
    );
};

export default Albums;
