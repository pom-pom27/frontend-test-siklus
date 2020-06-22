import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Button,
  PermissionsAndroid,
} from "react-native";
import Contacts from "react-native-contacts";
import CallLogs from "react-native-call-log";
import { addContact, addCallLog } from "../api/api";

const ContactScreen = ({ navigation }) => {
  const [contacts, setContacts] = useState([]);
  const [calls, setCalls] = useState([]);
  const [menu, setMenu] = useState([
    { id: 1, name: "Contact", routeName: "Contact", total: 0 },
    { id: 2, name: "Call Log", routeName: "CallLog", total: 0 },
  ]);

  useEffect(() => {
    PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
      PermissionsAndroid.PERMISSIONS.READ_CALL_LOG,
    ]).then((result) => {
      if (
        result["android.permission.READ_CONTACTS"] &&
        result["android.permission.READ_CALL_LOG"] === "granted"
      ) {
        loadContacts();
        CallLogs.loadAll().then((call) => {
          setCalls(call);

          let menuCopy = menu;
          menuCopy[1].total = call.length;
          setMenu(menuCopy);
        });
      }
    });
  }, []);

  const loadContacts = () => {
    Contacts.getAll((err, contacts) => {
      contacts.sort((a, b) => a.givenName > b.givenName);
      console.log("contacts -> ", contacts);
      if (err === "denied") {
        console.warn("Permission to access contacts was denied");
      } else {
        setContacts(contacts);

        let menuCopy = JSON.parse(JSON.stringify(menu));
        menuCopy[0].total = contacts.length;
        setMenu(menuCopy);
      }
    });
  };

  const openContact = (contact) => {
    console.log(JSON.stringify(contact));
    Contacts.openExistingContact(contact, () => {});
  };

  const renderGridItem = (itemData) => {
    return (
      <TouchableOpacity
        style={styles.gridItem}
        onPress={() => {
          navigation.navigate(itemData.item.routeName, {
            contacts: contacts,
            calls: calls,
            openContact: openContact,
          });
        }}
      >
        <View>
          <Text>{itemData.item.name}</Text>
          <Text style={styles.total}>{itemData.item.total}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View>
      <FlatList
        data={menu}
        renderItem={renderGridItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
      />
      <View style={[{ width: "100%", marginTop: 120 }]}>
        <View style={styles.button}>
          <Button
            title="store contact to firebase"
            onPress={() => addContact(contacts)}
            color="#90A4AE"
          />
        </View>
        <View style={styles.button}>
          <Button
            title="store callLogs to firebase"
            onPress={() => addCallLog(calls)}
            color="#90A4AE"
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonGrid: { marginTop: 20, width: 400 },
  total: { textAlign: "center", marginTop: 15 },
  button: { margin: 10 },
  gridItem: {
    flex: 1,
    margin: 15,
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "grey",
    borderRadius: 20,
  },
});
export default ContactScreen;
