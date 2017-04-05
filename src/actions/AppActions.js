import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';

const AppActions = {
  setPlatform: (platform) => {
    AppDispatcher.dispatch({
      type: AppConstants.SET_PLATFORM,
      platform: platform
    });
  },
  setFB: (fb) => {
    AppDispatcher.dispatch({
      type: AppConstants.SET_FB,
      fb: fb
    });
  },
}

export default AppActions;
