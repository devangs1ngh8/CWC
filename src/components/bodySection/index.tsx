import React from 'react';
import styles from './style';
import { KeyboardAvoidingView, ScrollView, Text, View } from 'react-native';

import { type Props } from './@types';

const bodySection = ({
  description,
  children,
  root,
  bottomContent,
  headingSecondaryStyle,
  headingPrimaryStyle,
  titlePrimary,
  titleSecondary,
  topContent,
}: Props) => {
  return (
    <View style={[styles.container, root]}>
      <View>
        {topContent ? topContent : <View style={styles.dragHandle} />}

        <View>
          <View style={styles.titleContentStyle}>
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

          {description && <Text style={styles.description}>{description}</Text>}
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
        {children}
      </ScrollView>

      {bottomContent && bottomContent}
    </View>
  );
};

export default bodySection;
