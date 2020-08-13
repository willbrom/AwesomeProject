import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { Snackbar, Button } from "react-native-paper";

export default function App() {
  const [visible, setVisible] = useState(false);
  const [undo, setUndo] = useState(false);
  const [someText, setSomeText] = useState('Some Text');

  return (
    <View style={styles.container}>
      <Button 
        style={styles.button}
        mode="contained"
        onPress={() => setVisible(true)}>
        Awesome Button
      </Button>
      <Text>Snackbar is {visible ? 'Show' : 'Hidden'} and Undo was {undo ? 'pressed' : 'not pressed'} </Text>
      <Text>{someText}</Text>

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
    paddingTop: 22
  },
  button: {
    width: 200,
    alignSelf: "center"
  }
});
