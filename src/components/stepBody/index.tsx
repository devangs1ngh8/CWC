import React from 'react';
import styles from './style';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from 'react-native';

import { type Props } from './@types';
import { normalize, SCREEN_HEIGHT } from '../../utils/metrics';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const StepBody = ({
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

      <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
        {children}
      </ScrollView>

      {bottomContent && (
        <View style={{ paddingBottom: bottomSpacing }}>{bottomContent}</View>
      )}
    </View>
  );
};

export default StepBody;
