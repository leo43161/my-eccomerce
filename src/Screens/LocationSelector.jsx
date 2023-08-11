import { StyleSheet, Text, View, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as Location from 'expo-location';
import { usePostUserLocationMutation } from '../Services/shopServices';
import { useDispatch, useSelector } from 'react-redux';
import { setUserLocation } from '../Features/user/userSlice';
import { colors } from '../Global/Colors';
import MapPreview from '../Components/MapPreview';
import { google_maps_api_key } from '../DataBase/firebaseConfig';

const LocationSelector = ({navigation}) => {
    const [location, setLocation] = useState({ latitude: "", longitude: "" });
    const [address, setAddress] = useState("");
    const [error, setError] = useState("");

    const [triggerPostUserLocation, resultPostUserLocation] = usePostUserLocationMutation();
    const { localId } = useSelector(state => state.userReducer.value)
    const dispatch = useDispatch();

    const setUserAddress = () => {
        const _location = {
            latitude: location.latitude,
            longitude: location.longitude,
            address
        }
        dispatch(setUserLocation(_location));
        triggerPostUserLocation({
            localId,
            location: _location
        })
        console.log(resultPostUserLocation)
        navigation.goBack();
    }

    useEffect(() => {
        (async () => {
            try {
                const { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== "granted") {
                    setError("Permission to access location was denied");
                    setLocation(null)
                    return;
                }
                const locationGps = await Location.getCurrentPositionAsync();
                setLocation({
                    latitude: locationGps.coords.latitude,
                    longitude: locationGps.coords.longitude,
                });
            } catch (error) {
                console.log(error.message);
                setError(error.message)
            }
        })()
    }, [])
    useEffect(() => {
        (async () => {
            try {
                if (location.latitude) {
                    const url_reverse_geocode = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.latitude},${location.longitude}&key=${google_maps_api_key}`;
                    const response = await fetch(url_reverse_geocode);
                    const data = await response.json();
                    setAddress(data.results[0].formatted_address);
                }
            } catch (error) {
                setError(error.message)
            }
        })()
    }, [location])
    return (
        <View style={styles.container}>
            <Text
                style={styles.text}
            >My Address</Text>
            {location ? (
                <>
                    <Text style={styles.text}>
                        Lat: {location.latitude}, long: {location.longitude}.
                    </Text>
                    <MapPreview location={location}></MapPreview>
                    <Text style={styles.address}>
                        Formatted address: {address}
                    </Text>
                    <Pressable onPress={setUserAddress} style={styles.button}>
                        <Text style={styles.buttonText}>Confirm address</Text>
                    </Pressable>
                </>
            ) : (
                <>
                    <View style={styles.noLocationContainer}>
                        <Text>{error}</Text>
                    </View>
                </>
            )}
        </View>
    )
}

export default LocationSelector

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
        backgroundColor: colors.light
    },
    text: {
        paddingTop: 20,
        fontFamily: 'BROmega',
        fontSize: 18
    },
    address: {
        paddingTop: 10,
        fontFamily: 'BROmega',
        fontSize: 16
    },
    button: {
        alignItems: "center",
        backgroundColor: colors.primary,
        borderRadius: 15,
        paddingVertical: 15,
        paddingHorizontal: 10
    },
    buttonText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "white",
    }
})