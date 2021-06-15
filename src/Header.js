import styled from 'styled-components';
import { Wrapper } from './util';

function Header(props) {
  return (
    <StyledHeader>
      <StyledWrapper>
        <h1>Where in the world?</h1>
        {props.children}
      </StyledWrapper>
    </StyledHeader>
  );
}

export default Header;

const StyledHeader = styled.header`
  background-color: ${props => props.theme.backgroundBoxes};
  padding: 1.25rem 0;
  box-shadow: ${props => props.theme.dropShadow.normal};
  transition: background 0.3s;

  h1 {
    font-size: 1.5rem;
    font-weight: 800;
    margin: 0;
  }

  @media (max-width: 703px) {
    padding: 1.875rem 0;

    h1 {
      font-size: 0.875rem;
    }
  }
`

const StyledWrapper = styled(Wrapper)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
