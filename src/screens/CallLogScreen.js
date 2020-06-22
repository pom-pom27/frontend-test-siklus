import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView, FlatList } from "react-native";

const CallLogScreen = ({ navigation }) => {
  const [calls, setCalls] = useState([]);

  useEffect(() => {
    setCalls(navigation.state.params.calls);
  }, []);

  function FlatListItemSeparator() {
    return (
      //Item Separator
      <View
        style={{ height: 0.5, width: "100%", backgroundColor: "#C8C8C8" }}
      />
    );
  }

  return (
    <SafeAreaView style={styles.saveArea}>
      <View style={styles.MainContainer}>
        <FlatList
          data={calls}
          ItemSeparatorComponent={FlatListItemSeparator}
          renderItem={({ item }) => (
            // Single Comes here which will be repeatative for the FlatListItems
            <View>
              <Text style={styles.item}>
                Name : {item.name ? item.name : "Unknown"}
                {"\n"}
                DateTime : {item.dateTime}
                {"\n"}
                Duration : {item.duration}
                {"\n"}
                PhoneNumber : {item.phoneNumber}
                {"\n"}
                Type : {item.type}
              </Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  saveArea: { flex: 1 },
  header: {
    backgroundColor: "#4591ed",
    color: "white",
    paddingHorizontal: 15,
    paddingVertical: 15,
    fontSize: 20,
  },
  MainContainer: {
    justifyContent: "center",
    flex: 1,
  },

  item: {
    padding: 10,
    fontSize: 18,
  },
});

export default CallLogScreen;
