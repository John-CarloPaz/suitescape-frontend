import React from "react";
import { Text, View } from "react-native";

import style from "./DetailsTitleViewStyles";
import globalStyles from "../../assets/styles/globalStyles";
import ButtonLink from "../ButtonLink/ButtonLink";
import CouponBadge from "../CouponBadge/CouponBadge";
import StarRatingView from "../StarRatingView/StarRatingView";

const DetailsTitleView = ({ title, price, rating, reviewsCount, discount }) => {
  return (
    <View style={style.mainContainer}>
      {discount && <CouponBadge>{discount}% Off</CouponBadge>}

      <View style={style.contentContainer}>
        <Text style={style.titleText}>{title ?? "Loading..."}</Text>

        <View style={globalStyles.textGap}>
          {price && <Text style={style.priceText}>₱{price} per night</Text>}

          {/* Ratings */}
          <View style={style.ratingsContainer}>
            <StarRatingView rating={rating} textStyle={style.text} />

            {/* Reviews */}
            <View>
              {reviewsCount ? (
                <ButtonLink textStyle={style.text}>
                  {reviewsCount} {reviewsCount > 1 ? "Reviews" : "Review"}
                </ButtonLink>
              ) : null}
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default DetailsTitleView;
