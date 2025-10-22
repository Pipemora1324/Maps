'use client';

import React, { useEffect, useRef } from 'react';
import type { Map as LeafletMap, Polyline, Marker, LatLngExpression } from 'leaflet';

interface MapComponentProps {
  onMapClick: (latlng: { lat: number; lng: number }) => void;
  routePoints: [number, number][];
  isDark: boolean;
}

const MapComponent: React.FC<MapComponentProps> = ({ onMapClick, routePoints }) => {
  const mapRef = useRef<LeafletMap | null>(null);
  const routeLayerRef = useRef<Polyline | null>(null);
  const markersRef = useRef<Marker[]>([]);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    import('leaflet').then((L) => {
      // Tipado correcto sin usar "any"
      const iconPrototype = L.Icon.Default.prototype as unknown as {
        _getIconUrl?: () => string;
      };

      // Eliminamos el método interno si existe
      if (iconPrototype._getIconUrl) {
        delete iconPrototype._getIconUrl;
      }

      // Configuramos las imágenes de los íconos de Leaflet
      L.Icon.Default.mergeOptions({
        iconRetinaUrl:
          'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
        iconUrl:
          'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        shadowUrl:
          'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      });

      // Inicializa el mapa solo una vez
      if (!mapRef.current && mapContainerRef.current) {
        const map = L.map(mapContainerRef.current, {
          center: [1.2136, -77.2811],
          zoom: 14,
          zoomControl: true,
        });

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors',
          maxZoom: 19,
        }).addTo(map);

        // Evento de clic en el mapa
        map.on('click', (e: L.LeafletMouseEvent) => {
          onMapClick(e.latlng);
        });

        mapRef.current = map;
      }
    });

    // Cleanup al desmontar
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [onMapClick]);

  useEffect(() => {
    if (!mapRef.current || typeof window === 'undefined') return;

    import('leaflet').then((L) => {
      // Limpieza de marcadores previos
      markersRef.current.forEach((marker) => marker.remove());
      markersRef.current = [];

      if (routeLayerRef.current) {
        routeLayerRef.current.remove();
      }

      if (routePoints.length > 0) {
        routePoints.forEach((point, index) => {
          const isStart = index === 0;
          const isEnd = index === routePoints.length - 1;

          // Íconos personalizados según posición
          const icon = L.divIcon({
            className: 'custom-marker',
            html: `<div style="background-color: ${
              isStart ? '#10b981' : isEnd ? '#3b82f6' : '#f59e0b'
            }; width: ${isStart ? 16 : isEnd ? 20 : 12}px; height: ${
              isStart ? 16 : isEnd ? 20 : 12
            }px; border-radius: 50%; border: ${
              isStart || isEnd ? 3 : 2
            }px solid white;"></div>`,
            iconSize: [20, 20],
            iconAnchor: [10, 10],
          });

          const marker = L.marker(point as LatLngExpression, { icon }).addTo(mapRef.current!);
          markersRef.current.push(marker);
        });

        // Dibuja la ruta
        if (routePoints.length >= 2) {
          routeLayerRef.current = L.polyline(routePoints as LatLngExpression[], {
            color: '#f59e0b',
            weight: 6,
            opacity: 0.8,
            smoothFactor: 1,
          }).addTo(mapRef.current!);

          // Centra el mapa en la ruta
          mapRef.current!.fitBounds(routeLayerRef.current.getBounds(), { padding: [50, 50] });
        }
      }
    });
  }, [routePoints]);

  return (
    <div
      ref={mapContainerRef}
      className="w-full h-full rounded-3xl"
      style={{ minHeight: '320px' }}
    />
  );
};

export default MapComponent;
