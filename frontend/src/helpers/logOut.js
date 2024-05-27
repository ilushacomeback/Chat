import { actions } from '../slices/authSlice';

export default (dispatch) => {
  localStorage.removeItem('user');
  dispatch(actions.removeAuth());
};
