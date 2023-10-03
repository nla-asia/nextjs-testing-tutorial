"use client";
import React, { ChangeEvent, useState } from 'react'
import { Box, Button, Paper, TextField, Typography } from '@mui/material'
import { signIn } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from 'next/link';



function SignInForm() {

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setFormValues({ email: "", password: "" });

      const res = await signIn("credentials", {
        redirect: false,
        email: formValues.email,
        password: formValues.password,
        callbackUrl,
      });

      setLoading(false);

      console.log(res);
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

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };
  
  return (<Paper 
        sx={{"display":"block","width":"100%","padding":"20px","max-width":"320px"}} 
        component="form" 
        onSubmit={onSubmit}
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
                    name="email"
                    value={formValues.email}
                    onChange={handleChange}
                    fullWidth
                    variant="standard"
                    />
            </Box>

            <Box width={"100%"} py={2}>
                <TextField
                    id="standard-password-input"
                    label="Password"
                    type="password"
                    name="password"
                    value={formValues.password}
                    onChange={handleChange}
                    fullWidth
                    variant="standard"

                    />
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