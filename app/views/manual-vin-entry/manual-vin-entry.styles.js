import { StyleSheet } from 'react-native';
import APPDIMENSIONS from '../../common/constants/dimensions';
import FONTSIZES from '../../common/constants/font-sizes';
import DMXCOLORS from '../../common/constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bidInputBlock: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: DMXCOLORS.GREYLIGHT,
    width: APPDIMENSIONS.SCREEN_WIDTH * 0.9,
    height: APPDIMENSIONS.SCREEN_HEIGHT * 0.2,
    borderRadius: 10,
  },
  input: {
    flex: 0,
    fontSize: FONTSIZES.body,
    color: DMXCOLORS.GREYDARK,
    alignSelf: 'center',
    textAlign: 'center',
    width: APPDIMENSIONS.SCREEN_WIDTH - 40,
    height: 40,
    borderColor: DMXCOLORS.GREYLIGHT1,
    borderWidth: 1,
  },
  unitTextWrap: {
    padding: 10,
    paddingBottom: 0,
  },
  unitText: {
    fontSize: FONTSIZES.body,
  },
  errorText: {
    flex: 0,
    color: DMXCOLORS.RED,
    width: APPDIMENSIONS.SCREEN_WIDTH - 40,
    height: 40,
  },
});

export default styles;
