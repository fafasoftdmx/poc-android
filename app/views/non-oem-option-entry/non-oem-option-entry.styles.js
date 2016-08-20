import { StyleSheet } from 'react-native';
import APPDIMENSIONS from '../../common/constants/dimensions';
import DMXCOLORS from '../../common/constants/colors';
import fontSizes from '../../common/constants/font-sizes';

const styles = StyleSheet.create({
  unitTextWrap: {
    marginLeft: 16,
    fontSize: 10,
    color: DMXCOLORS.GREYDARK,
  },
  input: {
    fontSize: fontSizes.body,
    textAlign: 'left',
    color: DMXCOLORS.BLACK,
    marginLeft: 15,
    marginRight: 20,
    marginBottom: 10,
    height: 22,
  },
  saveBtn: {
    bottom: 0,
    position: 'absolute',
    width: APPDIMENSIONS.SCREEN_WIDTH,
  },
});

export default styles;
