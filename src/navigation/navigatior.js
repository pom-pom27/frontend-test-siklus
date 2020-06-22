/* eslint-disable prettier/prettier */
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import ContactScreen from "../screens/ContactScreen";
import CallLogScreen from "../screens/CallLogScreen";
import DashboardScreen from "../screens/DashboardScreen";

const Navigator = createStackNavigator(
  {
    Dashboard: DashboardScreen,
    Contact: ContactScreen,
    CallLog: CallLogScreen,
  },
  { initialRouteName: "Dashboard" }
);
export default createAppContainer(Navigator);
