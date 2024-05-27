import { actions } from '../slices/authSlice';

export default (dispatch, payload) => {
  localStorage.setItem('user', JSON.stringify(payload));
  dispatch(actions.setAuth(payload));
};
