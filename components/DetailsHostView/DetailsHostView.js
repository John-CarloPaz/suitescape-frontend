import React from "react";
import { Text, View } from "react-native";

import style from "./DetailsHostViewStyles";
import detailsStyles from "../../assets/styles/detailsStyles";
import ButtonLink from "../ButtonLink/ButtonLink";
import ButtonSocialActionsView from "../ButtonSocialActionsView/ButtonSocialActionsView";
import ProfileImage from "../ProfileImage/ProfileImage";

const DetailsHostView = ({ hostName }) => {
  return (
    <View style={detailsStyles.plainContainer}>
      <View style={style.hostContentContainer}>
        <ProfileImage />

        <View style={style.hostDetailsContainer}>
          {/* Host Name */}
          <ButtonLink textStyle={style.hostNameText}>
            {hostName ?? "Loading..."}
          </ButtonLink>

          {/* Response Rate */}
          <View style={style.responseContainer}>
            <Text style={style.responseText}>Response Rate: 95%</Text>
            <Text style={style.responseText}>
              Response Time: within an hour
            </Text>
          </View>
        </View>
      </View>

      {/* Listing Actions */}
      <ButtonSocialActionsView />
    </View>
  );
};

export default DetailsHostView;
