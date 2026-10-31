import { StyleSheet } from 'react-native';
import { normalize } from '../../utils/metrics';

const styles = StyleSheet.create({
  section: {
    borderRadius: normalize(23),
    padding: normalize(24),
    marginBottom: normalize(42),
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
  },
});

export default styles;
