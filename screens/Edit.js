import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, ScrollView, View, ToastAndroid } from 'react-native'
import { Container, FormControl, Item, Input, Button, Heading, NativeBaseProvider, Center, useToast } from 'native-base'
import shortid from 'shortid'
import AsyncStorage from '@react-native-community/async-storage'
import Snackbar from 'react-native-snackbar'



const Edit = ({ navigation, route }) => {
    
    const [name, setName] = useState('')
    const [totalNoSeason, setTotalNoSeason] = useState('');
    const [id, setId] = useState(null);

    const update = async () => {
        try {
            if (!name || !totalNoSeason) {
                Snackbar.show({
                    text: 'Please add both the feilds',
                    duration: Snackbar.LENGTH_SHORT,
                });

                return;
            }

            const seasonToUpdate = {
                id,
                name,
                totalNoSeason,
                isWatched: false,
            }

            const storedValue = await AsyncStorage.getItem("@season_List")
            const List = await JSON.parse(storedValue)

            List.map((singleSeason) => {
                if (singleSeason.id == id) {
                    singleSeason.name = name
                    singleSeason.totalNoSeason = totalNoSeason
                }

                return singleSeason;
            })

            await AsyncStorage.setItem('@season_List', JSON.stringify(List))

            navigation.navigate('Home')
        }
        catch (error) {
            Snackbar.show({
                text: error,
                duration: Snackbar.LENGTH_SHORT,
            });
        }
    }

        useEffect(() => {
            const { season } = route.params
            const { id, name, totalNoSeason } = season
        
            setId(id)
            setName(name)
            setTotalNoSeason(totalNoSeason)

        }, [])
    

        return (
            <NativeBaseProvider>
                <ScrollView contentContainerStyle={styles.container}>
                    <Heading style={styles.heading}>Add  to watch List</Heading>
                    <Center>
                        <View style={styles.formItem}>
                            <Input
                                color="white"
                                placeholder="Total No.Of Seasons"
                                value={name}
                                onChangeText={(text) => setName(text)}
                            />
                        </View>

                        <View style={styles.formItem}>
                            <Input
                                color="white"
                                placeholder="Total No.Of Seasons"
                                keyboardType="numeric"
                                value={totalNoSeason}
                                onChangeText={(text) => setTotalNoSeason(text)}
                            />
                        </View>
                        <Button style={{ width: '90%' }}
                            onPress={update}
                        > update </Button>
                    </Center>
                </ScrollView>
            </NativeBaseProvider>
        )
}

export default Edit;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#0D0D0D',
        flex: 1,
        justifyContent: 'flex-start',
    },
    heading: {
        textAlign: 'center',
        color: '#00b7c2',
        marginHorizontal: 5,
        marginTop: 50,
        marginBottom: 20,
    },
    formItem: {
        marginBottom: 20,
        width: "90%"
    },
    input: {
        color: "#fff"
    }
});