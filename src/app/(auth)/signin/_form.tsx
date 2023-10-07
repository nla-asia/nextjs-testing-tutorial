"use client";
import React, { ChangeEvent, useState } from 'react'
import { Box, Button, Paper, TextField, Typography } from '@mui/material'
import { signIn } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from 'next/link';
import { SignInData, SignInFormSchema } from '@/types/auth.types';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';



function SignInForm() {

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInData>({
    resolver: zodResolver(SignInFormSchema),
  });


  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const onSubmit: SubmitHandler<SignInData> = async (data) => {
    
    try {
      setLoading(true);
      const res = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
        callbackUrl,
      });

      setLoading(false);

     
      if (!res?.error) {
        router.push(callbackUrl);
      } else {
        setError("invalid email or password");
        
      }
    } catch (error: any) {
      setLoading(false);
      setError(error);
    }
  };

  
  return (<Paper 
        sx={{"display":"block","width":"100%","padding":"20px","maxWidth":"320px"}} 
        component="form" 
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="no-thanks" >
           

            <Box py={2}>
                <Typography variant="h3" textAlign={"center"}>Sign In</Typography>
            </Box>

            {error && (
                <Box sx={{"color":"red"}}>{error}</Box>
            )}

            <Box py={2}>  
                <TextField
                    id="standard-text-input"
                    label="Email"
                    type="email"
                    {...register('email')}
                    fullWidth
                    variant="standard"
                    />
                 {errors.email?.message && <p className='error'>{errors.email?.message?.toString()}</p>}
            </Box>

            <Box width={"100%"} py={2}>
                <TextField
                    id="standard-password-input"
                    label="Password"
                    type="password"
                    {...register('password')}
                    fullWidth
                    variant="standard"

                    />

                {errors.password?.message && <p className='error'>{errors.password?.message?.toString()}</p>}
                
            </Box>
            <Box py={2}>  
                <Button type="submit" variant="contained" color="success" disabled={loading}>
                 {loading ? "Loading..." : "Sign In"}
                </Button>
            </Box>
            <Box py={2}>
                <p>Don't have an account ? <Link href="/signup"> Sign Up </Link></p>
            </Box>

        </Paper>
    
  )
}

export default SignInForm