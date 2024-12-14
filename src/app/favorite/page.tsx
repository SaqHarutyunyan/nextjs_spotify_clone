"use client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Image from "next/image";
import { RootState } from "../lib/store";
import { useDispatch } from "react-redux";
import { setCurrentTrack } from "../lib/slices/playerSlice";
import { FaHeart } from "react-icons/fa";

type Artist = {
    id: string;
    name: string;
};

type Album = {
    id: string;
    name: string;
    images: { url: string }[];
};

type Track = {
    id: string;
    name: string;
    artists: Artist[];
    album: Album;
    duration_ms: number; // ավելացված է
};

type FavoriteTrackResponse = {
    items: {
        track: Track;
    }[];
};

export default function FavoriteSongs() {
    const accessToken = useSelector(
        (state: RootState) => state.auth.accessToken
    );
    const dispatch = useDispatch();
    const [favoriteSongs, setFavoriteSongs] = useState<
        FavoriteTrackResponse["items"]
    >([]);

    useEffect(() => {
        if (accessToken) {
            fetchFavoriteSongs();
        }
    }, [accessToken]);

    function formatDuration(durationMs: number) {
        const totalSeconds = Math.floor(durationMs / 1000); // Convert milliseconds to seconds
        const minutes = Math.floor(totalSeconds / 60); // Get the minutes part
        const seconds = totalSeconds % 60; // Get the remaining seconds

        // Return in "MM:SS" format
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`; // Add leading zero to seconds if less than 10
    }

    const fetchFavoriteSongs = async () => {
        const response = await fetch(`https://api.spotify.com/v1/me/tracks`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        const data: FavoriteTrackResponse = await response.json();
        setFavoriteSongs(data.items);
    };

    return (
        <div className="w-full flex flex-col items-center">
            <div className="w-full h-[70vh] overflow-hidden scrollbar-hidden-favorite p-4">
                {favoriteSongs.length > 0 && (
                    <div className="w-full flex items-center gap-9">
                        <div className="liked_song w-[200px] h-[200px] rounded-2xl shadow-md flex items-center justify-center">
                            <FaHeart size={100} />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold">
                                Favorite tracks
                            </h1>
                        </div>
                    </div>
                )}

                {/* Երգերի ցուցակ */}
                <div className="mt-4">
                    <h2 className="text-xl font-semibold mb-2">Songs</h2>
                    <table className="w-full table-auto">
                        <thead>
                            <tr className="text-gray-500 text-left">
                                <th className="pb-2">#</th>
                                <th className="pb-2">Название</th>
                                <th className="pb-2">Исполнитель</th>
                                <th className="pb-2">Длительность</th>
                            </tr>
                        </thead>
                        <tbody>
                            {favoriteSongs.map((song, i: number) => (
                                <tr
                                    key={song.track.id}
                                    className="text-gray-400 hover:bg-[#282828] cursor-pointer"
                                    onClick={() =>
                                        dispatch(setCurrentTrack(song.track.id))
                                    }
                                >
                                    <td className="py-2 px-3 rounded-t-md rounded-bl-md">
                                        {i + 1}
                                    </td>
                                    <td className="flex items-center gap-2  py-2 px-3 text-white">
                                        <Image
                                            width={40}
                                            height={40}
                                            className="object-cover rounded-sm shadow-sm"
                                            src={
                                                favoriteSongs[i].track.album
                                                    .images[0]?.url ||
                                                "/placeholder-image.jpg"
                                            }
                                            alt={
                                                favoriteSongs[i].track.album
                                                    .name ||
                                                "No Image Available"
                                            }
                                        />

                                        <p>{song.track.name}</p>
                                    </td>
                                    <td className="py-2 px-3">
                                        {song.track.artists
                                            .map((artist) => artist.name)
                                            .join(", ")}
                                    </td>
                                    <td className="py-2 px-3 rounded-tr-md rounded-br-md">
                                        {formatDuration(song.track.duration_ms)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
