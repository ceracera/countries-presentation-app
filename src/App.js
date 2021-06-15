import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons'
import GlobalStyle from './globalStyle';
import Header from './Header';
import FilterableCountriesList from './CountriesList';
import CountryDetail from './CountryDetail';
import {
  darkTheme,
  lightTheme,
} from './util';

function App() {
  const [theme, setTheme] = useState();
  return (
    <>
      <ThemeProvider theme={theme || darkTheme}>
        <GlobalStyle />
          <Router>
              <Header>
                <div>
                  { (theme && theme.name === 'dark' || theme == undefined) 
                    ? <ThemeSwitchButton onClick={() => setTheme(lightTheme)}><FontAwesomeIcon icon={faSun} /> Light Mode</ThemeSwitchButton>
                    : <ThemeSwitchButton onClick={() => setTheme(darkTheme)}><FontAwesomeIcon icon={faMoon} /> Dark Mode</ThemeSwitchButton>
                  }
                </div>
              </Header>
              <Switch>
                <Route path="/country/:id">
                  <CountryDetail />
                </Route>
                <Route path="/">
                  <FilterableCountriesList />
                </Route>
              </Switch>
          </Router>
      </ThemeProvider>
    </>
  );
}

export default App;

const ThemeSwitchButton = styled.button`
  background: transparent;
  border: none;
  outline: none;
  color: ${props => props.theme.color};
  cursor: pointer;
`
