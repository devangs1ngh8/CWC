
import { StyleSheet } from 'react-native';

import colors from '../../utils/color';
import { normalize } from '../../utils/metrics';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: 0,
    paddingHorizontal: normalize(20),
    paddingTop: normalize(12),
    paddingBottom: normalize(20),
    backgroundColor: colors.background,
    borderTopLeftRadius: normalize(40),
    borderTopRightRadius: normalize(40),
  },

  scroll: {
    flex: 1,
    minHeight: 0,
  },

  scrollContent: {
    flexGrow: 1,
    paddingBottom: normalize(20),
  },

  description: {
    marginTop: normalize(10),
    fontSize: normalize(12),
    lineHeight: normalize(19),
    textAlign: 'center',
    color: colors.textSecondary,
  },

  children: {
    marginTop: normalize(24),
  },

  buttonContainer: {
    paddingTop: normalize(12),
  },
});

export default styles;
