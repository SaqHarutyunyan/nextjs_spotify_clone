"use client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "./lib/store";

export default function Home() {
    const accessToken = useSelector(
        (state: RootState) => state.auth.accessToken
    );
    const [albums, setAlbums] = useState<any[]>([]);

    useEffect(() => {
        if (accessToken) {
            fetchMiyagiAlbums(); // Fetch Miyagi albums
        }
    }, [accessToken]);

    const fetchMiyagiAlbums = async () => {
        const albumsAuthoParams = {
            method: "GET",
            headers: {
                Authorization: "Bearer " + accessToken,
                "Content-Type": "application/json",
            },
        };

        // Ստանալ բոլոր ալբոմները՝ ըստ հայցումի
        const albumsResponse = await fetch(
            `https://api.spotify.com/v1/albums/4bTfyrDHiBOV0rEV8EG1ua`, // This can be adjusted to fetch all albums
            albumsAuthoParams
        );
        const data = await albumsResponse.json();
        setAlbums(data); // Ստանալ միայն Miyagi-ի ալբոմները
    };

    return (
        <div>
            <h1>Miyagis Albums</h1>
            <div className="albums">
                {albums.length > 0 ? (
                    albums.map((album) => (
                        <div key={album.album.id} className="album-card">
                            {/* <img
                                src={album.album.images[0].url}
                                alt={album.album.name}
                                className="album-image"
                            /> */}
                            <h2>{album.album.name}</h2>
                            <p>{album.album.artists[0].name}</p>
                        </div>
                    ))
                ) : (
                    <p>Loading albums...</p>
                )}
            </div>
        </div>
    );
}
