import React from 'react'
import NavOptions from '../components/NavOptions'
import tw from "tailwind-react-native-classnames"
import { SafeAreaView, View, Image } from 'react-native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { GOOGLE_MAPS_APIKEY } from "@env"
import { useDispatch } from 'react-redux'
import { setDestination, setOrigin } from '../slices/navSlice'

const HomeScreen = () => {
    const dispatch = useDispatch()

    return (
        <SafeAreaView style={tw`bg-white h-full`}>
            <View style={tw`p-5`}>
                <Image
                    style={{
                        width: 100, height: 100, resizeMode: 'contain'
                    }}
                    source={{
                        uri: "https://links.papareact.com/gzs"
                    }}
                />

                <GooglePlacesAutocomplete
                    placeholder='Where From?'
                    enablePoweredByContainer={false}
                    minLength={2}
                    styles={{
                        container: {
                            flex: 0,
                        },
                        textInput: {
                            fontSize: 16,
                        },
                    }}

                    fetchDetails={true}
                    debounce={400}
                    query={{
                        key: GOOGLE_MAPS_APIKEY,
                        language: "pt-BR"
                    }}
                    nearbyPlacesAPI='GooglePlacesSearch'
                    returnKeyType={"search"}

                    onPress={(data, details = null) => {
                        dispatch(
                            setOrigin({
                                location: details.geometry.location,
                                description: data.description
                            })
                        )

                        dispatch(setDestination(null))
                    }}
                />

            </View>
            <NavOptions></NavOptions>
        </SafeAreaView>
    )
}

export default HomeScreen