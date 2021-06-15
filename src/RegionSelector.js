import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faAngleDown,
  faAngleUp,
  faCheck,
} from '@fortawesome/free-solid-svg-icons'
import { cornerRadius } from './util';

class RegionSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleRegionChange = this.handleRegionChange.bind(this);
  }

  handleRegionChange(e) {
    e.preventDefault();
    this.props.onRegionChange(e.target.value);
  }

  handleOpen() {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen
    }));
  }

  render() {
    const regions = ["Africa", "Americas", "Asia", "Europe", "Oceania", "Polar"];
    const selectedRegion = this.props.region;
    return (
      <SelectorMenu>
        <SelectorOpener onClick={this.handleOpen}><span>Filter by Region</span><FontAwesomeIcon icon={this.state.isOpen ? faAngleUp : faAngleDown} /></SelectorOpener>
        { this.state.isOpen &&
          <SelectorList>
            {regions.map(region => (
              <li key={region}>
                <SelectorItem
                  value={region}
                  onClick={this.handleRegionChange}
                >
                  <span>{region}</span> {region === selectedRegion ? <FontAwesomeIcon icon={faCheck} /> : ''}
                </SelectorItem>
              </li>
            ))}
          </SelectorList>
        }
      </SelectorMenu>
    );
  }
}

export default RegionSelector;

const SelectorMenu = styled.div`
  position: relative;
  width: 200px;
  z-index: 1;

  @media (max-width: 703px) {
    margin-top: 40px;
  }
`

const SelectorList = styled.ul`
  position: absolute;
  top: 55px;
  width: 100%;
  padding: 0.5rem 0;
  margin: 0;
  list-style: none;
  position: absolute;
  background: ${props => props.theme.backgroundBoxes};
  border-radius: ${cornerRadius};
  box-shadow: ${props => props.theme.dropShadow.raised};

  li {
    width: 100%;
  }

  @media (max-width: 703px) {
    top: 53px;
  }
`

const SelectorItem = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  outline: none;
  border: none;
  padding: 0.4rem 1.5rem;
  color: ${props => props.theme.color};
  cursor: pointer;
  background-color: ${props => props.theme.backgroundBoxes};
  transition: 0.3s all;
  text-align: left;

  &:hover {
    background-color: ${props => props.theme.background};
  }

  span, svg {
    pointer-events: none;
  }

  svg {
    opacity: 0.35;
  }

  @media (max-width: 703px) {
    font-size: 0.75rem;
    padding: 0.3rem 1.5rem;
  }
`

const SelectorOpener = styled(SelectorItem)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 1.1rem 1.5rem;
  border-radius: ${cornerRadius};
  background-color: ${props => props.theme.backgroundBoxes};
  box-shadow: ${props => props.theme.dropShadow.normal};
  transition: 0.3s all;

  &:hover {
    box-shadow: ${props => props.theme.dropShadow.raised};
    background-color: ${props => props.theme.backgroundBoxesHover};
  }

  svg {
    opacity: 1;
  }
`

