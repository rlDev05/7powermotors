import { useEffect, useMemo } from 'react';
import { divIcon, latLngBounds } from 'leaflet';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import type { Cr1Location } from '@/app/data/brand';

type NetworkMapProps = {
  locations: Cr1Location[];
  activeLocationId: string | null;
  onSelectLocation: (locationId: string) => void;
};

function MapViewport({
  locations,
  activeLocationId,
}: Pick<NetworkMapProps, 'locations' | 'activeLocationId'>) {
  const map = useMap();

  useEffect(() => {
    const activeLocation = locations.find((location) => location.id === activeLocationId);

    if (activeLocation) {
      map.flyTo([activeLocation.latitude, activeLocation.longitude], 16, {
        duration: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 0.8,
      });
      return;
    }

    const bounds = latLngBounds(
      locations.map((location) => [location.latitude, location.longitude] as [number, number])
    );

    map.fitBounds(bounds, {
      animate: !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
      maxZoom: 14,
      padding: [54, 54],
    });
  }, [activeLocationId, locations, map]);

  return null;
}

export function NetworkMap({ locations, activeLocationId, onSelectLocation }: NetworkMapProps) {
  const center = useMemo<[number, number]>(() => {
    const latitude =
      locations.reduce((total, location) => total + location.latitude, 0) / locations.length;
    const longitude =
      locations.reduce((total, location) => total + location.longitude, 0) / locations.length;

    return [latitude, longitude];
  }, [locations]);

  const markerIcons = useMemo(
    () =>
      new Map(
        locations.map((location) => [
          location.id,
          divIcon({
            className: `cr1-map-marker${activeLocationId === location.id ? ' is-active' : ''}`,
            html: `<span><strong>${location.label === 'Distributor' ? 'D' : 'F'}</strong></span>`,
            iconAnchor: [21, 42],
            iconSize: [42, 42],
            popupAnchor: [0, -38],
          }),
        ])
      ),
    [activeLocationId, locations]
  );

  if (!locations.length) return null;

  return (
    <MapContainer
      center={center}
      zoom={13}
      scrollWheelZoom={false}
      className="h-full w-full"
      aria-label="Interactive map of all CR-1 Philippines locations"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {locations.map((location) => (
        <Marker
          key={location.id}
          position={[location.latitude, location.longitude]}
          icon={markerIcons.get(location.id)}
          title={`${location.label}: ${location.name}`}
          alt={`${location.name} map marker`}
          eventHandlers={{ click: () => onSelectLocation(location.id) }}
        >
          <Popup>
            <div className="cr1-map-popup">
              <p>{location.label}</p>
              <strong>{location.name}</strong>
              <span>{location.address}</span>
              <a href={location.mapUrl} target="_blank" rel="noreferrer">
                Get directions
              </a>
            </div>
          </Popup>
        </Marker>
      ))}

      <MapViewport locations={locations} activeLocationId={activeLocationId} />
    </MapContainer>
  );
}
