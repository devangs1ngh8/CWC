import { StyleSheet } from 'react-native';
import { normalize } from '../../utils/metrics';

const styles = StyleSheet.create({
  section: {
    borderTopLeftRadius: normalize(35),
    borderTopRightRadius: normalize(35),
    // paddingTop: normalize(16),
    marginBottom: normalize(40),
    paddingHorizontal: normalize(10),
  },

  heading: {
    fontSize: normalize(18),
    fontFamily: 'Manrope-Bold',
    textAlign: 'center',
    marginBottom: normalize(16),
    marginTop: normalize(12),
  },

  options: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: normalize(10),
    paddingHorizontal: normalize(24),
  },
});

export default styles;
