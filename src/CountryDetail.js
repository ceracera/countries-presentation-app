import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import {
  ButtonLink,
  Wrapper,
  formatPopulation,
  LoadingSpinner,
  dropShadow,
} from './util';

function stringFromArray(arr, propertyName, separator) {
  let stringList = '';
  arr.map(function(el, i) {
    stringList += propertyName ? el[propertyName] : el;
    if (arr.length > i+1) {
      stringList += separator || ", ";
    }
    return stringList;
  })
  return stringList;
}

function getNamesFromCodes(codes) {
  if (codes.length < 1) {
    return ['an island'];
  }
  return fetch(`https://restcountries.eu/rest/v2/alpha?codes=${stringFromArray(codes, 0, ";")}&fields=name;alpha3Code`)
    .then(response => response.json())
}

function CountryDetail() {
  const [country, setCountry] = useState({ country: {} })
  const [borders, setBorders] = useState({ borders: [] })
  const [loading, setLoading] = useState(true)
  let { id } = useParams();

  useEffect(() => {
    setLoading(true);
    fetch(`https://restcountries.eu/rest/v2/alpha/${id}`)
      .then(response => response.json())
      .then(data => { setCountry({country: data}); return data })
      .then(data => getNamesFromCodes(data.borders))
      .then(data => setBorders({borders: data}))
      .then(data => setLoading(false))
  }, [id]);

  return (
    <Wrapper>
      <BackButtonLink large="true" to="/"><FontAwesomeIcon icon={faArrowLeft} /> Back</BackButtonLink>

        {!loading
        ? <CountryWrapper>
            <Flag src={country.country.flag} alt={`flag of ${country.country.name}`} />
            <CountryInfo>
              <h2>{country.country.name}</h2>

              <CountryDetails>
                <DetailsColumn>
                  <p><span>Native Name:</span> {country.country.nativeName}</p>
                  <p><span>Population:</span> {formatPopulation(country.country.population)}</p>
                  <p><span>Region:</span> {country.country.region}</p>
                  <p><span>Subregion:</span> {country.country.subregion}</p>
                  <p><span>Capital:</span> {country.country.capital}</p>
                </DetailsColumn>
                <DetailsColumn>
                  <p><span>Top Level Domain:</span> {country.country.topLevelDomain}</p>
                  <p><span>Currencies:</span> {stringFromArray(country.country.currencies, "name")}</p>
                  <p><span>Languages:</span> {stringFromArray(country.country.languages, "name")}</p>
                </DetailsColumn>
              </CountryDetails>

              <BorderCountries>
                <p><span>Border Countries:</span> {
                  borders.borders[0].name
                  ? borders.borders.map(el => (<BorderButtonLink key={el.alpha3Code} to={el.alpha3Code}>{el.name}</BorderButtonLink>))
                  : ''
                }</p>
              </BorderCountries>

            </CountryInfo>
          </CountryWrapper>
        : <LoadingSpinner text="Loading..."/>
      }
    </Wrapper>
  )
}

export default CountryDetail;

const CountryWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  h2 {
    margin-bottom: 1rem;
    margin-top: 2rem;
    font-weight: 800;
    font-size: 2.1rem;
  }

  @media (max-width: 703px) {
    flex-direction: column;

    h2 {
      font-size: 1.375rem;
    }
  }
`

const Flag = styled.img`
  width: 45%;
  box-shadow: ${dropShadow.normal};

  @media (max-width: 703px) {
    width: 100%;
  }
`

const CountryInfo = styled.div`
  width: 45%;

  @media (max-width: 703px) {
    width: 100%;
  }
`

const CountryDetails = styled.div`
  display: flex;

  p {
    font-size: 1rem;
    margin: 0.5rem 0;
    font-weight: 300;

    span {
      font-weight: 600;
    }
  }

  @media (max-width: 703px) {
    flex-direction: column;

    p {
      font-size: 0.875rem;
      margin: 0.6rem 0;
    }
  }
`

const DetailsColumn = styled.div`
  width: 50%;

  @media (max-width: 703px) {
    width: 100%;
    margin-bottom: 2rem;

    &:nth-child(2) {
      margin-top: 0rem;
    }
  }
`

const BorderCountries = styled.div`
  margin-top: 60px;

  span {
    font-weight: 600;
    margin-right: 1rem;
  }

  @media (max-width: 703px) {
    margin-top: 0;

    span {
      margin-bottom: 20px;
      display: block;
      font-size: 1rem;
    }
  }
`

const BorderButtonLink = styled(ButtonLink)`
  margin-bottom: 10px;
  margin-right: 10px;

  @media (max-width: 703px) {
    font-size: 0.875rem;
    padding: 0.4rem 0.875rem;
  }
`

const BackButtonLink = styled(ButtonLink)`
  margin-top: 80px;
  margin-bottom: 80px;
  padding: 0.75rem 2.25rem;

  svg {
    margin-right: 0.5rem;
  }

  @media (max-width: 703px) {
    margin-top: 40px;
    margin-bottom: 60px;
    padding: 0.4rem 1.5rem;
  }
`
