import AppDispatcher from '../dispatcher/AppDispatcher';
import AuthConstants from '../constants/AuthConstants';

const AuthActions = {
  setUser: (userData) => {
    AppDispatcher.dispatch({
      type: AuthConstants.SET_USER,
      userData: userData
    });
  }
}

export default AuthActions;
