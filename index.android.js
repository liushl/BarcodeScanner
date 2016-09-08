import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Vibration,
  View
} from 'react-native';
import BarcodeScanner from 'react-native-barcodescanner';
import ScanView from './ScanView';

class BarcodeScannerApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      barcode: '',
      cameraType: 'back',
      text: '请扫描滤芯二维码 ',
      torchMode: 'off',
      type: '',
    };
  }

  barcodeReceived(e) {
    if (e.data !== this.state.barcode || e.type !== this.state.type) Vibration.vibrate();
    hasRead = true;
    this.setState({
      barcode: e.data,
      text: `${e.data} (${e.type})`,
      type: e.type,
    });
  }

  creatView() {
    return (
      <View style={{ flex: 1, }}>
        <View style={styles.topTips}>
          <Text style={styles.tipsText}>请确保更换滤芯时净水器断电</Text>
        </View>

        <ScanView/>
        <View style={styles.bottomTips}>
          <Text style={styles.tipsText}>{this.state.text}</Text>
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>

        <BarcodeScanner
          onBarCodeRead={this.barcodeReceived.bind(this) }
          style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
          torchMode={this.state.torchMode}
          cameraType={this.state.cameraType}
          showViewFinder={false}>
          {this.creatView() }
        </BarcodeScanner>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topTips: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    right: 0,
    left: 0,
    top:50,
  },
  bottomTips: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    height: 50,
    bottom: 50,
    right: 0,
    left: 0,
  },
  tipsText: {
    fontSize: 16,
    color: 'white',
  },
});

AppRegistry.registerComponent('BarcodeScanner', () => BarcodeScannerApp);
