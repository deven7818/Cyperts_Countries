import React, { useEffect } from 'react'
import './Home.css'

import SearchIcon from '@mui/icons-material/Search';

import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';


import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { getCountries } from '../services/dataservice';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';




const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));



const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));


const columns = [
  { id: 'name', label: 'Name', maxWidth: 100 }
]


function Home() {

  let navigate = useNavigate();

  const [country, setCountry] = useState([])

  const [searchInput, setSearchInput] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);

  const [searchByRegion, setSearchByRegion] = useState('all');

  const [filterData, setFilterData] = useState(country);



  const getAllCountry = () => {
    getCountries().then((response) => {
      // console.log(response);
      setCountry(response.data)
    }).catch((error) => {
      console.log(error);
    })
  }


  useEffect(() => {
    getAllCountry()
  }, [])

  //Search by country name
  const searchItems = (searchValue) => {
    setSearchInput(searchValue)
    if (searchInput !== '') {
      const filteredData = filterData.filter((item) => {
        return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
      })
      setFilteredResults(filteredData)
    }
    else {
      setFilteredResults(filterData)
    }
  }
  // console.log(country, 'after filter', filteredResults);

  ///Search by region
  const searchRegion = (event) => {
    if (event.target.value === 'all') {
      setSearchByRegion(event.target.value);
      setFilterData(country)

    }
    else {
      setSearchByRegion(event.target.value);
      // console.log(event.target.value ,'event target value');
      // console.log(event ,'event');
      const filteredData = country.filter((item) => item.region === event.target.value)
      // console.log(filteredData ,'regionvise data');
      setFilterData(filteredData)
    }
  }
  console.log(filterData, 'filter data for all ');

  var uniqueArray = country.reduce(function (a, d) {
    if (a.indexOf(d.region) === -1) {
      a.push(d.region);
    }
    return a;
  }, []);
  // console.log(uniqueArray);

  const gotoContry = () => {
    navigate('/country')
  }

  return (
    <>

      <div className='fields'>
        <Button sx={{
          minWidth: 120,
        }} href="/" variant="contained">
          Home
        </Button>
        <div className='regionSelect'>
          <FormControl sx={{
            minWidth: 120,
          }}>
            <InputLabel id="demo-simple-select-label">Region</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={searchByRegion}
              label="Region"
              onChange={searchRegion}
            >
              <MenuItem value={'all'}>All</MenuItem>
              {uniqueArray.map((e) => <MenuItem value={e}>{e}</MenuItem>)}

            </Select>
          </FormControl>
        </div>
        {/* Search field */}
        <div className='search'>
          <div className='searchbar'>
            <Search onChange={(e) => searchItems(e.target.value)}>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search"
              />
            </Search>
          </div>
        </div>
      </div>

      <div className='tableData'>
      <div className='tableDesign'>
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead >
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {searchInput.length > 1 ? (
                filteredResults.map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.alpha2Code} >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell
                            onClick={() => navigate(`/country/${row.alpha2Code}`, { data: row })}
                            key={column.id} align={column.align}>
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })) : (
                filterData.map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.alpha2Code}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell
                            onClick={() => navigate(`/country/${row.alpha2Code}`, { data: row })}
                            key={column.id} align={column.align}>
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </TableContainer>

      </div>
      </div>
    </>
  )
}

export default Home