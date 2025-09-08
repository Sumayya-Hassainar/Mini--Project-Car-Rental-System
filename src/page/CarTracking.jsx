import React, { useEffect, useState } from "react";

function CarTracking() {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const checkLocation = () => {
      const stored = localStorage.getItem("carLocation");
      if (stored) {
        setLocation(JSON.parse(stored));
      }
    };

    // check every 3s for updates
    const interval = setInterval(checkLocation, 3000);
    checkLocation();

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Track Your Car 🚗</h1>

      {location ? (
        <>
          <p className="mb-3 text-green-600">
            Current Location: {location.lat}, {location.lng}
          </p>

          {/* Google Maps Embed */}
          <iframe
            title="car-location"
            width="100%"
            height="400"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            src={`https://www.google.com/maps?q=${location.lat},${location.lng}&z=14&output=embed`}
          ></iframe>
        </>
      ) : (
        <p className="text-black">Waiting for agency to start sharing...</p>
      )}
    </div>
  );
}

export default CarTracking;
