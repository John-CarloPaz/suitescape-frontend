import React, { memo } from "react";
import { Pressable, Text, View } from "react-native";

import style from "./SliderReviewItemStyles";
import { pressedBgColor } from "../../assets/styles/globalStyles";
import ProfileImage from "../ProfileImage/ProfileImage";
import StarRatingView from "../StarRatingView/StarRatingView";

const SliderReviewItem = ({ item, onPress, itemWidth, itemMargin }) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        ...style.mainContainer({ itemWidth, itemMargin }),
        ...pressedBgColor(pressed),
      })}
    >
      <View style={style.userContainer}>
        {/*<Avatar.Image source={item.img} size={50} style={style.avatar} />*/}

        <ProfileImage size={45} />
        <View style={style.userNameContainer}>
          <Text style={{ ...style.userName, ...style.text }} numberOfLines={1}>
            {item.user.fullname}
          </Text>
          <StarRatingView starSize={15} rating={item.rating} />
        </View>
      </View>
      <View style={style.reviewContainer}>
        <Text style={style.text}>{item.content}</Text>
      </View>
    </Pressable>
  );
};

export default memo(SliderReviewItem);
