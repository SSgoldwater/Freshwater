import AppDispatcher from '../dispatcher/AppDispatcher';
import { EventEmitter } from 'events';
import MainConstants from '../constants/MainConstants';

var _feed = [{ title: "First Post" }];
var CHANGE_EVENT = "change";

class MainStore extends EventEmitter {
  emitChange = () => {
    this.emit(CHANGE_EVENT);
  }

  addChangeListener = (callback) => {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener = (callback) => {
    this.removeListener(CHANGE_EVENT, callback);
  }

  getFeed = () => {
    return _feed;
  }
}

const _MainStore = new MainStore();

_MainStore.dispatchToken = AppDispatcher.register((action) => {
  switch (action.type) {
    case MainConstants.ADD:
      const newData = { title: "Second Post" }
      _feed.push(newData);
      _MainStore.emitChange();
      break;
    default:
  }
})

export default _MainStore;
