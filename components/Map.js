import { StyleSheet, Text, View } from 'react-native'
import React, { useRef, useEffect } from 'react'
import MapView, { Marker } from 'react-native-maps'
import tw from 'tailwind-react-native-classnames'
import { useDispatch, useSelector } from 'react-redux'
import { selectOrigin, selectDestination, setTravelTimeInformation } from '../slices/navSlice'
import MapViewDirections from 'react-native-maps-directions'
import { GOOGLE_MAPS_APIKEY, GOOGLE_MAPS_URL } from "@env"

const Map = () => {
    const origin = useSelector(selectOrigin)
    const destination = useSelector(selectDestination)
    const mapRef = useRef(null)
    const dispatch = useDispatch()

    useEffect(() => {
        if (!origin || !destination) return;

        //zoom and fit to markers
        mapRef.current.fitToSuppliedMarkers(['origin', 'destination'], {
            edgePadding: {
                top: 50,
                right: 50,
                bottom: 50,
                left: 50,
            }
        })
    }, [origin, destination])

    // calc travel time
    useEffect(() => {
        if (!origin || !destination) return;

        const getTravelTime = () => {
            const url = GOOGLE_MAPS_URL
                .replace("$GOOGLE_MAPS_APIKEY", GOOGLE_MAPS_APIKEY)
                .replace("$ORIGIN", `"${origin.description}"`)
                .replace("$DESTINATION", `"${destination.description}"`)

            if (!url) throw new Error('Could not find GOOGLE_MAPS_URL')

            fetch(url)
                .then(res => res.json())
                .then((data) => {
                    console.log(data.rows[0].elements[0])
                    dispatch(setTravelTimeInformation(data.rows[0].elements[0]))
                })
        }
        getTravelTime()
    }, [origin, destination, GOOGLE_MAPS_APIKEY])

    return (
        <MapView
            ref={mapRef}
            style={tw`flex-1`}
            initialRegion={{
                latitude: origin.location.lat,
                longitude: origin.location.lng,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005
            }}
        >
            {origin && destination && (
                <MapViewDirections
                    origin={origin.description}
                    destination={destination.description}
                    apikey={GOOGLE_MAPS_APIKEY}
                    strokeWidth={3}
                    strokeColor="black"
                />
            )}

            {origin?.location && (
                <Marker
                    coordinate={{
                        latitude: origin.location.lat,
                        longitude: origin.location.lng,
                    }}
                    title="Origin"
                    description={origin.description}
                    identifier="origin"
                />
            )}

            {destination?.location && (
                <Marker
                    coordinate={{
                        latitude: destination.location.lat,
                        longitude: destination.location.lng,
                    }}
                    title="Destination"
                    description={destination.description}
                    identifier="destination"
                />
            )}
        </MapView>
    )
}

export default Map

const styles = StyleSheet.create({})