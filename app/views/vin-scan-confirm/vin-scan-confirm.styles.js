import { StyleSheet } from 'react-native';
import APPDIMENSIONS from '../../common/constants/dimensions';
import DMXCOLORS from '../../common/constants/colors';
import FONTSIZES from '../../common/constants/font-sizes';

const SCREEN_WIDTH = APPDIMENSIONS.SCREEN_WIDTH;
const SCREEN_HEIGHT = APPDIMENSIONS.SCREEN_HEIGHT;

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  confirmBtn: {
    bottom: 0,
    position: 'absolute',
    width: APPDIMENSIONS.SCREEN_WIDTH,
  },
  confirmText: {
    textAlign: 'center',
    fontSize: FONTSIZES.body,
    color: DMXCOLORS.GREYDARK,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 20,
    marginBottom: 20,
  },
  vehicle: {
    color: DMXCOLORS.BLUE,
    fontSize: FONTSIZES.h2,
  },
  checkbox: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: DMXCOLORS.GREYDARK,
  },
  styleSelectorText: {
    flex: 3,
    color: '#000000',
    textAlign: 'left',
    paddingLeft: 10,
  },
  nextBtn: {
    width: 20,
    height: 20,
  },
  columnWrap: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
  },
  mileageInputBlock: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    fontSize: 30,
    textAlign: 'center',
    margin: 10,
    color: '#000000',
    width: 200,
    height: 100,
  },
  textInputWrap: {
    width: 200,
    height: 120,
  },
  unitTextWrap: {
    alignSelf: 'center',
  },
  unitText: {
    fontSize: 15,
  },
});
