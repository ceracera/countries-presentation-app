import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

export function formatPopulation(pop) {
  return new Intl.NumberFormat('en-US').format(pop)
}

export const cornerRadius = "5px";

export const dropShadow = {
  normal: "0px 0px 15px 0px rgba(0,0,0,0.15)",
  raised: "0px 0px 35px 0px rgba(0,0,0,0.35)"
}

export const color = {
  darkBlue: 'hsl(209, 23%, 22%)',
  darkBlueLighter: 'hsl(209, 23%, 25%)', // added for hover etc
  veryDarkBlue: 'hsl(207, 26%, 17%)',
  veryDarkBlu: 'hsl(200, 15%, 8%)',
  darkGray: 'hsl(0, 0%, 52%)',
  lightGray: 'hsl(0, 0%, 91%)', // added for clarity
  veryLightGray: 'hsl(0, 0%, 98%)',
  white: 'hsl(0, 0%, 100%)',
}

export const darkTheme = {
  name: 'dark',
  background: color.veryDarkBlue,
  backgroundBoxes: color.darkBlue,
  backgroundBoxesHover: color.darkBlueLighter,
  color: color.white,
  dropShadow: {
    normal: "0px 0px 15px 0px rgba(0,0,0,0.15)",
    raised: "0px 0px 35px 0px rgba(0,0,0,0.35)"
  },
};

export const lightTheme = {
  name: 'light',
  background: color.lightGray,
  backgroundBoxes: color.veryLightGray,
  backgroundBoxesHover: color.veryLightGray,
  color: color.veryDarkBlue,
  dropShadow: {
    normal: "0px 0px 5px 0px rgba(0,0,0,0.05)",
    raised: "0px 0px 15px 0px rgba(0,0,0,0.15)"
  },
};

export function Wrapper(props) {
  return (
    <StyledWrapper {...props}>{props.children}</StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  max-width: 1280px;
  margin: 0 auto;

  @media (max-width: 1380px) {
    max-width: 941px;
  }

  @media (max-width: 1041px) {
    max-width: 603px;
  }

  @media (max-width: 703px) {
    max-width: 503px;
    padding: 0 1rem;
  }
`

export function ButtonLink(props) {
  return (
    <StyledButtonLink {...props}>{props.children}</StyledButtonLink>
  );
}

const StyledButtonLink = styled(Link)`
  display: inline-block;
  outline: none;
  border: none;
  padding: 0.4rem 1.5rem;
  color: ${props => props.theme.color};
  cursor: pointer;
  background-color: ${props => props.theme.backgroundBoxes};
  transition: 0.3s all;
  border-radius: ${cornerRadius};
  box-shadow: ${props => props.theme.dropShadow.normal};


  &:hover {
    background-color: ${props => props.theme.backgroundBoxesHover};
    box-shadow: ${dropShadow.raised};
    box-shadow: ${props => props.theme.dropShadow.raised};
  }

`

export function LoadingSpinner(props) {
  return (
    <LoadingWrapper>
      <FontAwesomeIcon icon={faSpinner} spin />
      <p>{props.text}</p>
    </LoadingWrapper>
  )
}

const LoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 0 auto;
  font-size: 4rem;
  height: 300px;

  svg {
    opacity: 0.3;
  }

  p {
    font-size: 1rem;
    opacity: 0.7;
  }
`
