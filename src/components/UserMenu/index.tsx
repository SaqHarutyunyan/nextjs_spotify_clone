import { logout, setUser } from "@/app/lib/slices/authSlice";
import { RootState } from "@/app/lib/store";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoIosArrowForward, IoIosArrowUp } from "react-icons/io";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const UserMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();
    const toggleMenu = () => setIsOpen((prev) => !prev);

    const accessToken = useSelector(
        (state: RootState) => state.auth.accessToken
    );
    const userData = useSelector((state: RootState) => state.auth.user);

    useEffect(() => {
        // Выполняем запрос, только если данных пользователя нет
        if (accessToken && !userData) {
            fetch("https://api.spotify.com/v1/me", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
                .then((res) => res.json())
                .then((data) => dispatch(setUser(data)))
                .catch((error) =>
                    console.error("Failed to fetch user data:", error)
                );
        }
    }, [accessToken, userData, dispatch]); // Добавляем зависимости

    return (
        <div className="relative inline-block text-left z-50">
            {/* User button */}
            <div
                className="flex items-center cursor-pointer space-x-2 p-2 bg-black rounded-3xl"
                onClick={toggleMenu}
                aria-expanded={isOpen}
            >
                <Image
                    width={37}
                    height={37}
                    alt={"User Avatar"} // Dynamic image source
                    src={userData?.images?.[0]?.url || "/default-avatar.jpg"}
                    className="w-8 h-8 rounded-full"
                />
                <span className="text-white font-medium">
                    {userData?.display_name || "Guest"}
                </span>
                <IoIosArrowUp
                    className={`w-4 h-4 text-white transition-transform ${
                        isOpen ? "rotate-0" : "rotate-180"
                    }`}
                />
            </div>

            {/* Dropdown menu */}
            {isOpen && (
                <div className="absolute overflow-hidden right-0 mt-2 w-56 bg-[#1e1e1e] text-white rounded-lg shadow-lg">
                    <div className="">
                        <Link
                            href={userData?.external_urls?.spotify || ""}
                            className="flex items-center justify-between px-4 py-2 hover:bg-[#2c2c2c] text-white"
                        >
                            Account
                            <IoIosArrowForward />
                        </Link>
                        <a
                            href={userData?.external_urls?.spotify || ""}
                            className="block px-4 py-2 hover:bg-[#2c2c2c] text-white"
                        >
                            Profile
                        </a>
                        <button
                            className="block w-full text-left px-4 py-2 hover:bg-[#2c2c2c] text-white"
                            onClick={() => dispatch(logout())}
                        >
                            Log out
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserMenu;
