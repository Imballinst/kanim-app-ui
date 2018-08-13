import { applyMiddleware, createStore, compose } from 'redux';
import { offline } from '@redux-offline/redux-offline';
import offlineConfig from '@redux-offline/redux-offline/lib/defaults';
import axios from 'axios';
import logger from 'redux-logger';
import { persistStore } from 'redux-persist';
import { AsyncStorage } from 'react-native';
// Time helpers
import getTime from 'date-fns/getTime';
import differenceInDays from 'date-fns/differenceInDays';
// Middlewares, reducers, and versioners
import middlewares from './middlewares';
import combinedReducers from './reducers';
import getAppVersion from './helpers/AppVersion';

// Reused variables and functions
const storagePropertyName = 'reduxPersist:appVersion';
const setStore = (version, ts) => AsyncStorage.setItem(
  storagePropertyName,
  JSON.stringify({ version, ts })
);

const persistStorage = (store, options, callback) => {
  AsyncStorage.getItem(storagePropertyName)
    .then((itemValue) => {
      const getPersistedStore = () => persistStore(
        store,
        { storage: AsyncStorage, ...options },
        callback
      );
      const currentAppVersion = getAppVersion;

      if (itemValue) {
        // If version is identified
        let app;

        // Just in case itemValue is not a JSON string
        try {
          app = JSON.parse(itemValue);
        } catch (_e) {
          app = {};
        }

        const { version, ts } = app;
        const currentDate = new Date();
        const lastDate = ts ? new Date(ts) : currentDate;
        const isExpire = differenceInDays(currentDate, lastDate) >= 1;

        if (version !== currentAppVersion || isExpire || __DEV__) {
          // [TODO]: don't use purge because it may not work asynchronously
          // getPersistedStore().purge();

          setStore(currentAppVersion, getTime(new Date()));
        } else {
          getPersistedStore(); // .purge to clean the offline data
        }
      } else {
        // If no, define one
        setStore(currentAppVersion, getTime(new Date()));
      }
    });
};

const reduxOfflineConfig = {
  ...offlineConfig,
  persist: persistStorage,
  effect: effect => axios(effect),
  discard: (error, _action, retries) => {
    const { response } = error;

    return (response && response.status >= 400) || retries > 10;
  },
};

const myMiddlewares = [...middlewares];

if (__DEV__) {
  myMiddlewares.push(logger);
}

const store = createStore(
  combinedReducers,
  compose(
    applyMiddleware(...myMiddlewares),
    offline(reduxOfflineConfig)
  )
);

export default store;
