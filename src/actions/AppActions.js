import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';

const AppActions = {
  setPlatform: (platform) => {
    AppDispatcher.dispatch({
      type: AppConstants.SET_PLATFORM,
      platform: platform
    });
  }
}

export default AppActions;
