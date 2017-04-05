import AppDispatcher from '../dispatcher/AppDispatcher';
import { EventEmitter } from 'events';
import AppConstants from '../constants/AppConstants';

const CHANGE_EVENT = "change";

class AppStore extends EventEmitter {
  constructor(props) {
    super(props);

    this._platform = null;
  }

  emitChange = () => {
    this.emit(CHANGE_EVENT);
  }

  addChangeListener = (callback) => {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener = (callback) => {
    this.removeListener(CHANGE_EVENT, callback);
  }

  getPlatform = () => {
    console.log('getPlatform');
    return this._platform;
  }

  setPlatform = (platform) => {
    console.log('setPlatform');
    this._platform = platform;
  }
}

const _AppStore = new AppStore();

_AppStore.disptachToken = AppDispatcher.register((payload) => {
  switch (payload.type) {
    case AppConstants.SET_PLATFORM:
      _AppStore.setPlatform(payload.platform);
      _AppStore.emitChange();
      break;
    default:
  }
})

export default _AppStore;
