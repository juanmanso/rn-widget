import React, {useState} from 'react';
import {Button, NativeModules, SafeAreaView, Text} from 'react-native';

import SharedGroupPreferences from 'react-native-shared-group-preferences';

const group = 'group.widgetTestAsap';

const SharedStorage = NativeModules.SharedStorage;
const TITLE = 'Hello from React Native';

const App = () => {
  const [text, setText] = useState(TITLE);
  const widgetData = {
    text,
  };

  const handleUpdateText = async () => {
    setText(TITLE);

    try {
      // iOS
      await SharedGroupPreferences.setItem('widgetKey', widgetData, group);
    } catch (error) {
      console.log({error});
    }
    // Android
    SharedStorage.set(JSON.stringify({text}));
  };

  return (
    <SafeAreaView>
      <Text>{text}</Text>
      <Button title="Update widget text" onPress={handleUpdateText} />
    </SafeAreaView>
  );
};

export default App;
