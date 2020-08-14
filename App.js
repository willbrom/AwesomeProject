import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { Snackbar, Button, Card, Title, Paragraph } from "react-native-paper";

export default function App() {
  const [visible, setVisible] = useState(false);
  const [undo, setUndo] = useState(false);
  const [someText, setSomeText] = useState('Some Text');
  const [cardPressed, setCardPressed] = useState(false);

  const cardPara = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vel ante ut tortor tristique hendrerit in sed mi. Aenean posuere.";

  return (
    <View style={styles.container}>
      <Button 
        style={styles.button}
        mode="contained"
        onPress={() => setVisible(true)}>
        Awesome Button
      </Button>
      
      <Text style={styles.text}>Snackbar is {visible ? 'Show' : 'Hidden'} and Undo was {undo ? 'pressed' : 'not pressed'}</Text>
      <Text style={[styles.text, styles.blueText]}>{someText}</Text>

      <Card 
        style={styles.card} 
        onPress={() => setCardPressed(!cardPressed)}>
        <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
        <Card.Content>
          <Title>Awesome Title {cardPressed ? 'pressed' : 'unpressed'} </Title>
          <Paragraph>{cardPara}</Paragraph>
        </Card.Content>
        <Card.Actions style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end" }}>
          <Button 
            style={styles.cardButton}
            onPress={() => setCardPressed(!cardPressed)}>
            Cancel
          </Button>
          <Button style={styles.cardButton}>Ok</Button>
        </Card.Actions>
      </Card>

      <Snackbar
        visible={visible}
        onDismiss={() => setVisible(false)}
        action={{
          label: 'Undo',
          onPress: () => {
            setUndo(true);
            setSomeText('Changed Text');
          },
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
    width: 250,
    marginTop: 12
  },
  cardButton: {
    paddingEnd: 12,
  }
});
