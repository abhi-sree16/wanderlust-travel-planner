import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import type { Destination } from '@/lib/types';

delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown })._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

export default function MapView({
  dest,
  className = '',
}: {
  dest: Destination;
  className?: string;
}) {
  if (dest.latitude == null || dest.longitude == null) return null;

  const position: [number, number] = [dest.latitude, dest.longitude];

  return (
    <div className={className} data-testid="map-view">
      <MapContainer center={position} zoom={6} scrollWheelZoom={false} className="h-full w-full">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position}>
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
