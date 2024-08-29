import { initMainButton } from "@telegram-apps/sdk";
import { useEffect, useState } from "react";
import axios from "axios";
import { zodiacSignsList, zodiacSignsLogo } from "../utils/constants";

const Modal = ({ sign, setSign, lang }) => {
    // States + vars
    const [signData, setSignData] = useState(null);
    const isRussian = lang == 'ru' ? true : false;

    // Tg btn
    const [mainButton] = initMainButton();
    mainButton.setParams({
        backgroundColor: '#aa1388',
        text: 'Назад',
        isVisible: true,
        isEnabled: true,
    });
    mainButton.show();
    mainButton.on('click', () => {
        setSign(null)
        mainButton.hide();
    });

    // Right swipe
    let startX;
    useEffect(() => {
        const handleTouchStart = (event) => {
            startX = event.touches[0].clientX;
        };

        const handleTouchMove = (event) => {
            const currentX = event.touches[0].clientX;
            const diffX = currentX - startX;

            if (diffX > 50) {
                setSignData(null);
                mainButton.hide();
            }
        };

        document.addEventListener("touchstart", handleTouchStart);
        document.addEventListener("touchmove", handleTouchMove);

        return () => {
            document.removeEventListener("touchstart", handleTouchStart);
            document.removeEventListener("touchmove", handleTouchMove);
        };
    }, []);

    // First render + lang swap effect
    useEffect(() => {
        const fetchSign = async (sign) => {
            try {
                const response = await axios.post("https://poker247tech.ru/get_horoscope/", {
                    sign: sign.toLowerCase(),
                    language: lang == 'ru' ? "original" : "translated",
                    period: "today"
                });

                const data = {
                    ...response.data,
                    sign: isRussian ? zodiacSignsList[sign] : sign
                };
                setSignData(data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchSign(sign);
    }, [lang]);

    return (
        <>
            {signData &&
                <div className="modal">
                    <h1>{zodiacSignsLogo[sign]} {signData.sign}</h1>
                    <span>{signData.horoscope}</span>
                </div>
            }
        </>
    )
};

export default Modal;