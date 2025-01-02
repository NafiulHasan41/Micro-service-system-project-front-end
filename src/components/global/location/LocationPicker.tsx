"use client";

import React, { useState, useRef } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const libraries: ('places' | 'drawing' | 'visualization')[] = ['places'];

const LocationPicker = ({
  onLocationChange,
}: {
  onLocationChange: (lat: number, lng: number) => void;
}) => {
  const [position, setPosition] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const mapRef = useRef<google.maps.Map | null>(null);
  const searchBoxRef = useRef<HTMLInputElement | null>(null);

  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      const lat = e.latLng.lat();
      const lng = e.latLng.lng();
      setPosition({ lat, lng });
      onLocationChange(lat, lng);
    }
  };

  const handlePlaceSelect = () => {
    if (searchBoxRef.current) {
      const autocomplete = new google.maps.places.Autocomplete(
        searchBoxRef.current
      );
      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        if (place.geometry && place.geometry.location) {
          const lat = place.geometry.location.lat();
          const lng = place.geometry.location.lng();
          setPosition({ lat, lng });
          onLocationChange(lat, lng);
          mapRef.current?.panTo({ lat, lng }); // Center map to the selected location
        }
      });
    }
  };

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_API_URL_GOOGLE_MAPS || " "} libraries={libraries }>
      <div>
        {/* Search Box */}
        <input
          ref={searchBoxRef}
          type="text"
          placeholder="Search location"
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
            fontSize: "16px",
          }}
          onFocus={handlePlaceSelect}
        />
        {/* Map */}
        <GoogleMap
          center={position || { lat: 23.8103, lng: 90.4125 }} // Default to Dhaka
          zoom={12}
          mapContainerStyle={{ height: "400px", width: "100%" }}
          onClick={handleMapClick}
          onLoad={(map) => {
            mapRef.current = map; // Corrected callback to avoid return value
          }}
        >
          {position && <Marker position={position} />}
        </GoogleMap>
      </div>
    </LoadScript>
  );
};

export default LocationPicker;
