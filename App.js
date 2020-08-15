import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { Snackbar, Button, Card, Title, Subheading, Paragraph } from "react-native-paper";

export default function App() {
  const [visible, setVisible] = useState(false);
  const [cardPressed, setCardPressed] = useState(false);

  const cardPara = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vel ante ut tortor tristique hendrerit in sed mi. Aenean posuere.";
  const testList = ['First', 'Second', 'Third'];

  return (
    <View style={styles.container}>
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
              <Subheading>{item}</Subheading>
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
          onPress: () => {}
        }}>
        This is an Awesome Snackbar
      </Snackbar>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 22
  },
  button: {
    width: 200,
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
  }
});
