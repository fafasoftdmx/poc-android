import React, { PropTypes } from 'react';
import { View, DeviceEventEmitter } from 'react-native';
import DmxButtonStrip from '../../common/components/button-strip/button-strip';
import DmxAppShell from '../../common/components/app-shell/app-shell';
import styles from './ratings.styles';
import { SUMMARY_RATING_UPDATED } from '../summary/summary-events';

export default class RatingsView extends React.Component {

  static propTypes = {
    navigator: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      buttonText: 'CONFIRM',
    };
  }

  turnToPreviousView() {
    DeviceEventEmitter.emit(SUMMARY_RATING_UPDATED);
    this.props.navigator.pop();
  }

  render() {
    const ratings = this.props.route.data || {};
    return (
      <DmxAppShell
        headerShowMenuButton
        hasFooter
        hasHeader
        headerText="Ratings"
        buttonText={this.state.buttonText}
        buttonAction={() => this.turnToPreviousView()}
        buttonIsActive
        navigator={this.props.navigator}
        route={this.props.route}
      >
        <View style={styles.marginTop}>
          <DmxButtonStrip
            style={styles.feature}
            value={ratings.paint}
            type="paint"
            name="Paint"
          />
          <DmxButtonStrip
            style={styles.feature}
            value={ratings.tires}
            type="tires"
            name="Tires"
          />
          <DmxButtonStrip
            style={styles.feature}
            value={ratings.interior}
            type="interior"
            name="Interior"
          />
          <DmxButtonStrip
            style={styles.feature}
            value={ratings.body}
            type="body"
            name="Body"
          />
        </View>
      </DmxAppShell>
    );
  }
}
