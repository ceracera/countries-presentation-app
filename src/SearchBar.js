import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faSearch } from '@fortawesome/free-solid-svg-icons'
import { cornerRadius } from './util';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleFilterChange = this.handleFilterChange.bind(this);
  }

  handleFilterChange(e) {
    this.props.onFilterChange(e.target.value);
  }

  render() {
    return (
      <StyledForm>
        { <StyledSearchIconWrapper><FontAwesomeIcon icon={faSearch} /></StyledSearchIconWrapper> }
        <StyledInput
          type="text"
          placeholder="Search for a country..."
          value={this.props.filter}
          onChange={this.handleFilterChange}
        />
        { this.props.filter !== '' && <span onClick={this.handleFilterChange}><FontAwesomeIcon icon={faTimes} /></span> }
      </StyledForm>
    );
  }
}

const StyledSearchIconWrapper = styled.span`
  position: absolute;
  left: 1.5rem;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
`

const StyledForm = styled.form`
  position: relative;

  @media (max-width: 703px) {
    width: 100%;
  }
`

const StyledInput = styled.input`
  padding: 1.1rem 1.75rem 1.1rem 3.5rem;
  box-sizing: border-box;
  background: ${props => props.theme.backgroundBoxes};
  outline: none;
  border: none;
  color: ${props => props.theme.color};
  border-radius: ${cornerRadius};
  font-size: 0.875rem;
  width: 420px;
  box-shadow: ${props => props.theme.dropShadow.normal};
  transition: 0.3s all;

  &:hover,
  &:focus {
    box-shadow: ${props => props.theme.dropShadow.raised};
    background-color: ${props => props.theme.backgroundBoxesHover};
  }

  &::placeholder {
    color: ${props => props.theme.color};
    opacity: 1;
  }

  & + span {
    position: absolute;
    right: 1.25rem;
    top: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    cursor: pointer;

    svg {
      padding: 0.5rem;
    }
  }

  @media (max-width: 1041px) {
    width: 320px;
  }

  @media (max-width: 703px) {
    width: 100%;
    font-size: 0.75rem;
  }
`

export default SearchBar;
