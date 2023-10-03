import { Grid } from '@mui/material'
import React from 'react'
import SignInForm from './_form'

function SignIn() {
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
       
         <SignInForm />
     
        </Grid>
    </main>
  )
}

export default SignIn