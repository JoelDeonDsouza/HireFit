import { NavContainer, NavContent, Logo, DetailsContainer, NavTextLink } from './NavStyled';
// Logo //
import logo from '/logo.png';

const Nav = () => {
  return (
    <NavContainer>
      <NavContent>
        <Logo src={logo} alt="Logo" />
        <DetailsContainer>
          <NavTextLink href="https://github.com/JoelDeonDsouza/HireFit">GitHub</NavTextLink>
        </DetailsContainer>
      </NavContent>
    </NavContainer>
  );
};

export default Nav;
