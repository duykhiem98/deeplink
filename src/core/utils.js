import { Platform, Dimensions } from 'react-native';

export const emailValidator = email => {
  const re = /\S+@\S+\.\S+/;

  if (!email || email.length <= 0) return 'Email cannot be empty.';
  if (!re.test(email)) return 'Ooops! We need a valid email address.';

  return '';
};

export const passwordValidator = password => {
  if (!password || password.length <= 0) return 'Password cannot be empty.';

  return '';
};

export const nameValidator = name => {
  if (!name || name.length <= 0) return 'Name cannot be empty.';

  return '';
};

export const isAndroid = Platform.select({
  android: true,
  ios: false,
});

export const isIphoneX = () => {
  const d = Dimensions.get('window');
  const isX = !!(Platform.OS === 'ios' && (d.height > 800 || d.width > 800));
  return isX;
};


export const isJSON = (text) => {
  if (typeof text !== "string") {
    return false;
  }
  try {
    JSON.parse(text);
    return true;
  }
  catch (error) {
    return false;
  }
}

export const knToKmh = (knValue) => {
  return (knValue * 1.852).toFixed(2);
}
export const mToKm = (mValue) => {
  return (mValue / 1000).toFixed(2);
}