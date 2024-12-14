"use client";
import { RootState } from "@/app/lib/store";
import React from "react";
import { useSelector } from "react-redux";

const Player = () => {
    const currentTrackId = useSelector((state: RootState) => {
        return state.player.currentTrack;
    });

    return (
        <div className="py-3 px-8 w-full flex items-center absolute bg-black h-[150px] left-0 bottom-0">
            <iframe
                src={`https://open.spotify.com/embed/track/${currentTrackId}`}
                width="100%"
                height="80"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                className="rounded-md"
            ></iframe>
        </div>
    );
};

export default Player;
