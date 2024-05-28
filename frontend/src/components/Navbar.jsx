import { useContext } from 'react';
import { Navbar as BootNavbar, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { selectors } from '../slices';
import routes from '../routes';
import AuthContext from '../context/AuthContext';

const Navbar = () => {
  const { logOut } = useContext(AuthContext);
  const { t } = useTranslation();
  const token = useSelector(selectors.authSelectors.selectToken);

  return (
    <BootNavbar bg="white" expand="lg" className="shadow-sm">
      <div className="container">
        <BootNavbar.Brand as={Link} to={routes.homePage()}>
          {t('homePage')}
        </BootNavbar.Brand>
        {!!token && (
          <Button onClick={logOut}>{t('exit')}</Button>
        )}
      </div>
    </BootNavbar>
  );
};

export default Navbar;
