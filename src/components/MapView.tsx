import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import type { Destination } from '@/lib/types';

export default function MapView({
  dest,
  className = '',
}: {
  dest: Destination;
  className?: string;
}) {
  if (dest.latitude == null || dest.longitude == null) return null;

  return (
    <div className={`overflow-hidden rounded-3xl ${className}`} data-testid="map-view">
      <MapContainer
        center={[dest.latitude, dest.longitude]}
        zoom={6}
        scrollWheelZoom={false}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={[dest.latitude, dest.longitude]}>
          <Popup>
            <strong>{dest.name}</strong>
            <br />
            {dest.country}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
