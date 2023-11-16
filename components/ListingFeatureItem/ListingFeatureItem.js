import React, { memo } from "react";
import { Pressable, Text } from "react-native";

import style from "./ListingFeatureItemStyles";
import { Colors } from "../../assets/Colors";
import { pressedBorderColor } from "../../assets/styles/globalStyles";

const ListingFeatureItem = ({ featureName, featureData }) => {
  if (!featureData[featureName]) {
    return null;
  }

  const { label, icon, iconSize, IconLibrary } = featureData[featureName];

  return (
    <Pressable
      style={({ pressed }) => ({
        ...style.container,
        ...pressedBorderColor(pressed, Colors.lightblue),
      })}
    >
      <IconLibrary name={icon} size={iconSize} color={Colors.blue} />
      <Text style={style.text}>{label}</Text>
    </Pressable>
  );
};

export default memo(ListingFeatureItem);
