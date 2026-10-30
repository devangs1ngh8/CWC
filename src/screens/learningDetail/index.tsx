import React, { useEffect, useState } from 'react';
import { View, Text, Image, Pressable, StatusBar } from 'react-native';
import Video from 'react-native-video';
import Orientation from 'react-native-orientation-locker';
import { useNavigation, useRoute } from '@react-navigation/native';

import styles from './style';
import { image } from '../../assets';
import { LearningItem } from '../home/learningData';

const LearningDetail = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const { item } = route.params;
  const [playing, setPlaying] = useState(false);

  const goBack = () => {
    setPlaying(false);
    Orientation.lockToPortrait();
    navigation.goBack();
  };

  useEffect(() => {
    Orientation.lockToPortrait();

    return () => {
      Orientation.lockToPortrait();
    };
  }, []);

  const handlePlay = () => {
    if (!item.videoUrl || item.videoUrl.startsWith('YOUR_')) {
      return;
    }

    Orientation.lockToLandscape();
    setPlaying(true);
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden={playing} />

      {playing && item.videoUrl ? (
        <View style={styles.videoContainer}>
          <Video
            source={{ uri: item.videoUrl }}
            style={styles.video}
            controls
            onEnd={() => {
              setPlaying(false);
              Orientation.lockToPortrait();
            }}
            onError={() => {
              setPlaying(false);
              Orientation.lockToPortrait();
            }}
          />

          <Pressable style={styles.videoBackButton} onPress={goBack}>
            <Text style={styles.backText}>‹</Text>
          </Pressable>
        </View>
      ) : (
        <>
          <View style={styles.imageHeader}>
            {item.videoUrl && !item.videoUrl.startsWith('YOUR_') ? (
              <Video
                source={{ uri: item.videoUrl }}
                style={styles.headerImage}
                resizeMode="cover"
                paused
                controls={false}
                onError={() => {
                  setPlaying(false);
                  Orientation.lockToPortrait();
                }}
              />
            ) : (
              <Image source={item.image} style={styles.headerImage} />
            )}

            <Pressable style={styles.backButton} onPress={goBack}>
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
