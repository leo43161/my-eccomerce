import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { colors } from '../Global/Colors'

const ProductHighlight = ({additionalStyle = []}) => {
    return (
        <View style={[styles.containerCardHeader, additionalStyle]}>
            <View style={styles.cardHeader}>
                <View style={styles.containerContainCard}>
                    <View style={{
                        flexDirection: "row"
                    }}>
                        <View style={styles.pill}>
                            <Text style={styles.textOff}>20% Off</Text>
                        </View>
                    </View>
                    <Text style={styles.textTitle}>Best deals</Text>
                    <Text style={styles.textDescription} numberOfLines={2}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illum qui quidem rem necessitatibus debitis.</Text>
                    <Text style={styles.textMore}>Mas...</Text>
                </View>
                <View style={styles.containerImgCard}>
                    <View style={styles.imageWrapper}>
                        <Image
                            resizeMode='cover'
                            style={styles.image}
                            source={require('../Assets/Img/mueble2.png')}
                        />
                    </View>
                </View>
            </View>
        </View>
    )
}

export default ProductHighlight

const styles = StyleSheet.create({
    containerCardHeader: {
        width: "100%",
        marginBottom: 10
    },
    cardHeader: {
        backgroundColor: colors.gray100,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        padding: 8,
        flexDirection: "row"
    },
    containerContainCard: {
        flex: 3,
        padding: 10,
        justifyContent: 'space-around',
    },
    containerImgCard: {
        flex: 2,
        position: "relative",
        left: 3,
        bottom: 8
    },
    pill: {
        backgroundColor: colors.primary,
        borderColor: colors.primary,
        borderRadius: 10,
        paddingVertical: 5,
        paddingHorizontal: 7,
        marginBottom: 3
    },
    textDescription: {
        fontSize: 12,
        color: colors.gray300,
        marginVertical: 3
    },
    textTitle: {
        fontWeight: "bold",
        fontSize: 18,
    },
    textOff: {
        fontSize: 11,
        color: "white",
    },
    textMore: {
        fontWeight: "bold",
        fontSize: 12,
    },
    imageWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        height: 150,
        width: 150,
        position: "absolute",
        zIndex: 1000
    },
})