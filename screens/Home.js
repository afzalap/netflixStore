import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { Title, Fab, AddIcon, Box, Center, NativeBaseProvider, Heading, List, HStack, IconButton, Text, Checkbox, Flex, Spinner, VStack } from "native-base"
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useIsFocused } from '@react-navigation/native';
import { withTheme } from 'styled-components';

const Home = ({ navigation, route }) => {

    const [ListOfSeasons, setListOfSeasons] = useState([])
    const [Loading, setLoading] = useState(false)
    const isFocused = useIsFocused()

    const getList = async () => {
        setLoading(true)

        const storedValue = await AsyncStorage.getItem('@season_List');

        if (!storedValue) {
            setListOfSeasons([])
            setLoading(false)

            return;
        }

        const list = JSON.parse(storedValue)
        setListOfSeasons(list)

        setLoading(false)
    }

    const deleteSeason = async (id) => {
        const newList = await ListOfSeasons.filter((list) => list.id !== id)
        await AsyncStorage.setItem('@season_List', JSON.stringify(newList));

        setListOfSeasons(newList)
    }

    const markComplete = async (id) => {
        const newArr = ListOfSeasons.map((list) => {
            if (list.id == id) {
                list.isWatched = !(list.isWatched)
            }
            return list
        })

        await AsyncStorage.setItem('@season_List', JSON.stringify(newArr));
        setListOfSeasons(newArr)
    }

    useEffect(
        () => {
            getList();
        }, [isFocused]
    )

    if (Loading) {
        return (
            <NativeBaseProvider>
                <View style={styles.emptyContainer}>
                    <Center>
                        <Spinner />
                    </Center>
                </View>
            </NativeBaseProvider>
        )
    }

    return (
        <NativeBaseProvider>
            <ScrollView style={styles.container}>
                <View >
                    {ListOfSeasons.length == 0 ? (
                        <Heading style={styles.heading}>
                            WatchList is empty. Please add a season
                        </Heading>
                    ) : (
                        <>
                            <Heading style={styles.heading}>
                                Next Series to watch
                            </Heading>
                            {/* <List> */}
                            <VStack>
                                {ListOfSeasons.map((season) => (
                                    // <List.Item key={season.id} >
                                    <>
                                        <HStack
                                            // style={styles.border}
                                            w="100%"
                                            justifyContent="space-around"
                                            alignItems="center"
                                            p={5}
                                        >
                                            <Checkbox size="lg"
                                                accessible={true}
                                                onChange={() => markComplete(season.id)}
                                                isChecked={season.isWatched}
                                            // onPress={()=>markComplete(season.id)}
                                            />
                                            <IconButton
                                                icon={<Icon name="pencil" size={30} color="#00b7c2" />}
                                                onPress={() => {
                                                    navigation.navigate('Edit', { season })
                                                }}
                                            />
                                            <Flex >
                                                <Center>
                                                    <Text
                                                        m={0}
                                                        style={styles.heading}>
                                                        {season.name}
                                                    </Text>
                                                    <Text
                                                        style={styles.subtitle}
                                                        sb
                                                        color={"white"}
                                                    >
                                                        {season.totalNoSeason} seasons to watch
                                                    </Text>
                                                </Center>
                                            </Flex>
                                            <IconButton
                                                icon={<Icon name="trash" size={35} color="#00b7c2" />}
                                                onPress={() => deleteSeason(season.id)}
                                            />
                                        </HStack>
                                        <View style={styles.divider} />
                                    </>
                                    // </List.Item>
                                ))}
                            </VStack>
                            {/* </List> */}
                        </>
                    )}
                    <Fab
                        position="absolute"
                        size="sm"
                        icon={<AddIcon size="xs" />}
                        onPress={() => navigation.navigate('Add')}
                    />
                </View>
            </ScrollView>
        </NativeBaseProvider>
    )
};

export default Home;

const styles = StyleSheet.create({
    emptyContainer: {
        backgroundColor: '#0D0D0D',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        backgroundColor: '#0D0D0D',
        flex: 1,
    },
    heading: {
        fontSize: 18,
        textAlign: 'center',
        color: '#00b7c2',
        marginVertical: 15,
        marginHorizontal: 5,
    },
    actionButton: {
        marginLeft: 5,
    },
    seasonName: {
        color: '#fdcb9e',
        textAlign: 'justify',
    },
    listItem: {
        marginLeft: 0,
        marginBottom: 20,
    },
    subtitle: {
        fontSize: 13,
        opacity: 0.8
    },
    divider: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: "#CAD5E2",
        opacity: 0.9,
        marginHorizontal: 30
    }
});
