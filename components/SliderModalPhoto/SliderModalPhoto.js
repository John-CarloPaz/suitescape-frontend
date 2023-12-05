import Ionicons from "@expo/vector-icons/Ionicons";
import React, { memo } from "react";
import { Modal, Text, View } from "react-native";
import Gallery from "react-native-awesome-gallery";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import style from "./SliderModalPhotoStyles";
import { useModalGallery } from "../../contexts/ModalGalleryContext";
import SliderGalleryItem from "../SliderGalleryItem/SliderGalleryItem";

const SliderModalPhoto = ({ imageData }) => {
  const { index, setIndex, isPhotoGalleryShown, closePhotoGallery } =
    useModalGallery();
  const insets = useSafeAreaInsets();

  return (
    <Modal
      visible={isPhotoGalleryShown}
      animationType="slide"
      onRequestClose={() => closePhotoGallery()}
      statusBarTranslucent
    >
      <View style={style.mainContainer}>
        <Ionicons
          name="close"
          size={30}
          color="white"
          style={style.closeButton({ topInsets: insets.top })}
          onPress={() => closePhotoGallery()}
        />

        {isPhotoGalleryShown && (
          <Gallery
            data={imageData}
            renderItem={({ item, setImageDimensions }) => {
              return (
                <SliderGalleryItem
                  mediaId={item.id}
                  mediaUrl={item.url}
                  type="image"
                  modalMode
                  onLoad={(e) => {
                    const { width, height } = e.source;
                    setImageDimensions({ width, height });
                  }}
                />
              );
            }}
            initialIndex={index}
            onIndexChange={setIndex}
            onSwipeToClose={() => closePhotoGallery()}
            disableSwipeUp
          />
        )}

        {/*<SliderGallery data={imageData} mediaType="image" modalMode />*/}
      </View>

      {/* Index */}
      {imageData ? (
        <View style={style.indexContainer({ bottomInsets: insets.bottom })}>
          <Text style={style.text}>
            {index + 1}/{imageData.length}
          </Text>
        </View>
      ) : null}
    </Modal>
  );
};

export default memo(SliderModalPhoto);
