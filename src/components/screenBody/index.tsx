import React from 'react';
import styles from './style';
import { ScrollView, Text, View } from 'react-native';

type Props = {
  title?: string;
  description?: string;
  children?: React.ReactNode;
  height?: number | `${number}%`;
  width?: number | `${number}%`;
  bottomContent?: React.ReactNode;
  flex?: number;
  titleContent?: React.ReactNode;
};

const ScreenBody = ({
  title,
  description,
  children,
  height,
  width = '100%',
  bottomContent,
  flex,
  titleContent,
}: Props) => {
  return (
    <View style={[styles.container, { height, width, flex }]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <View style={styles.topPagination} />
        {(title || description || titleContent) && (
          <View>
            {titleContent ? titleContent : title && <Text>{title}</Text>}

            {description && (
              <Text style={styles.description}>{description}</Text>
            )}
          </View>
        )}

        {children}
      </ScrollView>
      {bottomContent && <View>{bottomContent}</View>}
    </View>
  );
};

export default ScreenBody;
