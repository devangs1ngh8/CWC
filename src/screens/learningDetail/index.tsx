import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  StatusBar,
  Dimensions,
  Alert,
} from 'react-native';

import YoutubePlayer from 'react-native-youtube-iframe';
import Orientation from 'react-native-orientation-locker';
import { useNavigation, useRoute } from '@react-navigation/native';

import styles from './style';
import { image } from '../../assets';
import { LearningItem } from '../home/learningData';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const getYouTubeVideoId = (url?: string): string | null => {
  if (!url) return null;

  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/|live\/))([a-zA-Z0-9_-]{11})/,
  );

  return match?.[1] ?? null;
};

const LearningDetail = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const { item } = route.params as { item: LearningItem };

  const videoId = getYouTubeVideoId(item.videoUrl);

  const [showPlayer, setShowPlayer] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    Orientation.lockToPortrait();

    return () => {
      Orientation.lockToPortrait();
    };
  }, []);

  const handlePlay = () => {
    if (!videoId) {
      Alert.alert(
        'Video unavailable',
        'Please add a valid YouTube video link.',
      );
      return;
    }

    setShowPlayer(true);
    setPlaying(true);
  };

  const handleBack = () => {
    setPlaying(false);
    setShowPlayer(false);
    setIsFullScreen(false);

    Orientation.lockToPortrait();
    navigation.goBack();
  };

  const handlePlayerStateChange = (state: string) => {
    if (state === 'playing') {
      setPlaying(true);
    }

    if (state === 'paused' || state === 'ended') {
      setPlaying(false);
    }
  };

  const handleFullScreenChange = (fullScreen: boolean) => {
    setIsFullScreen(fullScreen);

    if (fullScreen) {
      Orientation.lockToLandscape();
    } else {
      Orientation.lockToPortrait();
    }
  };

  const handlePlayerError = (error: string) => {
    console.log('YouTube Player Error:', error);

    setPlaying(false);
    setShowPlayer(false);
    setIsFullScreen(false);

    Orientation.lockToPortrait();

    Alert.alert(
      'Playback Error',
      'Unable to play this video. Please try again.',
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden={isFullScreen} />

      {showPlayer && videoId ? (
        <View style={styles.videoContainer}>
          <YoutubePlayer
            height={SCREEN_WIDTH * (9 / 16)}
            width={SCREEN_WIDTH}
            play={playing}
            videoId={videoId}
            onChangeState={handlePlayerStateChange}
            onFullScreenChange={handleFullScreenChange}
            onError={handlePlayerError}
            webViewProps={{
              allowsFullscreenVideo: true,
            }}
          />

          {!isFullScreen && (
            <Pressable style={styles.videoBackButton} onPress={handleBack}>
              <Text style={styles.backText}>‹</Text>
            </Pressable>
          )}
        </View>
      ) : (
        <>
          <View style={styles.imageHeader}>
            <Image
              source={item.image}
              style={styles.headerImage}
              resizeMode="cover"
            />

            <Pressable style={styles.backButton} onPress={handleBack}>
              <Image source={image.goBack} style={styles.backIcon} />
            </Pressable>

            <Pressable style={styles.playButton} onPress={handlePlay}>
              <Image style={styles.playIcon} source={image.playButton} />
            </Pressable>
          </View>

          <View style={styles.content}>
            <Text style={styles.title}>{item.title}</Text>

            <Text style={styles.description}>{item.description}</Text>
          </View>
        </>
      )}
    </View>
  );
};

export default LearningDetail;
