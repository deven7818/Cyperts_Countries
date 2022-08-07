import React, { useEffect, useState } from 'react'
import './Countries.css'

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { getCountryByCode } from '../services/dataservice';

function Countries() {


  let navigate = useNavigate();

  let param = useParams()
  console.log(param, "param printing in country");

  const [country, setCountry] = useState({})

  console.log(param.countryId, 'Out getCountry Function');

  useEffect(() => {

    
    // if(!country ) {

    getCountryByCode(param.countryId).then((response) => {
       console.log(response);
      setCountry(response.data)
    }).catch((error) => {
      console.log(error);
    })
    // }
    // console.log('in useeffect');
  }, [param])


  const openBorder = () => {
    getCountryByCode(param.name).then((response) => {
      // console.log(response);
      setCountry(response.data)
    }).catch((error) => {
      console.log(error);
    })
  }


  console.log(country, "country printing asfs");

  if (!country) return <div>Loading</div>;


  return (
    country ?

      <div className='mainhome'>
        <div className='countryDetails'>
          <Card>
            <CardActionArea>

              <CardMedia
                component="img"
                height="140"
                image={country && country.flag}
                alt="green iguana"
              />
              <div className='detailsInfo'>
                <div className='detailsInfo'>
                  <Typography variant="h5" component="div">
                    Country :
                    {country && country.name}
                  </Typography>
                  <Typography variant="h5" component="div" >
                    Area :
                    {country && country.area}

                  </Typography>

                  <Typography variant="h5" component="div">
                    Capital :
                    {country && country.capital}

                  </Typography>
                  {country && country.currencies && country.currencies.map((e) =>
                    <Typography variant="h5" component="div">
                      Currency :
                      {e.name} <t />

                      {e.symbol}
                    </Typography>
                  )}
                  <h3>Language :</h3>
                  {country && country.languages && country.languages.map((e) =>
                    <Typography variant="h5" component="div">

                      {e.name}
                    </Typography>
                  )}
                  <h2>Borders :
                    {country && country.borders && country.borders.map((e) =>
                      <Button onClick={() => navigate(`/country/${e}`)}
                        variant="body2" color="text.secondary">

                        {e}
                      </Button>
                    )}
                  </h2>

                </div>
              </div>
            </CardActionArea>
          </Card>

        </div>
      </div>
      : null
  )
}

export default Countries
