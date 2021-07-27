import { NavigationActions, StackActions } from 'react-navigation';

let _navigator;

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

function navigate(routeName, params) {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    }),
  );
}

function back(key) {
  _navigator.dispatch(
    NavigationActions.back({
      key,
    }),
  );
}

const reset = (routeName, params, navigation) => {
  const action = StackActions.reset({
    index: 0,
    key: null,
    actions: [NavigationActions.navigate({ routeName, params })],
  });
  if (navigation) {
    return navigation.dispatch(action);
  }
  _navigator.dispatch(action);
};

const replace = (key, routeName) => {
  const action = StackActions.replace({
    key,
    routeName,
  });
  _navigator.dispatch(action);
};
// add other navigation functions that you need and export them

function getCurrentRoute() {
  let nav = _navigator.state.nav;
  console.log(`nav:`, nav);
  const currentRoute = nav.routes[nav.routes.length - 1].routeName;
  console.log('currentRoute: ', currentRoute);
  return currentRoute;
}

export default {
  navigate,
  back,
  setTopLevelNavigator,
  reset,
  replace,
  getCurrentRoute
};
