import { Provider } from 'react-redux';
import React, { PureComponent } from 'react';
import { Text, YellowBox, UIManager, Linking, BackHandler } from 'react-native';
import codePush from "react-native-code-push";
import Navigator from './src/navigation/Navigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { enableScreens } from 'react-native-screens';
import RNExitApp from 'react-native-exit-app';

import Notify from './src/onesignal';

import * as Sentry from '@sentry/react-native';
import Connection from './src/api/connection';
import configureStore from './src/redux/configureStore';
import NavigationService from './src/navigation/NavigationService';
import { Alert, Loading } from './src/components';
import LoadingIndicator from './src/components/LoadingIndicator';
import { _global } from './src/core/global';
import { setFont } from './src/common/utils';
import { updateCodepushData } from './src/redux/actions/codepush';
import Version from './Version';

enableScreens();

Text.allowFontScaling = false;

Sentry.init({
  dsn: 'https://2ee308573f574771b121aa2d8e2b77a5@o127943.ingest.sentry.io/5759262',
});

// Set font family default
setFont('Nunito');

YellowBox.ignoreWarnings([
  'Warning: isMounted(...) is deprecated',
  'Module RCTImageLoader',
]);

class App extends PureComponent {
  constructor(props) {
    super(props);
    UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

    this.state = {
      store: configureStore(() => {
        Connection.init(this.state.store);

        // try {
        //   let config = this.state.store.getState().config;
        //   if (config) {
        //     const { token } = config;
        //     console.log(`configureStore completed`, token);
        //     if (token) {
        //       this.state.store.dispatch(inited());
        //     } else {
        //       NavigationService.navigate('Login');
        //     }
        //   }
        // } catch (e) {
        //   console.log(`configureStore:`, e);
        // }
      })
    }

    this.CodePushState = {
      status: codePush.SyncStatus.CHECKING_FOR_UPDATE,
      progress: 0
    }
  }

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this._handleBackButton);

    Linking
      .getInitialURL()
      .then(url => this.handleOpenURL({ url }))
      .catch(console.error);

    Linking.addEventListener('url', this.handleOpenURL);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this._handleBackButton);

    Linking.removeEventListener('url', this.handleOpenURL);
  }

  handleOpenURL({ url }) {
    console.log(`event.url:`, url);
    if (!url) return;
    let navigateProduct = url.includes("/product/");
    if (!!navigateProduct) {
      let arr = url.split('/');
      console.log(`product id:`, arr, arr[arr.length - 1]);
      NavigationService.navigate("productDetail", { id: arr[arr.length - 1] });
    } else {
      let navigatehome = url.includes("/home");
      if (!!navigatehome) NavigationService.reset('homeStack');
    }

    // this.props.navigation.navigate("productDetail", { id: item.id });
    // do something with the url, in our case navigate(route)
  }
  // navigate = (url) => { // E
  //   const { navigate } = this.props.navigation;
  //   const route = url.replace(/.*?:\/\//g, '');
  //   const id = route.match(/\/([^\/]+)\/?$/)[1];
  //   const routeName = route.split('/')[0];

  //   if (routeName === 'people') {
  //     navigate('People', { id, name: 'chris' })
  //   };
  // }

  // renderDownloadPackage = () => {
  //   return (
  //     <Version />
  //   )
  // }

  _handleBackButton = () => {
    const route = NavigationService.getCurrentRoute();
    console.log('_handleBackButton', route);
    switch (route) {
      case 'homeStack':
        console.log(`exit`);
        RNExitApp.exitApp();
        return true;
      default:
        return false;
    }
  }

  codePushStatusDidChange(status) {
    this.CodePushState = {
      ...this.CodePushState,
      status: status,
    }

    if (this.state.store) {
      this.state.store.dispatch(updateCodepushData(this.CodePushState))
    }

    switch (status) {
      case codePush.SyncStatus.CHECKING_FOR_UPDATE:
        // console.log("codePush::Checking for updates.");
        break;
      case codePush.SyncStatus.DOWNLOADING_PACKAGE:
        // console.log("codePush::Downloading package.");
        // _global.Alert.alert({
        //   renderContent: this.renderDownloadPackage,
        //   width: 280
        // })
        break;
      case codePush.SyncStatus.INSTALLING_UPDATE:
        // _global.Alert.close()
        // console.log("codePush::Installing update.");
        break;
      case codePush.SyncStatus.UP_TO_DATE:
        // console.log("codePush::Up-to-date.");
        break;
      case codePush.SyncStatus.UPDATE_INSTALLED:
        // _global.Alert.close()
        // console.log("codePush::Update installed. ");
        break;
    }
  }

  codePushDownloadDidProgress(progress) {
    this.CodePushState = {
      ...this.CodePushState,
      progress: progress && progress.receivedBytes && progress.totalBytes && progress.totalBytes != 0 ? (progress.receivedBytes * 100 / progress.totalBytes) : 0
    }
    if (this.state.store) {
      this.state.store.dispatch(updateCodepushData(this.CodePushState))
    }
    // console.log('codePush::', progress.receivedBytes + " of " + progress.totalBytes + " received.");
  }

  render() {
    const { store } = this.state;
    return (
      <Provider store={store}>
        <SafeAreaProvider
          style={{ flex: 1 }}
          forceInset={{ top: 'never' }} >
          <Navigator
            ref={router => NavigationService.setTopLevelNavigator(router)}
          />
          <Notify />
          <Alert ref={ref => _global.Alert = ref} />
          {/* <Loading ref={ref => _global.Loading = ref} loadingRef /> */}
          <LoadingIndicator />
          <Version />
        </SafeAreaProvider>
      </Provider>
    );
  }
}

export default App;

// export default codePush({
//   checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
//   installMode: codePush.InstallMode.ON_NEXT_RESTART,
//   updateDialog: {
//     title: 'Cập nhật dữ liệu',
//     // optionalUpdateMessage: 'Đồng ý',
//     // optionalInstallButtonLabel: 'Cài đặt',
//     // optionalIgnoreButtonLabel: 'Bỏ qua',
//     // appendReleaseDescription: true,
//     // descriptionPrefix: 'Mô tả: ',
//     mandatoryContinueButtonLabel: 'Tiếp tục',
//     mandatoryUpdateMessage: 'Vui lòng nhấn Tiếp tục để tải xuống dữ liệu nhất. Ứng dụng sẽ tự động khởi động lại sau khi tải hoàn tất.'
//   }
// })(App);
