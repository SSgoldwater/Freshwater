import AppDispatcher from '../dispatcher/AppDispatcher';
import MainConstants from '../constants/MainConstants';

const MainActions = {
  addSecond: () => {
    AppDispatcher.dispatch({
      type: MainConstants.ADD
    });
  }
}

export default MainActions;
