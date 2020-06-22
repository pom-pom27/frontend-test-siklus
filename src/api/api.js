import database from "@react-native-firebase/database";

export function addContact(contacts) {
  database()
    .ref("/data/contacts")
    .set({
      contacts,
    })
    .then(() => console.log("Data set."));
}

export function addCallLog(callLogs) {
  database()
    .ref("/data/call-logs")
    .set({
      callLogs,
    })
    .then(() => console.log("Data set."));
}
