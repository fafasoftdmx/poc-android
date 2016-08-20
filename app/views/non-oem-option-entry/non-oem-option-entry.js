import React, { PropTypes } from 'react';
import { Text, TextInput, View, DeviceEventEmitter } from 'react-native';
import DmxAppShell from '../../common/components/app-shell/app-shell';
import DMXCOLORS from '../../common/constants/colors';
import DmxFullWidthButton from '../../common/components/full-width-button/full-width-button';
import { default as summaryCommonStyles } from '../summary/summary.styles';
import styles from './non-oem-option-entry.styles';
import CustomSettingsHeader
  from '../../common/components/custom-settings-header/custom-settings-header';
import { SUMMARY_CUSTOM_OPTION_ADDED } from '../summary/summary-events';

export default class NonOemOptionEntry extends React.Component {

  static propTypes = {
    navigator: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      toView: 'options',
      keyboardShowing: false,
      currentText: '',
    };
  }

  updateOptionName(currentText) {
    this.setState({
      currentText,
    });
  }

  turnToPreviousView() {
    DeviceEventEmitter.emit(SUMMARY_CUSTOM_OPTION_ADDED, { newOption: this.state.currentText });
    this.props.navigator.pop();
  }

  render() {
    return (
      <DmxAppShell
        hasFooter={false}
        hasHeader={false}
        headerShowMenuButton
        collapseEnabled
        navigator={this.props.navigator}
      >
        <CustomSettingsHeader
          navigator={this.props.navigator}
          text="Add Custom Equipment"
        />
        <View style={summaryCommonStyles.summaryItemBodyListItemWrap}>
          <Text style={styles.unitTextWrap}>Name</Text>
          <TextInput
            style={styles.input}
            onChangeText={(e) => this.updateOptionName(e)}
            value={this.state.currentText}
            clearButtonMode="while-editing"
            placeholder="Enter option name"
            placeholderTextColor={DMXCOLORS.BLACK}
            autoCorrect={false}
          />
        </View>
        <View style={styles.saveBtn}>
          <DmxFullWidthButton
            buttonText="SAVE"
            buttonAction={() => this.turnToPreviousView()}
            buttonIsActive={!!this.state.currentText}
          />
        </View>
      </DmxAppShell>
    );
  }
}
