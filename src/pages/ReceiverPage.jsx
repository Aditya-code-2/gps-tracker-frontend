import { useState, useEffect } from "react";
import axios from "axios";

import {
    MapContainer,
    TileLayer,
    Marker,
    Popup
} from "react-leaflet";

function ReceiverPage() {

    const [inputId, setInputId] = useState("");
    const [deviceId, setDeviceId] = useState("");
    const [location, setLocation] = useState(null);

    // FETCH LOCATION
    const fetchLocation = async () => {

        if (!deviceId) return;

        try {

            const response = await axios.get(
                `http://localhost:8081/location/${deviceId}`
            );

            setLocation(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    // AUTO REFRESH
    useEffect(() => {

        fetchLocation();

        const interval = setInterval(() => {

            fetchLocation();

        }, 3000);

        return () => clearInterval(interval);

    }, [deviceId]);

    return (

        <div className="min-h-screen bg-[#0f172a] p-5">

            <div className="max-w-7xl mx-auto">

                <h1 className="text-5xl font-bold text-cyan-400 text-center mb-8">
                    Receiver Dashboard
                </h1>

                {/* INPUT SECTION */}

                <div className="bg-[#1e293b] p-5 rounded-3xl flex flex-col md:flex-row gap-5 mb-5">

                    <input
                        type="text"
                        placeholder="Enter Device ID"
                        value={inputId}
                        onChange={(e) => setInputId(e.target.value)}
                        className="flex-1 bg-[#0f172a] text-white px-5 py-4 rounded-2xl outline-none border border-gray-600"
                    />

                    <button
                        onClick={() => setDeviceId(inputId)}
                        className="bg-cyan-500 hover:bg-cyan-600 px-8 py-4 rounded-2xl text-white text-lg"
                    >
                        Track Device
                    </button>

                </div>

                {/* LOCATION INFO */}

                {
                    location && (

                        <div className="bg-[#1e293b] p-5 rounded-3xl mb-5 border border-gray-700">

                            <div className="text-xl text-gray-300 mb-3">
                                Device ID:
                            </div>

                            <div className="text-cyan-400 text-2xl font-bold mb-5">
                                {deviceId}
                            </div>

                            <div className="text-xl text-gray-300 mb-3">
                                Latitude:
                            </div>

                            <div className="text-cyan-400 mb-5">
                                {location.latitude}
                            </div>

                            <div className="text-xl text-gray-300 mb-3">
                                Longitude:
                            </div>

                            <div className="text-cyan-400">
                                {location.longitude}
                            </div>

                        </div>

                    )
                }

                {/* MAP */}

                {
                    location && (

                        <div className="h-[70vh] rounded-3xl overflow-hidden border border-gray-700">

                            <MapContainer
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