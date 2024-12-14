"use client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "./lib/store";
import SliderSwiper from "@/components/SliderSwiper";

export default function Home() {
    const accessToken = useSelector(
        (state: RootState) => state.auth.accessToken
    );
    const [albums, setAlbums] = useState<[]>([]);
    const [albums2, setAlbums2] = useState<[]>([]);
    const [albums3, setAlbums3] = useState<[]>([]);
    const [albums4, setAlbums4] = useState<[]>([]);

    useEffect(() => {
        if (accessToken) {
            fetchMiyagiAlbums();
            fetchVnasAlbums();
            fetchAramiAlbums();
            fetchGufAlbums();
        }
    }, [accessToken]);

    const fetchMiyagiAlbums = async () => {
        const albumsResponse = await fetch(
            `https://api.spotify.com/v1/search?q=Miyagi&type=album`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );
        const data = await albumsResponse.json();
        setAlbums(data.albums.items);
    };
    const fetchVnasAlbums = async () => {
        const albumsResponse = await fetch(
            `https://api.spotify.com/v1/search?q=Vnas&type=album`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );
        const data = await albumsResponse.json();
        setAlbums2(data.albums.items);
    };
    const fetchAramiAlbums = async () => {
        const albumsResponse = await fetch(
            `https://api.spotify.com/v1/search?q=aramasatryani&type=album`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );
        const data = await albumsResponse.json();
        setAlbums3(data.albums.items);
    };
    const fetchGufAlbums = async () => {
        const albumsResponse = await fetch(
            `https://api.spotify.com/v1/search?q=guf&type=album`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );
        const data = await albumsResponse.json();
        setAlbums4(data.albums.items);
    };

    return (
        <div className="w-full flex flex-col h-[70vh] overflow-hidden">
            <h1>Miyagis Albums</h1>
            <div className="overflow-scroll scrollbar-hidden-home">
                <div className="w-full h-[300px]  relative">
                    <SliderSwiper albums={albums} />
                </div>
                <div className="w-full h-[300px]  relative">
                    <SliderSwiper albums={albums2} />
                </div>
                <div className="w-full h-[300px]  relative">
                    <SliderSwiper albums={albums3} />
                </div>
                <div className="w-full h-[300px]  relative">
                    <SliderSwiper albums={albums4} />
                </div>
            </div>
        </div>
    );
}
