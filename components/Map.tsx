"use client"

import L from 'leaflet'
import { MapContainer , Marker, TileLayer} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import marker2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'
import { MapProps } from '@/types/types'

// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
    iconUrl: markerIcon.src,
    iconRetinaUrl: marker2x.src,
    shadowUrl: markerShadow.src
})
const Map = ({center}: MapProps) => {
    const url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

  return (
    <MapContainer zoom={center ? 4 : 2}
    scrollWheelZoom={false}
    className='h-[35vh] rounded-lg'
     center={center as L.LatLngExpression || [51, -0.09]}>
          <TileLayer
          url={url}
        />
        {
          center && (
            <Marker position={center as L.LatLngExpression}/>
          )
        }
    </MapContainer>
  )
}

export default Map