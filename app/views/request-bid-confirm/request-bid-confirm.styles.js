import { StyleSheet } from 'react-native';
import DMXCOLORS from '../../common/constants/colors';
import FONTSIZES from '../../common/constants/font-sizes';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  dmxLogoWrap: {
    flex: 1,
    justifyContent: 'center',
  },
  dmxLogo: {
    fontFamily: 'dmx-font',
    fontSize: FONTSIZES.getScaledSize(80),
    color: DMXCOLORS.BLUE,
  },
  contentWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sparklingCar: {
    fontFamily: 'dmx-font',
    textAlign: 'center',
    color: DMXCOLORS.BLUE,
    fontSize: FONTSIZES.getScaledSize(80),
  },
  confirmationMessage: {
    color: DMXCOLORS.GREYLIGHT,
    fontSize: FONTSIZES.h1,
    textAlign: 'center',
  },
  moreCtaWrap: {
    flex: 1,
    justifyContent: 'center',
  },
  moreCta: {
    borderColor: DMXCOLORS.BLUE,
    borderWidth: 2,
    borderRadius: 50,
    padding: 20,
  },
  moreCtaText: {
    color: DMXCOLORS.BLUE,
    fontSize: FONTSIZES.h2,
  },
});

export default styles;
