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

const bodySection = ({
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
  return (
    <KeyboardAvoidingView
      style={[styles.container, root]}
      behavior="padding"
      keyboardVerticalOffset={0}
    >
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

      {bottomContent && bottomContent}
    </KeyboardAvoidingView>
  );
};

export default bodySection;
