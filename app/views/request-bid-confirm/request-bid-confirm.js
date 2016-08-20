import React, { PropTypes } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import DmxAppShell from '../../common/components/app-shell/app-shell';
import styles from './request-bid-confirm.styles';

export default class DmxRequestBidView extends React.Component {

  static propTypes = {
    navigator: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  returnToAppraisalList() {
    this.props.navigator.resetTo({
      name: 'appraisal-list',
    });
  }

  render() {
    const { year, make, model } = this.props.route.data;
    return (
      <DmxAppShell
        headerShowMenuButton
        headerShowLeftButton={false}
        hasFooter={false}
        hasHeader
        navigator={this.props.navigator}
        route={this.props.route}
      >
        <View style={styles.container}>
          <View style={styles.contentWrap}>
            <Text style={styles.confirmationMessage}>
              {`You successfully requested bids for a ${year} ${make} ${model}.`}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.moreCtaWrap}
            onPress={() => this.returnToAppraisalList()}
          >
            <View style={styles.moreCta}>
              <Text style={styles.moreCtaText}>HOME</Text>
            </View>
          </TouchableOpacity>
        </View>
      </DmxAppShell>
    );
  }
}

module.exports = DmxRequestBidView;
