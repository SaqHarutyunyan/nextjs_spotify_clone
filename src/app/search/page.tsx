"use client";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../lib/store";
import Albums from "@/components/Albums";

export interface Album {
    id: string;
    name: string;
    artist: string;
    images: [
        { url: string; width: number; height: number },
        { url: string; width: number; height: number },
        { url: string; width: number; height: number }
    ];
    release_date: string;
    total_tracks: number;
    popularity: number;
    album_type: string;
}

const Search = () => {
    const results = useSelector((state: RootState) => state.search.results);
    console.log(results, "search results");

    return (
        <div className="h-[70vh] overflow-scroll no-scrollbar  px-4">
            <h1 className="text-2xl font-bold mb-4">Search Results</h1>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                {results?.map((album: Album) => (
                    <Albums key={album.id} album={album} />
                ))}
            </div>
        </div>
    );
};

export default Search;
