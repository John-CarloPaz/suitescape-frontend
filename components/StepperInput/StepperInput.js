import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { View } from "react-native";

import style from "./StepperInputStyles";
import globalStyles from "../../assets/styles/globalStyles";
import extractNumber from "../../utilities/numberExtractor";
import ButtonIcon from "../ButtonIcon/ButtonIcon";
import DashView from "../DashView/DashView";
import FormInput from "../FormInput/FormInput";

const StepperInput = ({ placeholder, value, onValueChange }) => {
  return (
    <>
      <FormInput
        placeholder={placeholder}
        keyboardType="number-pad"
        value={value === 0 ? "" : value?.toString()}
        onChangeText={(input) =>
          extractNumber(input, (value) => {
            onValueChange && onValueChange(value ?? null);
          })
        }
        disableAnimations
        useDefaultStyles={false}
        containerStyle={globalStyles.flexFull}
      />
      <View style={globalStyles.flexFull}>
        <View style={style.stepperContainer}>
          <ButtonIcon
            onPress={() => onValueChange && onValueChange(value + 1)}
            renderIcon={() => (
              <Ionicons
                name="add-outline"
                color="white"
                size={35}
                style={{ left: 1 }}
              />
            )}
          />
          <DashView />

          <ButtonIcon
            onPress={() =>
              onValueChange && onValueChange(value > 0 ? value - 1 : 0)
            }
            renderIcon={() => (
              <Ionicons
                name="remove-outline"
                color="white"
                size={34}
                style={{ left: 1 }}
              />
            )}
          />
        </View>
      </View>
    </>
  );
};

export default StepperInput;