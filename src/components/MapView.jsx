import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";
import { useEffect } from "react";
import "leaflet/dist/leaflet.css";

const DEFAULT_LOCATION = [17.3850, 78.4867];

// Helper hook to dynamically change the center of the React Leaflet map without forcing full re-renders
function ChangeView({ center }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom(), {
      animate: true,
      duration: 1.5
    });
  }, [center, map]);
  return null;
}

function MapView({ pharmacies, userLocation }) {
  const currentLoc = userLocation || DEFAULT_LOCATION;

  return (
    <MapContainer
      center={currentLoc}
      zoom={13}
      style={{ height: "100%", width: "100%", minHeight: "400px" }}
    >
      <ChangeView center={currentLoc} />

      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* User Origin Pin */}
      <Marker position={currentLoc}>
        <Popup><b>📍 Your Live Location</b></Popup>
      </Marker>

      {pharmacies.map((p, i) => {
        const dest = [p.lat || 17.3850 + (i * 0.01), p.lng || 78.4867 - (i * 0.01)];
        return (
          <div key={i}>
            <Marker position={dest}>
              <Popup>
                <b>{p.pharmacy}</b><br/>
                Medicine: {p.medicine || 'N/A'}<br/>
                Price: ₹{p.price}<br/>
                Status: {p.status}
              </Popup>
            </Marker>
            
            <Polyline 
              positions={[currentLoc, dest]} 
              color="var(--primary)" 
              weight={4}
              opacity={0.8}
              dashArray="10, 15"
              className="animated-route"
            />
          </div>
        );
      })}

    </MapContainer>
  );
}

export default MapView;