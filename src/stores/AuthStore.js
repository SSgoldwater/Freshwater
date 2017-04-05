import AppDispatcher from '../dispatcher/AppDispatcher';
import { EventEmitter } from 'events';
import AuthConstants from '../constants/AuthConstants';

const CHANGE_EVENT = "change";

class AuthStore extends EventEmitter {
  constructor(props) {
    super(props);

    this._currentUser = {
      id: "",
      token: "",
      name: "none",
      picUrl: ""
    }
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

  getUser = () => {
    return this._currentUser;
  }

  setUser = (user) => {
    this._currentUser = user;
  }
}

const _AuthStore = new AuthStore();

_AuthStore.dispatchToken = AppDispatcher.register((payload) => {
  switch (payload.type) {
    case AuthConstants.SET_USER:
      _AuthStore.setUser(payload.userData);
      _AuthStore.emitChange();
      break;
    default:
  }
})

export default _AuthStore;
