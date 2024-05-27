import { Navbar as BootNavbar, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { selectors } from '../slices';
import routes from '../routes';
import logOut from '../helpers/logOut';

const Navbar = () => {
  const { t } = useTranslation();
  const token = useSelector(selectors.authSelectors.selectToken);
  const dispatch = useDispatch();

  return (
    <BootNavbar bg="white" expand="lg" className="shadow-sm">
      <div className="container">
        <BootNavbar.Brand as={Link} to={routes.homePage()}>
          {t('homePage')}
        </BootNavbar.Brand>
        {!!token && (
          <Button onClick={() => logOut(dispatch)}>{t('exit')}</Button>
        )}
      </div>
    </BootNavbar>
  );
};

export default Navbar;
