import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

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
                        "https://gps-tracker-backend-euvg.onrender.com/location",
                        {
                            deviceId: deviceId,
                            latitude: lat,
                            longitude: lng
                        }
                    );

                    alert("Location Sent Successfully");

                } catch (error) {

                    console.log(error);

                    alert("Error Sending Location");

                }

            },

            (error) => {

                console.log(error);

                alert("Location Permission Denied");

            }

        );

    };

    return (

        <div className="min-h-screen bg-black text-white flex items-center justify-center px-5 py-10 overflow-hidden relative">

            {/* BLUR EFFECTS */}
            <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-cyan-500/20 blur-[120px] rounded-full"></div>

            <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-purple-500/20 blur-[120px] rounded-full"></div>

            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="w-full max-w-xl bg-white/5 border border-white/10 backdrop-blur-2xl rounded-[40px] p-8 shadow-2xl relative z-10"
            >

                {/* TITLE */}
                <div className="text-center mb-10">

                    <p className="uppercase tracking-[5px] text-gray-400 text-sm mb-4">
                        GPS Tracker
                    </p>

                    <h1 className="text-4xl sm:text-5xl font-bold leading-tight">

                        Sender Device

                    </h1>

                </div>

                {/* GENERATE BUTTON */}
                <button
                    onClick={generateId}
                    className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-semibold py-4 rounded-2xl text-lg duration-300 hover:scale-[1.02]"
                >

                    Generate Device ID

                </button>

                {/* DEVICE ID CARD */}
                {
                    deviceId && (

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="bg-black/40 border border-cyan-400/30 rounded-[30px] p-6 mt-6"
                        >

                            <div className="text-gray-400 mb-3 text-sm uppercase tracking-[3px]">
                                Device ID
                            </div>

                            <div className="text-4xl font-bold text-cyan-400 tracking-[4px] break-all">

                                {deviceId}

                            </div>

                            <button
                                onClick={copyId}
                                className="mt-6 px-6 py-3 rounded-2xl bg-white/10 hover:bg-white/20 duration-300"
                            >

                                Copy ID

                            </button>

                        </motion.div>

                    )
                }

                {/* SEND BUTTON */}
                <button
                    onClick={sendLocation}
                    className="w-full mt-6 bg-green-500 hover:bg-green-400 text-black font-semibold py-4 rounded-2xl text-lg duration-300 hover:scale-[1.02]"
                >

                    Send Live Location

                </button>

                {/* LOCATION BOX */}
                <div className="bg-black/40 border border-white/10 rounded-[30px] p-6 mt-6">

                    <div className="mb-5">

                        <p className="text-gray-400 text-sm uppercase tracking-[3px] mb-2">
                            Latitude
                        </p>

                        <p className="text-cyan-400 break-all">
                            {latitude || "Waiting for location..."}
                        </p>

                    </div>

                    <div>

                        <p className="text-gray-400 text-sm uppercase tracking-[3px] mb-2">
                            Longitude
                        </p>

                        <p className="text-cyan-400 break-all">
                            {longitude || "Waiting for location..."}
                        </p>

                    </div>

                </div>

            </motion.div>

        </div>

    );

}

export default SenderPage;