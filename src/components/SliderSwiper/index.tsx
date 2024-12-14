import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Navigation, Pagination } from "swiper/modules";
import Albums from "../Albums"; // Եթե Albums է կոչվող կոմպոնենտը

interface Album {
    id: string;
    name: string;
    imageUrl: string;
}

interface SliderSwiperProps {
    albums: Album[];
}

export default function SliderSwiper({ albums }: SliderSwiperProps) {
    return (
        <div className="w-full absolute">
            <Swiper
                slidesPerView={6}
                spaceBetween={20}
                navigation
                modules={[Pagination, Navigation]}
                className="mySwiper"
            >
                {albums?.map((album: Album) => {
                    return (
                        <SwiperSlide key={album.id}>
                            <Albums album={album} />
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </div>
    );
}
