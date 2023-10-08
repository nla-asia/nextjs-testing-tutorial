"use client";
import React from 'react';
import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import { signIn } from "next-auth/react";
import { useState } from "react";
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignUpData, SignUpFormSchema } from '@/types/auth.types';
import { redirect } from 'next/navigation'
import Link from 'next/link';




function SignUpForm() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<SignUpData>({
      resolver: zodResolver(SignUpFormSchema),
    });
  
    const onSubmit: SubmitHandler<SignUpData> = async (data) => {
      
      setLoading(true);
      try {
        const res = await fetch("/api/register", {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        setLoading(false);
        if (!res.ok) {
          setError((await res.json()).message);
          return;
        }
  
        const result = await signIn("credentials", {
          redirect: false,
          email: data.email,
          password: data.password,
          callbackUrl:"/",
        });

     

        if(result?.ok){
          redirect("/");
        }else{
          redirect("/signin");
        }
        
      } catch (error: any) {
     //   setFormValues({ name: "", email: "", password: "" });
        setLoading(false);
        setError(error);
      }
    };
  

  return (
    <Paper 
        sx={{"display":"block","width":"100%","padding":"20px","maxWidth":"320px"}} 
        component="form" 
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="no-thanks" >

            <Box py={2}>
                <Typography variant="h3" textAlign={"center"}>Sign Up</Typography>
            </Box>

            {error && (
                <Box sx={{"color":"red"}}>{error}</Box>
            )}

            <Box py={2}>  
                <TextField
                    id="standard-text-input"
                    label="Name"
                    type="text"
                    {...register('name')}
                    fullWidth
                    variant="standard"
                    />
                {errors.name?.message && <p className='error'>{errors.name?.message?.toString()}</p>}
            </Box>

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
                {loading ? "Loading..." : "Sign Up"}
                </Button>
            </Box>

            <Box py={2}>
                <p>Already have an account ? <Link href="/signin"> Sign In </Link></p>
            </Box>

        </Paper>
  )
}

export default SignUpForm