import { useTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Platform, Text, useColorScheme, View } from "react-native";

import BottomTabs from "./BottomTabs/BottomTabs";
import { Routes } from "./Routes";
import { Colors } from "../assets/Colors";
import ButtonBack from "../components/ButtonBack/ButtonBack";
import { useAuth } from "../contexts/AuthContext";
import { useSettings } from "../contexts/SettingsContext";
import BookingSummary from "../screens/BookingSummary/BookingSummary";
import CheckAvailability from "../screens/CheckAvailability/CheckAvailability";
import Feedback from "../screens/Feedback/Feedback";
import Filter from "../screens/Filter/Filter";
import GuestInfo from "../screens/GuestInfo/GuestInfo";
import ListingDetails from "../screens/ListingDetails/ListingDetails";
import Login from "../screens/Login/Login";
import ManageAccount from "../screens/ManageAccount/ManageAccount";
import Onboarding from "../screens/Onboarding/Onboarding";
import PaymentMethod from "../screens/PaymentMethod/PaymentMethod";
import ProfileHost from "../screens/ProfileHost/ProfileHost";
import RoomDetails from "../screens/RoomDetails/RoomDetails";
import Search from "../screens/Search/Search";
import SelectDates from "../screens/SelectDates/SelectDates";
import SignUp from "../screens/SignUp/SignUp";

const Stack = createNativeStackNavigator();

const MainNavigation = () => {
  const { settings } = useSettings();
  const { authState } = useAuth();

  const theme = useTheme();
  const colorScheme = useColorScheme();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {settings.onboardingEnabled && (
        <Stack.Screen name={Routes.ONBOARDING} component={Onboarding} />
      )}

      {authState.userToken ? (
        <Stack.Screen name={Routes.BOTTOM_TABS} component={BottomTabs} />
      ) : (
        <Stack.Group screenOptions={{ animation: "slide_from_bottom" }}>
          <Stack.Screen name={Routes.LOGIN} component={Login} />
          <Stack.Screen name={Routes.SIGNUP} component={SignUp} />
        </Stack.Group>
      )}

      <Stack.Group
        screenOptions={({ navigation }) => ({
          headerShown: true,
          headerTintColor: "black",
          headerBackVisible: Platform.OS === "ios",
          headerBackTitleVisible: false,
          headerLeft:
            Platform.OS === "android"
              ? ({ canGoBack, tintColor }) =>
                  canGoBack && (
                    <View style={{ marginLeft: -16 }}>
                      <ButtonBack
                        onPress={() => navigation.goBack()}
                        color={tintColor}
                      />
                    </View>
                  )
              : null,
          headerTitle: ({ children }) => (
            <View style={{ flex: 1, left: Platform.OS === "ios" ? -10 : 0 }}>
              <Text style={{ fontSize: 16 }}>{children}</Text>
            </View>
          ),
        })}
      >
        <Stack.Screen
          name={Routes.SEARCH}
          component={Search}
          options={{ title: "Search Destination" }}
        />
        <Stack.Screen
          name={Routes.SELECT_DATES}
          component={SelectDates}
          options={{
            animation: "fade_from_bottom",
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name={Routes.FEEDBACK}
          component={Feedback}
          options={{
            gestureEnabled: false,
            headerShown: false,
            presentation: "containedModal",
            animation: "fade_from_bottom",
          }}
        />
        <Stack.Screen name={Routes.MANAGE_ACCOUNT} component={ManageAccount} />

        <Stack.Group
          screenOptions={{
            animation: "slide_from_right",
          }}
        >
          <Stack.Group
            screenOptions={{
              contentStyle: {
                backgroundColor:
                  colorScheme === "dark"
                    ? theme.colors.background
                    : Colors.backgroundGray,
              },
            }}
          >
            <Stack.Screen
              name={Routes.LISTING_DETAILS}
              component={ListingDetails}
            />
            <Stack.Screen name={Routes.ROOM_DETAILS} component={RoomDetails} />
            <Stack.Screen
              name={Routes.CHECK_AVAILABILITY}
              component={CheckAvailability}
            />
            <Stack.Screen
              name={Routes.BOOKING_SUMMARY}
              component={BookingSummary}
            />
            <Stack.Screen name={Routes.PROFILE_HOST} component={ProfileHost} />
          </Stack.Group>

          <Stack.Group
            screenOptions={{
              contentStyle: {
                backgroundColor: "white",
              },
            }}
          >
            <Stack.Screen name={Routes.GUEST_INFO} component={GuestInfo} />
            <Stack.Screen
              name={Routes.PAYMENT_METHOD}
              component={PaymentMethod}
              options={{ title: "Payment" }}
            />
            <Stack.Screen name={Routes.FILTER} component={Filter} />
          </Stack.Group>
        </Stack.Group>
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default MainNavigation;
