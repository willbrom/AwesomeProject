import { StatusBar } from "expo-status-bar";

import React, { useState } from "react";

import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Dimensions,
} from "react-native";
import {
  Snackbar,
  Card,
  Title,
  Button,
  Subheading,
  Paragraph,
  Searchbar,
  Banner,
  BottomNavigation,
} from "react-native-paper";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const SCREEN_WIDTH = Dimensions.get("window").width;
const Stack = createStackNavigator();

const FavouriteRoute = () => {
  const [visible, setVisible] = useState(true);
  const [textVisible, setTextVisible] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      <Banner
        visible={visible}
        actions={[
          {
            label: "Fix it",
            onPress: () => setVisible(false),
          },
          {
            label: "Learn more",
            onPress: () => setVisible(false),
          },
        ]}
        icon={({ size }) => (
          <Image
            source={{
              uri:
                "https://avatars3.githubusercontent.com/u/17571969?s=400&v=4",
            }}
            style={{
              width: size,
              height: size,
            }}
          />
        )}
      >
        “It's a dangerous business, Frodo, going out your door. You step onto
        the road, and if you don't keep your feet, there's no knowing where you
        might be swept off to.” ― J.R.R. Tolkien, The Lord of the Rings
      </Banner>
      <Searchbar style={styles.searchbar} placeholder="Search" />
      <Button
        style={{ marginTop: 10, width: 150, alignSelf: "center" }}
        mode="text"
        onPress={() => setVisible(true)}
      >
        Show Banner
      </Button>

      <View style={styles.albumContainer}>
        <Button
          style={styles.albumButton}
          mode="outlined"
          onPress={() => setTextVisible(!textVisible)}
        >
          Awesome Button
        </Button>
        {textVisible && (
          <Text style={styles.albumText}>
            “Never laugh at live dragons.” ― J.R.R. Tolkien
          </Text>
        )}
      </View>
    </View>
  );
};

const HomeRoute = () => {
  const [cardPressed, setCardPressed] = useState(false);

  const cardPara =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vel ante ut tortor tristique hendrerit in sed mi. Aenean posuere.";
  const testList = [{ key: "First" }, { key: "Second" }, { key: "Third" }];

  return (
    <FlatList
      style={styles.cardList}
      data={testList}
      renderItem={({ item }) => (
        <View>
          <Card
            style={styles.card}
            onPress={() => setCardPressed(!cardPressed)}
          >
            <Card.Cover source={{ uri: "https://picsum.photos/700" }} />
            <Card.Content>
              <Title>
                Awesome Title {cardPressed ? "pressed" : "unpressed"}{" "}
              </Title>
              <Subheading>{item.key}</Subheading>
              <Paragraph>{cardPara}</Paragraph>
            </Card.Content>
            <Card.Actions style={styles.cardAction}>
              <Button
                style={styles.cardButton}
                onPress={() => setCardPressed(!cardPressed)}
              >
                Cancel
              </Button>
              <Button style={styles.cardButton}>Ok</Button>
            </Card.Actions>
          </Card>
        </View>
      )}
    />
  );
};

const AlbumRoute = () => {
  const data = [
    { id: 0, src: "https://picsum.photos/200" },
    { id: 1, src: "https://picsum.photos/200" },
    { id: 2, src: "https://picsum.photos/200" },
    { id: 3, src: "https://picsum.photos/200" },
    { id: 4, src: "https://picsum.photos/200" },
    { id: 5, src: "https://picsum.photos/200" },
    { id: 6, src: "https://picsum.photos/200" },
    { id: 7, src: "https://picsum.photos/200" },
    { id: 8, src: "https://picsum.photos/200" },
    { id: 9, src: "https://picsum.photos/200" },
    { id: 10, src: "https://picsum.photos/200" },
    { id: 11, src: "https://picsum.photos/200" },
  ];

  return (
    <FlatList
      style={{}}
      numColumns={2}
      data={data}
      renderItem={({ item }) => (
        <Image
          style={{
            height: 150,
            width: SCREEN_WIDTH / 2 - 4,
            margin: 2,
          }}
          source={{ uri: item.src }}
        />
      )}
    />
  );
};

const App = ({ navigation }) => {
  const [visible, setVisible] = useState(true);
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "home", title: "Home", icon: "home" },
    { key: "albums", title: "Album", icon: "album" },
    { key: "favourites", title: "Favourite", icon: "heart" },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: HomeRoute,
    albums: AlbumRoute,
    favourites: FavouriteRoute,
  });

  return (
    <View style={styles.container}>
      <Snackbar
        visible={visible}
        onDismiss={() => setVisible(false)}
        action={{
          label: "Undo",
          onPress: () => {
            navigation.navigate("Home", { id: 200 });
          },
        }}
      >
        This is an Awesome Snackbar
      </Snackbar>

      <BottomNavigation
        style={styles.bottomNavigation}
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
      />

      <StatusBar style="auto" />
    </View>
  );
};

const HomeScreen = ({ route, navigation }) => {
  const { id } = route.params;

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Home Screen</Text>
      <Text>id: {id}</Text>
      <Button mode="outlined" onPress={() => navigation.navigate("Detail")}>
        Go to Details
      </Button>
    </View>
  );
};

const DetailScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Detail Screen</Text>
      <Button mode="outlined" onPress={() => navigation.popToTop()}>
        Go to Top
      </Button>
    </View>
  );
};

const Main = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="App">
        <Stack.Screen name="App" component={App} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Detail" component={DetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomNavigation: {
    flex: 1,
  },
  albumContainer: {
    flexDirection: "row",
  },
  albumButton: {
    flex: 1,
    marginHorizontal: 10,
  },
  albumText: {
    flex: 3,
  },
  text: {
    fontSize: 12,
    color: "green",
    padding: 4,
  },
  blueText: {
    color: "blue",
  },
  card: {
    marginVertical: 12,
    marginHorizontal: 22,
  },
  cardAction: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  cardButton: {
    paddingEnd: 12,
  },
  cardList: {},
  searchbar: {},
});

export default Main;
