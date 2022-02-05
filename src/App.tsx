import React, {useState} from 'react';
import {
  Button,
  NativeModules,
  Platform,
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';

import SharedGroupPreferences from 'react-native-shared-group-preferences';

const group = 'group.widgetTestAsap';

const SharedStorage = NativeModules.SharedStorage;

const App = () => {
  const [text, setText] = useState('');
  const widgetData = {
    text,
  };

  const handleUpdateText = async () => {
    try {
      if (Platform.OS === 'android') {
        SharedStorage.set(JSON.stringify({text}));
      } else {
        await SharedGroupPreferences.setItem('widgetKey', widgetData, group);
      }
    } catch (error) {
      console.log({error});
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          onChangeText={newText => setText(newText)}
          value={text}
          returnKeyType="send"
          placeholder="Enter the text to display..."
        />
        <Button title="Update widget text" onPress={handleUpdateText} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '80%',
    borderBottomWidth: 1,
    fontSize: 20,
    minHeight: 40,
  },
});

export default App;
