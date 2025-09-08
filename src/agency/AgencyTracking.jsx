import React, { useEffect, useState } from "react";

function AgencyTracking() {
  const [location, setLocation] = useState(null);
  const [watchId, setWatchId] = useState(null);

  // Start sharing location
  const startSharing = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported in this browser.");
      return;
    }

    const id = navigator.geolocation.watchPosition(
      (pos) => {
        const newLocation = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };
        setLocation(newLocation);

        // Save to localStorage so user can read it
        localStorage.setItem("carLocation", JSON.stringify(newLocation));
      },
      (err) => {
        alert("Failed to fetch location: " + err.message);
      },
      { enableHighAccuracy: true }
    );

    setWatchId(id);
  };

  // Stop sharing location
  const stopSharing = () => {
    if (watchId) {
      navigator.geolocation.clearWatch(watchId);
      setWatchId(null);
      localStorage.removeItem("carLocation");
      alert("Stopped sharing location.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Agency Car Location Sharing</h1>

      <div className="space-x-4">
        {!watchId ? (
          <button
            onClick={startSharing}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Start Sharing Location
          </button>
        ) : (
          <button
            onClick={stopSharing}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
          >
            Stop Sharing Location
          </button>
        )}
      </div>

      {location && (
        <p className="mt-4 text-green-600">
          Current Location: {location.lat}, {location.lng}
        </p>
      )}
    </div>
  );
}

export default AgencyTracking;
