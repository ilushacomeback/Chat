import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { actions } from '../slices';
import AuthContext from './AuthContext';

export const ContextProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { setAuth, removeAuth } = actions;

  const logIn = (payload) => {
    localStorage.setItem('user', JSON.stringify(payload));
    dispatch(setAuth(payload));
  };

  const logOut = () => {
    localStorage.removeItem('user');
    dispatch(removeAuth());
  };

  const memoAuth = useMemo(() => ({ logIn, logOut }), [logIn, logOut]);

  return (
    <AuthContext.Provider value={memoAuth}>
      {children}
    </AuthContext.Provider>
  );
};

export default ContextProvider;
