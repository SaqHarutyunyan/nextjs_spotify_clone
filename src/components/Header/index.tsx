"use client";
import {
    SPOTIFY_CLIENT_ID,
    SPOTIFY_CLIENT_SECRET,
    SPOTIFY_REDIRECT_URI,
    SPOTIFY_SCOPE,
} from "@/app/config/spotify";
import { setAccessToken } from "@/app/lib/slices/authSlice";
import { setLoading, setQuery, setResults } from "@/app/lib/slices/searchSlice"; // Ավելացրու քո searchSlice action
import { RootState } from "@/app/lib/store";
import React, { useEffect } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import UserMenu from "../UserMenu";
import { usePathname } from "next/navigation";
import { CiSearch } from "react-icons/ci";

const Header = () => {
    const pathname = usePathname();
    const goBack = () => {
        window.history.back();
    };
    const goForward = () => {
        window.history.forward();
    };

    // Spotify Login Button
    const dispatch = useDispatch();
    const handleLogin = () => {
        const scopeParam = SPOTIFY_SCOPE.join("%20");
        const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${SPOTIFY_CLIENT_ID}&scope=${scopeParam}&redirect_uri=${SPOTIFY_REDIRECT_URI}`;
        window.location.href = authUrl; // Օգտատիրոջը ուղղում ենք Spotify-ի ավտորիզացիայի էջ
    };

    // Access Token-ի ստացում
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get("code");

        if (code) {
            const fetchAccessToken = async () => {
                const response = await fetch(
                    "https://accounts.spotify.com/api/token",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded",
                        },
                        body: new URLSearchParams({
                            grant_type: "authorization_code",
                            code: code,
                            redirect_uri: SPOTIFY_REDIRECT_URI,
                            client_id: SPOTIFY_CLIENT_ID,
                            client_secret: SPOTIFY_CLIENT_SECRET,
                        }),
                    }
                );

                if (!response.ok) {
                    console.error("Failed to fetch access token");
                    return;
                }

                const data = await response.json();
                dispatch(setAccessToken(data.access_token));
                console.log("Access Token:", data.access_token);
            };

            fetchAccessToken();
        }
    }, [dispatch]);

    const accessToken = useSelector(
        (state: RootState) => state.auth.accessToken
    );

    const { query } = useSelector((state: RootState) => state.search);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Search Query:", query);
        // Այստեղ կարող ես անել fetch, եթե անհրաժեշտ է։
        const fetchAlbums = async () => {
            dispatch(setLoading(true)); // Բեռնումի ընթացքում փոփոխում ենք loading վիճակը

            try {
                const response = await fetch(
                    `https://api.spotify.com/v1/search?q=${query}&type=album`,
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    }
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }

                const data = await response.json();
                console.log("Fetched Data:", data);

                // Համոզվիր, որ data-ի մեջ կա albums.items
                dispatch(setResults(data.albums?.items || []));
            } catch (error) {
                console.error("Error fetching albums:", error);
                dispatch(setResults([])); // Սխալի դեպքում արդյունքը դատարկ է
            } finally {
                dispatch(setLoading(false)); // Ավարտում ենք բեռնումը
            }
        };

        fetchAlbums();
        dispatch(setQuery(""));
    };

    return (
        <div className="flex justify-between w-full mb-9">
            <div className="flex items-center gap-4">
                <button
                    onClick={goBack}
                    className="w-10 h-10 bg-black flex justify-center items-center rounded-[50%]"
                >
                    <IoIosArrowBack />
                </button>
                <button
                    onClick={goForward}
                    className="w-10 h-10 bg-black flex justify-center items-center rounded-[50%]"
                >
                    <IoIosArrowForward />
                </button>
                {pathname.startsWith("/search") && (
                    <form onSubmit={handleSubmit} className="relative ">
                        <input
                            onChange={(e) => dispatch(setQuery(e.target.value))}
                            type="text"
                            value={query}
                            placeholder="Search"
                            className="w-[300px] px-6 py-1 rounded-[16px] text-black"
                        />
                        <CiSearch
                            className="absolute top-2 left-1"
                            color="black"
                        />
                    </form>
                )}
            </div>
            <div className="flex items-center gap-5">
                {accessToken ? (
                    <UserMenu />
                ) : (
                    <div className="flex gap-4">
                        <button className="border px-5 py-1 rounded-lg">
                            Sign up
                        </button>
                        <button
                            onClick={handleLogin}
                            className=" bg-white text-black px-5 py-1 rounded-lg"
                        >
                            Login
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Header;
