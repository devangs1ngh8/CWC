import React from 'react';
import { KeyboardAvoidingView, ScrollView, Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import styles from './style';
import { type Props } from './@types';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { normalize, SCREEN_HEIGHT } from '../../utils/metrics';

const BodySection = ({
  description,
  children,
  root,
  bottomContent,
  headingSecondaryStyle,
  headingPrimaryStyle,
  descriptionStyle,
  titlePrimary,
  titleSecondary,
  topContent,
  showDragHandle = true,
  titleContentStyle,
}: Props) => {
  const insets = useSafeAreaInsets();

  const bottomSpacing =
    SCREEN_HEIGHT <= 700 ? insets.bottom + normalize(12) : insets.bottom;
  return (
    <View style={[styles.container, root]}>
      <View>
        {topContent ? (
          topContent
        ) : showDragHandle ? (
          <View style={styles.dragHandle} />
        ) : null}

        <View>
          <View style={[styles.titleContentStyle, titleContentStyle]}>
            {titlePrimary && (
              <Text style={[styles.titlePrimaryStyle, headingPrimaryStyle]}>
                {titlePrimary}
              </Text>
            )}

            {titleSecondary && (
              <Text style={[styles.titleSecondaryStyle, headingSecondaryStyle]}>
                {titleSecondary}
              </Text>
            )}
          </View>

          {description && (
            <Text style={[styles.description, descriptionStyle]}>
              {description}
            </Text>
          )}
        </View>
      </View>

      <ScrollView contentContainerStyle={{ flex: 1 }}>
        <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
          {children}
        </KeyboardAvoidingView>

        {bottomContent && (
          <View style={{ paddingBottom: bottomSpacing }}>{bottomContent}</View>
        )}
      </ScrollView>
    </View>
  );
};

export default BodySection;
