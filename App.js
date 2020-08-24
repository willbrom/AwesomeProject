import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';

import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
import { Snackbar, Card, Title, Button, Subheading, Paragraph, Searchbar, Banner } from "react-native-paper";

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const App = ({ navigation }) => {
  const [visible, setVisible] = useState(true);
  const [cardPressed, setCardPressed] = useState(false);

  const cardPara = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vel ante ut tortor tristique hendrerit in sed mi. Aenean posuere.";
  const testList = [{ key: 'First' }, { key: 'Second'} , { key: 'Third'}];

  return (
    <View style={styles.container}>
      <Banner
        visible={visible}
        actions={[
          {
            label: 'Fix it',
            onPress: () => setVisible(false),
          },
          {
            label: 'Learn more',
            onPress: () => setVisible(false),
          },
        ]}
        icon={({size}) => (
          <Image
            source={{
              uri: 'https://avatars3.githubusercontent.com/u/17571969?s=400&v=4',
            }}
            style={{
              width: size,
              height: size,
            }}
          />
        )}>
        There was a problem processing a transaction on your credit card.
      </Banner>

      <Searchbar 
        style={styles.searchbar}
        placeholder="Search" />

      <Button 
        style={styles.button}
        mode="contained"
        onPress={() => setVisible(true)}>
        Awesome Button
      </Button>
    
      <FlatList
        style={styles.cardList}
        data={testList}
        renderItem={({item}) =>
        <View>
          <Card 
            style={styles.card} 
            onPress={() => setCardPressed(!cardPressed)}>
            <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
            <Card.Content>
              <Title>Awesome Title {cardPressed ? 'pressed' : 'unpressed'} </Title>
              <Subheading>{item.key}</Subheading>
              <Paragraph>{cardPara}</Paragraph>
            </Card.Content>
            <Card.Actions style={styles.cardAction}>
              <Button 
                style={styles.cardButton}
                onPress={() => setCardPressed(!cardPressed)}>
                Cancel
              </Button>
              <Button style={styles.cardButton}>Ok</Button>
            </Card.Actions>
          </Card>
        </View>
      } />

      <Snackbar
        visible={visible}
        onDismiss={() => setVisible(false)}
        action={{
          label: 'Undo',
          onPress: () => { navigation.navigate('Home', {id: 200}) }
        }}>
        This is an Awesome Snackbar
      </Snackbar>

      <StatusBar style="auto" />
    </View>
  );
}

const HomeScreen = ({ route, navigation }) => {
  const { id } = route.params;
  
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Home Screen</Text>
      <Text>id: {id}</Text>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate('Detail')}>
        Go to Details
      </Button>
    </View>
  );
}

const DetailScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Detail Screen</Text>
      <Button
        mode="outlined"
        onPress={() => navigation.popToTop()}>
        Go to Top
      </Button>
    </View>
  );
}

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
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  button: {
    width: 200,
    marginVertical: 10
  },
  text: {
    fontSize: 12,
    color: "green",
    padding: 4
  },
  blueText: {
    color: "blue"
  },
  card: {
    marginVertical: 12,
    marginHorizontal: 22
  },
  cardAction: { 
    display: "flex", 
    flexDirection: "row", 
    justifyContent: "flex-end" 
  },
  cardButton: {
    paddingEnd: 12,
  },
  cardList: {
  },
  searchbar: {

  }
});

export default Main;