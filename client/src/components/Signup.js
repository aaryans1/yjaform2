import React, { useState } from 'react'

import validator from 'validator'
import {
  Paper,
  Container,
  Stack,
  Button,
  Box,
  Divider,
  TextField,
  FormControl,
  FormHelperText,
} from '@mui/material'
import theme from '../styles/theme'


function Signup() {

  // all of the state variables for necessary fields
  const [values, setValues] = useState({
    fullName: '',
      DOB: '',
      phoneNumber: '', 
      email: '', 
      address: '', 
      city: '',
      state: '',
      zipcode: '',
      jainCenter: '', 
      dietaryPreferences: '', 
      specialNeeds: '',
  })

  // all the error handling for incorrect input
  const [errors, setErrors] = useState({
    fullName: false,
      DOB: false,
      phoneNumber: false, 
      email: false, 
      address: false, 
      city: false,
      state: false,
      zipcode: false,
      jainCenter: false, 
      dietaryPreferences: false, 
      specialNeeds: false, 
    fetchError: false,
    fetchErrorMsg: '',
  })

  //different validation as user types - uses validator library
  const handleChange = (fieldName) => (event) => {
    const currValue = event.target.value
    switch (fieldName) {
      case 'email':
        validator.isEmail(currValue)
          ? setErrors({ ...errors, email: false })
          : setErrors({ ...errors, email: true })
        break

        case 'fullName':
        validator.isAlpha(currValue)
        ? setErrors({ ...errors, fullName: false })
        : setErrors({ ...errors, fullName: true })
      break
      case 'DOB':
        validator.isBefore(currValue)
        ? setErrors({ ...errors, DOB: false })
        : setErrors({ ...errors, DOB: true })
      break
      case 'phoneNumber':
        validator.isMobilePhone(currValue)
        ? setErrors({ ...errors, phoneNumber: false })
        : setErrors({ ...errors, phoneNumber: true })
      break
      case 'zipcode':
        validator.isNumeric(currValue)
        ? setErrors({ ...errors, zipcode: false })
        : setErrors({ ...errors, zipcode: true })
      break
      case 'jainCenter':
        validator.isAlpha(currValue)
        ? setErrors({ ...errors, jainCenter: false })
        : setErrors({ ...errors, jainCenter: true })
      break
    }
    setValues({ ...values, [fieldName]: event.target.value })
  }
//on click of download button tries to download file from mongodb
  const handleClick = async (event) => {
    event.preventDefault()

    try{
        fetch('/api/download')
        .then(async response => {
            const data = await response.json();

            // check for error response
            if (!response.ok) {
                // get error message from body or default to response statusText
                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            }
        })
    }
    catch(error){
        return Promise.reject(error);
    }
}
// on submission of form posts state
  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: values.fullName,
          DOB: values.DOB,
          phoneNumber: values.phoneNumber, 
          email: values.email, 
      address: values.address, 
      city: values.city,
      state: values.state,
      zipcode: values.zipcode,
      jainCenter: values.jainCenter, 
      dietaryPreferences: values.dietaryPreferences, 
      specialNeeds: values.specialNeeds,
        }),
      })
      
      if (!res.ok) {
        const error = await res.json()
        return setErrors({
          ...errors,
          fetchError: true,
          fetchErrorMsg: error.msg,
        })
      }

      const data = await res.json()
      // this is just a visual feedback for user for this demo
      // this will not be an error, rather we will show a different UI or redirect user to dashboard
      // ideally we also want a way to confirm their email or identity
      setErrors({
        ...errors,
        fetchError: true,
        fetchErrorMsg: data.msg,
      })
      setValues({
      fullName: '',
      DOB: '',
      phoneNumber: '', 
      email: '', 
      address: '', 
      city: '',
      state: '',
      zipcode: '',
      jainCenter: '', 
      dietaryPreferences: '', 
      specialNeeds: '',
      })
      return
    } catch (error) {

      setErrors({
        ...errors,
        fetchError: true,
        fetchErrorMsg:
          'There was a problem with our server, please try again later', 
      })
    }
  }

  return (
    <>
      <Container sx={{ marginTop: 'calc(100vh - 45%)' }} maxWidth='sm'>
        <Paper elevation={6}>
          <Container
            maxWidth='sm'
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              paddingTop: '20px',
            }}>
            <Box
        component="img"
        sx={{
          height: 60,
          width: 60,
          bgcolor: theme.palette.primary.main,
          boxShadow: '0px 0px 8px rgba(131,153,167,0.99)',
        }}
        alt="YJALogo2"
        src='/yjalogo2.png'
      />
            <h2>Register for a new YJA account</h2>
          </Container>
          <Stack
            component='form'
            onSubmit={handleSubmit}
            noValidate
            spacing={3}
            sx={{ bgcolor: '#f5f5f6', padding: '40px' }}>
             
             <TextField
              variant='filled'
              type='text'
              label='Full Name'
              value={values.fullName}
              onChange={handleChange('fullName')}
              
            /> 
            <TextField
              variant='filled'
              type='date'
              label='Date of Birth'
              value={values.DOB}
              onChange={handleChange('DOB')}
              error={errors.DOB}
              helperText={errors.DOB && 'Please enter a valid date of birth'}
            />
            <FormControl variant='filled'>
            <TextField
              variant='filled'
              type='number'
              label='Phone Number'
              value={values.phoneNumber}
              onChange={handleChange('phoneNumber')}
              error={errors.phoneNumber}
              helperText={errors.phoneNumber && 'Please insert a valid phone number'}

            />
            </FormControl>
            
            <TextField
              variant='filled'
              type='email'
              label='Email'
              value={values.email}
              onChange={handleChange('email')}
              error={errors.email}
              helperText={errors.email && 'Please insert a valid email address'}
            />

            <TextField
              variant='filled'
              type='text'
              label='Address'
              value={values.address}
              onChange={handleChange('address')}
            />
            <Stack
            direction='row'
            component='form'
            noValidate
            spacing={3}
            sx={{ bgcolor: '#f5f5f6' }}>
            
            
            <TextField
              variant='filled'
              type='text'
              label='City'
              value={values.city}
              onChange={handleChange('city')}
            />
            <TextField
              variant='filled'
              type='text'
              label='State'
              value={values.state}
              onChange={handleChange('state')}
              error={errors.state}
              helperText={errors.city && 'Please insert a valid state'}
            />
            <TextField
              variant='filled'
              type='number'
              label='Zip Code'
              value={values.zipcode}
              onChange={handleChange('zipcode')}
              error={errors.zipcode}
              helperText={errors.zipcode && 'Please insert a valid zipcode'}
            />

            </Stack>

            <TextField
              variant='filled'
              type='text'
              label='Jain Center'
              value={values.jainCenter}
              onChange={handleChange('jainCenter')}
              error={errors.jainCenter}
              helperText={errors.jainCenter && 'Please insert a valid Jain Center name'}
            /> 
            <TextField
              variant='filled'
              type='text'
              label='Dietary Preferences'
              value={values.dietaryPreferences}
              onChange={handleChange('dietaryPreferences')}
              error={errors.dietaryPreferences}
              helperText={errors.dietaryPreferences && 'Please enter valid dietary preferences'}
            /> 
            <TextField
              variant='filled'
              type='text'
              label='Special Needs'
              value={values.specialNeeds}
              onChange={handleChange('specialNeeds')}
              error={errors.specialNeeds}
              helperText={errors.specialNeeds && 'Please enter valid dietary preferences'}
            /> 
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
              }}>
              <Button
                variant='contained'
                size='large'
                type='submit'
                sx={{
                  minWidth: '70%',
                }}>
                Sign me up!
              </Button>
            </Box>
            {errors.fetchError && (
              <FormHelperText error>{errors.fetchErrorMsg}</FormHelperText>
            )}
            <Divider />
            <Button
              variant="contained"
              size='medium'
              type='button'
              onClick={handleClick}
              sx={{
                minWidth: '70%',
                bgcolor: theme.palette.primary.main,
              }}

            >Download Data</Button>
          </Stack>
        </Paper>
      </Container>

    </>
  )
}

export default Signup