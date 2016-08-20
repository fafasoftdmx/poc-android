import React, { PropTypes } from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import appraisalModel from '../../../common/services/models/appraisal-model';
import styles from './button-strip.styles';

const options = [
  {
    label: 'Below Avg',
    value: 1,
    style: styles.blue,
  },
  {
    label: 'Good',
    value: 2,
    style: styles.blue,
  },
  {
    label: 'Mint',
    value: 3,
    style: styles.blue,
  },
];
const count = options.length;

export default class DmxButtonStrip extends React.Component {

  static propTypes = {
    type: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedValue: false,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  onPress(val) {
    this.setState({
      selectedValue: val.val,
    });
    appraisalModel.saveRatings(val.type, val.val);
        // appraisalModel.update();
  }

  async fetchData() {
    this.setState({
      selectedValue: this.props.value,
    });
  }

  render() {
    const optionsButtons = [];
    let label = '';

    if (this.props.name !== '') {
      label = (
        <Text style={styles.heading}>
          {this.props.name}
        </Text>
      );
    }

    options.forEach((option, index) => {
      const buttonStyles = [styles.grade];
      const textStyles = [styles.text];

      if (index < count - 1) {
        buttonStyles.push(styles.separator);
      }

      if (option.value === this.state.selectedValue) {
        console.log(option);
        buttonStyles.push(option.style);
        textStyles.push(styles.selectedText);
        optionsButtons.push(<View key={`btn-strip-option${index}`} style={buttonStyles}>
          <Text style={textStyles}>{option.label}</Text>
        </View>);
      } else {
        const bindedOnPress = () => {
          this.onPress({
            val: option.value,
            type: this.props.type,
          });
        };

        optionsButtons.push(
          <TouchableOpacity
            key={`btn-strip-option${index}`}
            onPress={bindedOnPress}
          >
            <View style={buttonStyles}>
              <Text style={textStyles}>{option.label}</Text>
            </View>
          </TouchableOpacity>
        );
      }
    });

    return (
      <View style={[this.props.style]}>
        {label}
        <View style={styles.strip}>
          {optionsButtons}
        </View>
      </View>
    );
  }
}

DmxButtonStrip.propTypes = {
  name: React.PropTypes.string,
  style: View.propTypes.style,
  onChange: React.PropTypes.func,
};
DmxButtonStrip.defaultProps = {
  name: '',
  style: StyleSheet.create({}),
  onChange() {},
};
