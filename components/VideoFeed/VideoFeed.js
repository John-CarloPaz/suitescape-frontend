import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import { Audio, InterruptionModeAndroid, InterruptionModeIOS } from "expo-av";
import { StatusBar } from "expo-status-bar";
import React, { memo, useCallback, useRef, useState } from "react";
import { Dimensions, FlatList, Platform, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { VideoScrollContext } from "../../contexts/VideoScrollContext";
import VideoFeedItem from "../VideoFeedItem/VideoFeedItem";

const VIEWABILITY_CONFIG = {
  minimumViewTime: 250,

  // Adjust this if onViewableItemsChanged is not working properly
  itemVisiblePercentThreshold: 80,
};

const { height: WINDOW_HEIGHT } = Dimensions.get("window");

const VideoFeed = ({
  height = WINDOW_HEIGHT,
  videos,
  currentListing,
  refreshControl,
  onEndReached,
  bottomTabHeight,
}) => {
  const [index, setIndex] = useState(null);
  const [lastPlayedIndex, setLastPlayedIndex] = useState(null);
  const [isScrollEnabled, setIsScrollEnabled] = useState(true);

  const insets = useSafeAreaInsets();
  const isFeedFocused = useIsFocused();

  // Adds top inset on android devices with a notch
  const topInset =
    Platform.OS === "android" && insets.top > 25 ? insets.top : 0;

  // Adds bottom inset if the bottom tab bar is not present
  const bottomInset = bottomTabHeight ?? insets.bottom;

  // Adjusts the height of the video to fit the screen
  const videoHeight = height + topInset - bottomInset;

  // Plays the last played video when the feed is focused, and pauses it when it is not
  useFocusEffect(
    useCallback(() => {
      if (lastPlayedIndex !== null) {
        // Also sets the first video to play on initial load
        setIndex(lastPlayedIndex);
      }

      return () => {
        setIndex(null);
      };
    }, [lastPlayedIndex, videos]),
  );

  useFocusEffect(
    useCallback(() => {
      (async () => {
        await Audio.setAudioModeAsync({
          playsInSilentModeIOS: true,
          interruptionModeIOS: InterruptionModeIOS.DoNotMix,
          interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
        });
      })();

      // return () => {
      //   (async () => {
      //     await Audio.setAudioModeAsync({
      //       interruptionModeIOS: InterruptionModeIOS.DuckOthers,
      //       interruptionModeAndroid: InterruptionModeAndroid.DuckOthers,
      //     });
      //   })();
      // };
    }, []),
  );

  // Sets the index of the video that is currently in focus
  const handleViewableItemsChanged = useCallback(({ viewableItems }) => {
    const firstViewableItem = viewableItems[0];
    if (firstViewableItem?.isViewable) {
      const newIndex = firstViewableItem.item.id;
      setLastPlayedIndex(newIndex);
      setIndex(newIndex);
    }
  }, []);

  const viewabilityConfigCallbackPairs = useRef([
    {
      viewabilityConfig: VIEWABILITY_CONFIG,
      onViewableItemsChanged: handleViewableItemsChanged,
    },
  ]);

  const getItemLayout = (_, idx) => ({
    length: videoHeight,
    offset: videoHeight * idx,
    index: idx,
  });

  const renderItem = useCallback(
    ({ item }) => (
      <VideoFeedItem
        videoId={item.id}
        videoUrl={item.url}
        videoFileName={item.filename}
        height={videoHeight}
        listing={currentListing ?? item.listing}
        previewMode={currentListing}
        videoInFocus={index ? index === item.id : false}
        feedFocused={isFeedFocused}
      />
    ),
    [index],
  );

  // const statusBarStyle = colorScheme === 'dark' || isFeedFocused ? "light" : "dark";
  const statusBarStyle = isFeedFocused ? "light" : "dark";

  return (
    <VideoScrollContext.Provider
      value={{ isScrollEnabled, setIsScrollEnabled }}
    >
      <StatusBar
        animated
        translucent
        backgroundColor="transparent"
        style={statusBarStyle}
      />
      <FlatList
        data={videos}
        contentOffset={{ x: 0, y: 0 }}
        scrollEnabled={isScrollEnabled}
        initialNumToRender={5}
        windowSize={5}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        snapToInterval={videoHeight}
        snapToAlignment="center"
        decelerationRate="fast"
        refreshControl={refreshControl}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
        disableIntervalMomentum
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
        getItemLayout={getItemLayout}
      />
      {!bottomTabHeight && <View style={{ height: bottomInset }} />}
    </VideoScrollContext.Provider>
  );
};

export default memo(VideoFeed);
