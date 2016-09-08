import React, {
    Component,
    PropTypes,
} from 'react';
import {
    ActivityIndicator,
    Platform,
    StyleSheet,
    View,
    Animated,
    Easing,
} from 'react-native';

class ScanView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fadeAnim: new Animated.Value(0),
        }
    }

    componentDidMount() {
        this.startAnimation();
    }

    startAnimation() {
        this.state.fadeAnim.setValue(0);
        Animated.timing(
            this.state.fadeAnim, {
                toValue: 1,
                duration: 1000,
                easing: Easing.linear
            }).start(() => this.startAnimation());

    }
  
    getEdgeColor() {
        return ({
            borderColor: '#2bcfff',
        });
    }

    getSizeStyles() {
        return ({
            height: 250,
            width: 250,
        });
    }

    getEdgeSizeStyles() {
        return ({
            height: 20,
            width: 20,
        });
    }

    renderLoadingIndicator() {
        return (
            <Animated.View
                style={{
                    backgroundColor: 'transparent',
                    alignItems: 'center',
                    position: 'absolute',
                    top: 10,
                    right: 0,
                    left: 0,
                    bottom: 10,
                    transform: [{
                        translateY: this.state.fadeAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, 250]
                        }),
                    }],
                }}>
                {this.props.children}
                <View style={{ width: 200, height: 2, backgroundColor: '#2bcfff' }}/>
            </Animated.View>
        );
    }

    render() {
        return (
            <View style={[styles.container]}>
                <View style={[styles.viewfinder]}>
                    <View style={[
                        this.getEdgeColor(),
                        this.getEdgeSizeStyles(),
                        styles.topLeftEdge,
                        {
                            borderLeftWidth: this.props.borderWidth,
                            borderTopWidth: this.props.borderWidth,
                        }
                    ]} />
                    <View style={[
                        this.getEdgeColor(),
                        this.getEdgeSizeStyles(),
                        styles.topRightEdge,
                        {
                            borderRightWidth: this.props.borderWidth,
                            borderTopWidth: this.props.borderWidth,
                        }
                    ]} />
                    {this.renderLoadingIndicator() }
                    <View style={[
                        this.getEdgeColor(),
                        this.getEdgeSizeStyles(),
                        styles.bottomLeftEdge,
                        {
                            borderLeftWidth: this.props.borderWidth,
                            borderBottomWidth: this.props.borderWidth,
                        }
                    ]} />
                    <View style={[
                        this.getEdgeColor(),
                        this.getEdgeSizeStyles(),
                        styles.bottomRightEdge,
                        {
                            borderRightWidth: this.props.borderWidth,
                            borderBottomWidth: this.props.borderWidth,
                        }
                    ]} />
                </View>
            </View>
        );
    }
};

ScanView.propTypes = {
    backgroundColor: PropTypes.string,
    borderWidth: PropTypes.number,
    borderLength: PropTypes.number,
    color: PropTypes.string,
    height: PropTypes.number,
    isLoading: PropTypes.bool,
    width: PropTypes.number,
};

ScanView.defaultProps = {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderLength: 20,
    color: 'white',
    height: 200,
    isLoading: false,
    width: 200,
};

var styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: 'transparent',
    },
    viewfinder: {
        width: 250,
        height: 250,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    topLeftEdge: {
        position: 'absolute',
        top: 0,
        left: 0,
    },
    topRightEdge: {
        position: 'absolute',
        top: 0,
        right: 0,
    },
    bottomLeftEdge: {
        position: 'absolute',
        bottom: 0,
        left: 0,
    },
    bottomRightEdge: {
        position: 'absolute',
        bottom: 0,
        right: 0,
    },
});

module.exports = ScanView;
