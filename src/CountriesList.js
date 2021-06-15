import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import RegionSelector from './RegionSelector';
import {
  Wrapper,
  cornerRadius,
  formatPopulation,
  LoadingSpinner,
} from './util';
import SearchBar from './SearchBar';

function ListItem(props) {
  return (
    <StyledListItem>
      <Link to={`/country/${props.alpha3Code}`}>
        <Flag src={props.flag} alt={`flag of ${props.name}`} />
        <CountryDetails>
          <h2>{props.name}</h2>
          <p><span>Population:</span> {formatPopulation(props.population)}</p>
          <p><span>Region:</span> {props.region}</p>
          <p><span>Capital:</span> {props.capital}</p>
        </CountryDetails>
      </Link>
    </StyledListItem>
  );
}

const StyledListItem = styled.div`
  border-radius: ${cornerRadius};
  background-color: ${props => props.theme.backgroundBoxes};
  overflow: hidden;
  max-width: 265px;
  padding: 0;
  margin-bottom: 73px;
  margin-right: 73px;
  box-shadow: ${props => props.theme.dropShadow.normal};
  transition: background 0.3s, box-shadow 0.3s, transform 0.3s;

  &:hover {
    box-shadow: ${props => props.theme.dropShadow.raised};
    background-color: ${props => props.theme.backgroundBoxesHover};
    transform: translateY(-5px);
  }

  &:nth-child(4n) {
    margin-right: 0;
  }

  @media (max-width: 1380px) {
    &:nth-child(4n) {
      margin-right: 73px;
    }

    &:nth-child(3n) {
      margin-right: 0;
    }
  }

  @media (max-width: 1041px) {
    &:nth-child(3n) {
      margin-right: 73px;
    }

    &:nth-child(2n) {
      margin-right: 0;
    }
  }

  @media (max-width: 703px) {
    max-width: 100%;
    margin-right: 0;
    margin-bottom: 40px;

    &:nth-child(3n) {
      margin-right: 0;
    }
  }
`

const Flag = styled.img`
  max-width: 100%;
`

const CountryDetails = styled.div`
  padding: 1.5rem;

  h2 {
    margin: 0;
    margin-bottom: 1rem;
    font-weight: 800;
    font-size: 1.1rem;
  }

  p {
    font-size: 0.875rem;
    margin: 0.4rem 0;
    font-weight: 300;

    span {
      font-weight: 600;
    }
  }
`

class CountriesList extends React.Component {
  render() {
    function filterByName(arr, query) {
      return arr.filter(function(el) {
        return el.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
      })
    }
    function filterByRegion(arr, query) {
      return arr.filter(function(el) {
        return el.region === query
      })
    }
    function filterCountries(arr, name, region) {
      let countries = arr
      if (region !== '') {
        countries = filterByRegion(countries, region)
      }
      countries = filterByName(countries, name)
      return countries
    }
    const { countries, filterName, filterRegion } = this.props
    const filteredCountries = filterCountries(countries, filterName, filterRegion)
    return (
      <>
        { filteredCountries.length < 1
          ? <p>Ooops! There is no such country</p>
          : <StyledCountriesList>
          { filteredCountries.map(item => (
              <ListItem {...item} key={item.alpha3Code} />
            )) }
          </StyledCountriesList>
        }
      </>
    );
  }
}

const StyledCountriesList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  padding: 0;
  margin: 0;

  @media (max-width: 703px) {
    padding: 0 2.5rem;
  }
`

class FilterableCountriesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterName: '',
      filterRegion: '',
      error: null,
      isLoaded: false,
      countries: []
    };
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.handleRegionChange = this.handleRegionChange.bind(this);
  }

  componentDidMount() {
    fetch("https://restcountries.eu/rest/v2/all?fields=alpha3Code;name;population;region;capital;flag")
      .then(response => response.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            countries: result
          });
        },
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  handleFilterChange(filter) {
    if (filter === undefined) { // handle clear filter
      filter = '';
    }
    this.setState({
      filterName: filter
    })
  }

  handleRegionChange(region) {
    this.setState((prevState) => ({
      filterRegion: region === prevState.filterRegion ? '' : region
    }))
  }

  render() {
    const { filterName, filterRegion, error, isLoaded, countries } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <LoadingSpinner text="Loading countries..." />;
    } else {
      return (
        <Wrapper>
          <FilterWrapper>
            <SearchBar
              filter={filterName}
              onFilterChange={this.handleFilterChange}
            />
            <RegionSelector
              region={filterRegion}
              onRegionChange={this.handleRegionChange}
            />
          </FilterWrapper>
          <CountriesList
            countries={countries}
            filterName={filterName}
            filterRegion={filterRegion}
          />
        </Wrapper>
      );
    }
  }
}

export default FilterableCountriesList;

const FilterWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 48px 0;

  @media (max-width: 703px) {
    flex-direction: column;
    align-items: flex-start;
    margin-top: 1.5rem;
    margin-bottom: 33px;
  }
`
