import React, { useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  NativeSyntheticEvent,
  TextInputSubmitEditingEventData,
} from 'react-native';
import List from './src/components/List';

export type ToDo = {
  label: string;
  isFinished: boolean;
};

const App = () => {
  const [input, setInput] = useState('');
  const [list, setList] = useState<ToDo[]>([]);

  const backgroundStyle = {
    backgroundColor: '#889e8d',
    padding: 20,
    flex: 1,
  };

  const onSubmit = (
    value: NativeSyntheticEvent<TextInputSubmitEditingEventData>
  ) => {
    const hasTask = list.some((listItem: ToDo) => {
      return listItem.label === value.nativeEvent.text;
    });
    if (!value) {
      return;
    }
    if (!hasTask) {
      setList([
        ...list,
        {
          label: value.nativeEvent.text,
          isFinished: false,
        },
      ]);
    }
    setInput('');
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle="light-content" backgroundColor={'#889e8d'} />
      <View style={{ marginTop: 80, marginBottom: 8 }}>
        <Text style={{ fontSize: 32, fontWeight: 'bold', color: '#fff' }}>
          Hi There!
        </Text>
      </View>
      <View
        style={{
          backgroundColor: 'white',
          borderRadius: 12,
          padding: 12,
          fontSize: 18,
          flexDirection: 'row',
          marginBottom: 16,
        }}
      >
        <TextInput
          style={{
            backgroundColor: 'white',
            padding: 4,
            fontSize: 18,
            width: "85%",
          }}
          onChangeText={(value) => setInput(value)}
          value={input}
          placeholder="Add a task"
          onSubmitEditing={onSubmit}
        />
        <TouchableOpacity style={styles.touchableOpacity}>
          <Text
            style={styles.touchableOpacityText}
            onPress={() => {
              const hasTask = list.some((listItem: ToDo) => {
                return listItem.label === input;
              });
              if (!input) {
                return;
              }
              if (!hasTask) {
                setList([
                  ...list,
                  {
                    label: input,
                    isFinished: false,
                  },
                ]);
              }
              setInput('');
            }}
          >
            +
          </Text>
        </TouchableOpacity>
      </View>
      <Text style={{ fontSize: 16, color: "#fff" }}>Your tasks:</Text>
      <List data={list} setData={setList} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  touchableOpacity: {
    color: '#889e8d',
    justifyContent: "center",
    alignItems: "center",
    width: '15%',
  },
  touchableOpacityText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default App;
