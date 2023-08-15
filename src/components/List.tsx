import React, { FC } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ToDo } from "../../App";

const List: FC<{ data: ToDo[]; setData: (data: ToDo[]) => void }> = ({
  data,
  setData,
}) => {
  const renderItem = ({ item }) => {
    const { label, isFinished } = item;
    const onPressTask = () => {
      const position = data.findIndex((itemToDo) => itemToDo.label === label);
      const toDoData = [...data];
      const toDoItem = toDoData[position];
      const updatedToDoItem = {
        ...toDoItem,
        isFinished: !toDoItem.isFinished,
      };
      toDoData[position] = updatedToDoItem;
      setData(toDoData);
    };

    const onDelete = () => {
      const newList = data.filter((listItem) => listItem.label !== label);
      setData(newList);
    };

    return (
      <TouchableOpacity onPress={onPressTask}>
        <View style={styles.listItem}>
          <Text
            style={
              isFinished
                ? styles.listItemTextCrossed
                : styles.listItemTextDefault
            }
          >
            {label}
          </Text>
          <TouchableOpacity style={styles.touchableOpacity} onPress={onDelete}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
              }}
            >
              x
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      keyExtractor={(_, i) => i.toString()}
      data={data}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  listItem: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 8,
    fontSize: 18,
    flexDirection: 'row',
    marginTop: 8,
  },
  listItemTextDefault: {
    padding: 12,
    fontSize: 18,
    width: "85%",
  },
  listItemTextCrossed: {
    padding: 12,
    fontSize: 18,
    width: "85%",
    textDecorationLine: "line-through",
  },
  touchableOpacity: {
    color: '#889e8d',
    justifyContent: "center",
    alignItems: "center",
    width: '15%',
  },
});

export default List;
