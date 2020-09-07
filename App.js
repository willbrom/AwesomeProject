import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";

import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Dimensions,
  TouchableHighlight,
  TouchableWithoutFeedback,
  TouchableOpacity,
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

const ALBUM_DATA = require("./data/album.json");

const CustomeButton = (props) => {
  return (
    <TouchableHighlight
      style={styles.touchableHighlight}
      underlayColor="darkseagreen"
      onPressIn={() => props.showTextCallback(true)}
      onPressOut={() => props.showTextCallback(false)}
    >
      <View style={{}}>
        <Text
          style={{ color: props.color, letterSpacing: 2, fontWeight: "bold" }}
        >
          {props.text.toUpperCase()}
        </Text>
      </View>
    </TouchableHighlight>
  );
};

const FavouriteRoute = () => {
  const [visible, setVisible] = useState(true);
  const [textVisible, setTextVisible] = useState(false);
  const [quoteVisible, setQuoteVisible] = useState(false);
  const [changingText, setChangingText] = useState(
    "This changes with the search value"
  );

  let searchbarRef = React.createRef();

  const fantasyQuote =
    "“The moment you doubt whether you can fly, you cease for ever to be able to do it.” ― J. M. Barrie, Peter Pan";

  return (
    <TouchableHighlight
      style={{ flex: 1 }}
      underlayColor="transparent"
      onPress={() => searchbarRef.blur()}
    >
      <View>
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
          the road, and if you don't keep your feet, there's no knowing where
          you might be swept off to.” ― J.R.R. Tolkien, The Lord of the Rings
        </Banner>
        <Searchbar
          style={styles.searchbar}
          placeholder="Search"
          ref={(r) => (searchbarRef = r)}
          onChangeText={(q) => setChangingText(q)}
        />
        <Button
          style={{ marginTop: 10, width: 150, alignSelf: "center" }}
          mode="text"
          onPress={() => setVisible(true)}
        >
          Show Banner
        </Button>

        <View style={styles.favButtons}>
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

        <CustomeButton
          text="Fantasy Quote"
          color="green"
          showTextCallback={setQuoteVisible}
        />

        <Text style={{ marginHorizontal: 10 }}>
          {quoteVisible ? fantasyQuote : ""}
        </Text>

        <Text style={{ marginVertical: 10, marginHorizontal: 10 }}>
          {changingText}
        </Text>
      </View>
    </TouchableHighlight>
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

const App = ({ navigation }) => {
  const [visible, setVisible] = useState(false);
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

const Album = ({ navigation }) => {
  const data = ALBUM_DATA.data;

  return (
    <FlatList
      style={{}}
      numColumns={2}
      data={data}
      renderItem={({ item }) => (
        <TouchableHighlight
          underlayColor="transparent"
          onPress={() => {
            console.log(item.id);
            navigation.navigate("ImageDetail", {
              title: item.title,
              detail: item.detail,
              src: item.src,
            });
          }}
        >
          <Image
            style={{
              height: 150,
              width: SCREEN_WIDTH / 2 - 4,
              margin: 2,
            }}
            source={{ uri: item.src }}
          />
        </TouchableHighlight>
      )}
    />
  );
};

const ImageDetail = ({ route, navigation }) => {
  const { detail, src } = route.params;
  return (
    <View
      style={{
        flex: 1,
        padding: 12,
        alignItems: "center",
      }}
    >
      <Image
        style={{
          height: 300,
          width: 300,
        }}
        source={{ uri: src }}
      />
      <Paragraph style={{}}>{detail}</Paragraph>
    </View>
  );
};

const AlbumRoute = (props) => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Album">
        <Stack.Screen
          name="Album"
          component={Album}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ImageDetail"
          component={ImageDetail}
          options={({ route }) => ({ title: route.params.title })}
        />
      </Stack.Navigator>
    </NavigationContainer>
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
    marginTop: 20,
  },
  bottomNavigation: {
    flex: 1,
  },
  favButtons: {
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
  touchableHighlight: {
    height: 38,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "lightgray",
    borderRadius: 7,
    marginHorizontal: 20,
    marginVertical: 5,
  },
});

export default App;
