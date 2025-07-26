import { NavContainer, NavContent, Logo, DetailsContainer, NavTextLink } from './NavStyled';
// Logo //
import logo from '/public/logo.png';

const Nav = () => {
  return (
    <NavContainer>
      <NavContent>
        <Logo src={logo} alt="Logo" />
        <DetailsContainer>
          <NavTextLink>GitHub</NavTextLink>
        </DetailsContainer>
      </NavContent>
    </NavContainer>
  );
};

export default Nav;
