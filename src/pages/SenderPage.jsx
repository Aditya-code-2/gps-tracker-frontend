import { useState } from "react";
import axios from "axios";

function SenderPage() {

    const [deviceId, setDeviceId] = useState("");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");

    // RANDOM DEVICE ID
    const generateId = () => {

        const randomId =
            Math.random()
                .toString(36)
                .substring(2, 8)
                .toUpperCase();

        setDeviceId(randomId);

    };

    // COPY ID
    const copyId = () => {

        navigator.clipboard.writeText(deviceId);

        alert("Device ID Copied");

    };

    // SEND LOCATION
    const sendLocation = () => {

        if (!deviceId) {

            alert("Generate Device ID First");
            return;

        }

        navigator.geolocation.getCurrentPosition(

            async (position) => {

                const lat = position.coords.latitude;
                const lng = position.coords.longitude;

                setLatitude(lat);
                setLongitude(lng);

                try {

                    await axios.post(
                        "https://gps-tracker-backend-euvg.onrender.com",
                        {
                            deviceId: deviceId,
                            latitude: lat,
                            longitude: lng
                        }
                    );

                    alert("Location Sent");

                } catch (error) {

                    console.log(error);

                    alert("Error Sending Location");

                }

            }

        );

    };

    return (

        <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-5">

            <div className="w-full max-w-lg bg-[#1e293b] rounded-3xl p-8 shadow-2xl">

                <h1 className="text-4xl font-bold text-cyan-400 text-center mb-8">
                    Sender Device
                </h1>

                <button
                    onClick={generateId}
                    className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-4 rounded-2xl text-xl mb-5"
                >
                    Generate Device ID
                </button>

                {
                    deviceId && (

                        <div className="bg-[#0f172a] border border-cyan-500 rounded-2xl p-5 mb-5">

                            <div className="text-gray-400 mb-2">
                                Device ID
                            </div>

                            <div className="text-3xl text-cyan-400 font-bold mb-4">
                                {deviceId}
                            </div>

                            <button
                                onClick={copyId}
                                className="bg-green-500 hover:bg-green-600 px-5 py-3 rounded-xl"
                            >
                                Copy ID
                            </button>

                        </div>

                    )
                }

                <button
                    onClick={sendLocation}
                    className="w-full bg-green-500 hover:bg-green-600 text-white py-4 rounded-2xl text-xl"
                >
                    Send Live Location
                </button>

                <div className="bg-[#0f172a] rounded-2xl p-5 mt-5">

                    <div className="text-gray-400">
                        Latitude
                    </div>

                    <div className="text-cyan-400 break-all mb-5">
                        {latitude}
                    </div>

                    <div className="text-gray-400">
                        Longitude
                    </div>

                    <div className="text-cyan-400 break-all">
                        {longitude}
                    </div>

                </div>

            </div>

        </div>

    );

}

export default SenderPage;