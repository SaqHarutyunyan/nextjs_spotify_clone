"use client";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SliderSwiper from "@/components/slider-swiper";
import { RootState } from "@/lib/store";
import { Album } from "@/app/search/page";

export default function Home() {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const [albums, setAlbums] = useState<[]>([]);
  const [albums2, setAlbums2] = useState<Album[]>([]);
  const [albums3, setAlbums3] = useState<Album[]>([]);
  const [albums4, setAlbums4] = useState<Album[]>([]);
  const [albums5, setAlbums5] = useState<Album[]>([]);

  const getAlbum = useCallback(
    async (query: string) => {
      const albumsResponse = await fetch(
        `https://api.spotify.com/v1/search?q=${query}&type=album`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const data = await albumsResponse.json();
      return data.albums.items || null;
    },
    [accessToken]
  );

  useEffect(() => {
    if (accessToken) {
      Promise.all([
        getAlbum("Miyagi"),
        getAlbum("Adele"),
        getAlbum("Drake"),
        getAlbum("Eminem"),
        getAlbum("Rihanna"),
      ])
        .then((results) => {
          const [
            miyagiAlbums,
            adeleAlbums,
            drakeAlbums,
            eminemAlbums,
            RihannaAlbums,
          ] = results;
          setAlbums(miyagiAlbums);
          setAlbums2(adeleAlbums);
          setAlbums3(drakeAlbums);
          setAlbums4(eminemAlbums);
          setAlbums5(RihannaAlbums);
        })
        .catch((error) => {
          console.error("Error fetching albums:", error);
        });
    }
  }, [accessToken, getAlbum]);

  return (
    <div className="w-full flex flex-col h-[70vh] overflow-hidden">
      <h1 className="mb-5 font-bold">Popular songs</h1>
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
        <div className="w-full h-[300px]  relative">
          <SliderSwiper albums={albums5} />
        </div>
      </div>
    </div>
  );
}
