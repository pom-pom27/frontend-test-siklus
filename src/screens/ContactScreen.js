/* eslint-disable prettier/prettier */
import React, { useState } from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  FlatList,
  TextInput,
} from "react-native";
import Contacts from "react-native-contacts";
import ListItems from "../components/ListItem";

const ContactScreen = ({ navigation }) => {
  const [contacts, setContacts] = useState(
    navigation.getParam("contacts", "default value")
  );

  const search = (text) => {
    const phoneNumberRegex = /\b[\+]?[(]?[0-9]{2,6}[)]?[-\s\.]?[-\s\/\.0-9]{3,15}\b/m;

    if (text === "" || text === null) {
      setContacts(navigation.getParam("contacts", "default value"));
    } else if (phoneNumberRegex.test(text)) {
      Contacts.getContactsByPhoneNumber(text, (_err, contacts) => {
        contacts.sort(
          (a, b) => a.givenName.toLowerCase() > b.givenName.toLowerCase()
        );
        setContacts(contacts);
      });
    } else {
      Contacts.getContactsMatchingString(text, (_err, contacts) => {
        contacts.sort(
          (a, b) => a.givenName.toLowerCase() > b.givenName.toLowerCase()
        );
        setContacts(contacts);
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <TextInput
          onChangeText={search}
          placeholder="Search"
          style={styles.searchBar}
        />
        <FlatList
          data={contacts}
          renderItem={(contact) => {
            return (
              <ListItems
                key={contact.item.recordID}
                item={contact.item}
                onPress={navigation.state.params.openContact}
              />
            );
          }}
          keyExtractor={(item) => item.recordID}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: "#4591ed",
    color: "white",
    paddingHorizontal: 15,
    paddingVertical: 15,
    fontSize: 20,
  },
  searchBar: {
    backgroundColor: "#f0eded",
    paddingHorizontal: 30,
    paddingVertical: 15,
  },
});

export default ContactScreen;
