import { useState, useMemo } from 'react';
import { useMedia } from 'shared/hooks/useMedia';

import {
  AppHeader,
  HeaderContainer,
  MobileAuth,
  MobileContainer,
  OpenLinksButton,
} from './Header.styles';
import Logo from './Logo';
import Container from 'shared/components/Container';
import AuthNav from './AuthNav';
import Nav from './Nav';
import Icon from 'shared/components/Icon/Icon';
import UserNav from './UserNav';
import useAuth from 'shared/hooks/useAuth';
import { UserLink } from './UserNav/UserNav.styles';

const Header = () => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const { isLoggedIn } = useAuth();
  const screenSize = useMedia(
    ['(min-width: 1280px)', '(min-width: 768px)'],
    ['desktop', 'tablet'],
    'xs'
  );

  const handleLinkClick = () => {
    setIsMobileNavOpen(false);
  };

  const userBar = isLoggedIn ? (
    <UserNav handleLinkClick={handleLinkClick} />
  ) : (
    <AuthNav handleLinkClick={handleLinkClick} />
  );
  const nav = useMemo(() => <Nav handleLinkClick={handleLinkClick} />, []);

  const isDesktop = screenSize === 'desktop';
  const isTablet = screenSize === 'tablet';

  return (
    <AppHeader isMobileNavOpen={isMobileNavOpen}>
      <Container>
        <HeaderContainer>
          <Logo />
          {isDesktop && (
            <>
              {nav}
              {userBar}
            </>
          )}
          {!isTablet && !isDesktop && !isMobileNavOpen && isLoggedIn && (
            <UserLink to="/user" onClick={handleLinkClick}>
              <Icon id="user" h="28" w="28" />
            </UserLink>
          )}
          {isTablet && !isMobileNavOpen && userBar}
          {!isDesktop && (
            <>
              <OpenLinksButton
                isMobileNavOpen={isMobileNavOpen}
                onClick={() => setIsMobileNavOpen(current => !current)}
              >
                {isMobileNavOpen ? <Icon id="cross" /> : <Icon id="burger" />}
              </OpenLinksButton>
              {isMobileNavOpen && (
                <MobileContainer>
                  {!isTablet && <MobileAuth>{userBar}</MobileAuth>}
                  {nav}
                </MobileContainer>
              )}
            </>
          )}
        </HeaderContainer>
      </Container>
    </AppHeader>
  );
};

export default Header;
