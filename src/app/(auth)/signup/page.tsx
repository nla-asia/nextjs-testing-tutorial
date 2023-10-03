import {Grid } from '@mui/material'
import React from 'react'
import SignUpForm from './_form'

function SignUp() {
  return (
    <main>
        <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: '100vh' }}
        >
       
          <SignUpForm />
     
        </Grid>
    </main>
  )
}

export default SignUp