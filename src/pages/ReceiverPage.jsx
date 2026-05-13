import { useState, useEffect } from "react";
import axios from "axios";

import {
    MapContainer,
    TileLayer,
    Marker,
    Popup
} from "react-leaflet";

import { motion } from "framer-motion";

function ReceiverPage() {

    const [inputId, setInputId] = useState("");
    const [deviceId, setDeviceId] = useState("");
    const [location, setLocation] = useState(null);

    // FETCH LOCATION
    const fetchLocation = async () => {

        if (!deviceId) return;

        try {

            const response = await axios.get(
                `https://gps-tracker-backend-euvg.onrender.com/location/${deviceId}`
            );

            setLocation(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    // AUTO REFRESH
    useEffect(() => {

        if (!deviceId) return;

        fetchLocation();

        const interval = setInterval(() => {

            fetchLocation();

        }, 3000);

        return () => clearInterval(interval);

    }, [deviceId]);

    return (

        <div className="min-h-screen bg-black text-white px-5 py-10 relative overflow-hidden">

            {/* BLURS */}
            <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-cyan-500/20 blur-[120px] rounded-full"></div>

            <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-purple-500/20 blur-[120px] rounded-full"></div>

            <div className="max-w-7xl mx-auto relative z-10">

                {/* HEADING */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="text-center mb-10"
                >

                    <p className="uppercase tracking-[5px] text-gray-400 text-sm mb-4">
                        GPS Tracker
                    </p>

                    <h1 className="text-4xl sm:text-6xl font-bold">

                        Receiver Dashboard

                    </h1>

                </motion.div>

                {/* INPUT BOX */}
                <div className="bg-white/5 border border-white/10 backdrop-blur-2xl rounded-[35px] p-5 flex flex-col md:flex-row gap-5 mb-6">

                    <input
                        type="text"
                        placeholder="Enter Device ID"
                        value={inputId}
                        onChange={(e) => setInputId(e.target.value)}
                        className="flex-1 bg-black/40 border border-white/10 rounded-2xl px-5 py-4 outline-none"
                    />

                    <button
                        onClick={() => setDeviceId(inputId)}
                        className="bg-cyan-500 hover:bg-cyan-400 text-black font-semibold px-8 py-4 rounded-2xl duration-300"
                    >

                        Track Device

                    </button>

                </div>

                {/* LOCATION INFO */}
                {
                    location && (

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="bg-white/5 border border-white/10 backdrop-blur-2xl rounded-[35px] p-6 mb-6"
                        >

                            <div className="grid md:grid-cols-3 gap-6">

                                <div>

                                    <p className="text-gray-400 uppercase tracking-[3px] text-sm mb-2">
                                        Device ID
                                    </p>

                                    <h1 className="text-cyan-400 text-2xl font-bold">
                                        {deviceId}
                                    </h1>

                                </div>

                                <div>

                                    <p className="text-gray-400 uppercase tracking-[3px] text-sm mb-2">
                                        Latitude
                                    </p>

                                    <h1 className="text-cyan-400 break-all">
                                        {location.latitude}
                                    </h1>

                                </div>

                                <div>

                                    <p className="text-gray-400 uppercase tracking-[3px] text-sm mb-2">
                                        Longitude
                                    </p>

                                    <h1 className="text-cyan-400 break-all">
                                        {location.longitude}
                                    </h1>

                                </div>

                            </div>

                        </motion.div>

                    )
                }

                {/* MAP */}
                {
                    location && (

                        <div className="h-[70vh] rounded-[35px] overflow-hidden border border-white/10 shadow-2xl">

                            <MapContainer
                                key={`${location.latitude}-${location.longitude}`}
                                center={[
                                    location.latitude,
                                    location.longitude
                                ]}
                                zoom={15}
                                style={{
                                    height: "100%",
                                    width: "100%"
                                }}
                            >

                                <TileLayer
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />

                                <Marker
                                    position={[
                                        location.latitude,
                                        location.longitude
                                    ]}
                                >

                                    <Popup>
                                        Live Device Location
                                    </Popup>

                                </Marker>

                            </MapContainer>

                        </div>

                    )
                }

            </div>

        </div>

    );

}

export default ReceiverPage;