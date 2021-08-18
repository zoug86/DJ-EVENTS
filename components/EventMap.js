import Image from 'next/image'
import { useState, useEffect } from 'react'
import Geocode from 'react-geocode'
import ReactMapGl, { Marker } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

export default function EventMap({ evt }) {
    const [lat, setLat] = useState(null)
    const [lng, setLng] = useState(null)
    const [loading, setLoading] = useState(true)
    const [viewport, setViewport] = useState({
        width: '100%',
        height: '500px',
        latitude: 37.7577,
        longitude: -122.4376,
        zoom: 12,
        //style: 'mapbox://styles/mapbox/streets-v11'
    });

    useEffect(() => {

        Geocode.fromAddress(evt.address).then(
            (response) => {
                const { lat, lng } = response.results[0].geometry.location;
                setLat(lat)
                setLng(lng)
                setViewport({ ...viewport, latitude: lat, longitude: lng })
                setLoading(false)
            },
            (error) => {
                console.error(error);
            }
        );

    }, [])

    // set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
    Geocode.setApiKey(process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY);

    if (loading) {
        return false
    }

    return (
        <ReactMapGl
            {...viewport}
            mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
            onViewportChange={nextViewport => setViewport(nextViewport)}>
            <Marker key={evt.id} latitude={lat} longitude={lng}>
                <Image src='/images/pin.svg' width={30} height={30} />
            </Marker>
        </ReactMapGl>
    )
}
