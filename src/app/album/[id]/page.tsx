"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/lib/store";
import { useParams } from "next/navigation";
import { fetchAlbumDetails } from "@/app/lib/slices/albumSlice";
import "@/app/globals.css";
import Image from "next/image";
import { setCurrentTrack } from "@/app/lib/slices/playerSlice";

interface AlbumTrack {
    id: string;
    name: string;
    artists: { name: string }[];
    duration_ms: number;
    images: { url: string }[];
    tracks: { id: string; name: string; duration_ms: number }[];
}

const AlbumPage = () => {
    const { id } = useParams(); // Album-ի ID-ն URL-ից
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (id) {
            dispatch(fetchAlbumDetails(id)); // Fetch արա տվյալ ալբոմի երգերը
        }
    }, [id, dispatch]);
    function formatDuration(durationMs: number) {
        const totalSeconds = Math.floor(durationMs / 1000); // Convert milliseconds to seconds
        const minutes = Math.floor(totalSeconds / 60); // Get the minutes part
        const seconds = totalSeconds % 60; // Get the remaining seconds

        // Return in "MM:SS" format
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`; // Add leading zero to seconds if less than 10
    }
    const album = useSelector((state: RootState) => state.album.albumDetails);
    const loading = useSelector((state: RootState) => state.album.loading);

    if (loading) return <div>Loading...</div>;
    return (
        <div className="h-[70vh] overflow-scroll scrollbar-hidden p-4">
            <div className="w-full flex items-center gap-9">
                <Image
                    width={200}
                    height={200}
                    className="object-cover rounded-xl shadow-md hover:bg-[#282828]"
                    src={album?.images[0].url}
                    alt={album?.name}
                />
                <div>
                    <h1 className="text-2xl font-bold">{album?.name}</h1>
                    <p className="text-gray-400">{album?.artist}</p>
                </div>
            </div>

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
                        {album?.tracks?.items.map(
                            (track: AlbumTrack, i: number) => (
                                <tr
                                    key={track.id}
                                    className="text-gray-400 hover:bg-[#282828] cursor-pointer"
                                    onClick={() =>
                                        dispatch(setCurrentTrack(track.id))
                                    }
                                >
                                    <td className="py-2 px-3  rounded-t-md rounded-bl-md">
                                        {i + 1}
                                    </td>
                                    <td className="py-2 px-3   text-white">
                                        {track.name}
                                    </td>
                                    <td className="py-2 px-3  ">
                                        {track.artists[0].name}
                                    </td>
                                    <td className="py-2 px-3  rounded-tr-md rounded-br-md">
                                        {formatDuration(track.duration_ms)}
                                    </td>
                                </tr>
                            )
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AlbumPage;
