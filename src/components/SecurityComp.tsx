import { useState } from 'react';

interface LOCObj {
  latitude: any,
  longitude: any,
  accuracy: any,
  error: any
}
const SecurityComp = () => {
  const [location, setLocation] = useState<LOCObj>({
    latitude: null,
    longitude: null,
    accuracy: null,
    error: null
  });

  const getLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
            error: null
          });
        },
        (error) => {
          setLocation({
            latitude: null,
            longitude: null,
            accuracy: null,
            error: error.message
          });
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        }
      );
    } else {
      setLocation({
        latitude: null,
        longitude: null,
        accuracy: null,
        error: "Geolocation is not supported by this browser."
      });
    }
  };
  return (
    <div>
      <button className='btn btn-primary' onClick={getLocation}>Get Location</button>
      {location.error ? (
        <p>Error: {location.error}</p>
      ) : (
        <p>
          Latitude: {location.latitude}<br />
          Longitude: {location.longitude}<br />
          Accuracy: {location.accuracy} meters
        </p>
      )}
    </div>)
}

export default SecurityComp