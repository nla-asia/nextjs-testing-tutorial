"use client";
import React from 'react';
import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import { signIn } from "next-auth/react";
import { ChangeEvent, useState } from "react";


function SignUpForm() {
    const [loading, setLoading] = useState(false);
    const [formValues, setFormValues] = useState({
      name: "",
      email: "",
      password: "",
    });
    const [error, setError] = useState("");
  
    const onSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);
      setFormValues({ name: "", email: "", password: "" });
  
      try {
        const res = await fetch("/api/register", {
          method: "POST",
          body: JSON.stringify(formValues),
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        setLoading(false);
        if (!res.ok) {
          setError((await res.json()).message);
          return;
        }
  
        signIn(undefined, { callbackUrl: "/" });
        
      } catch (error: any) {
        setLoading(false);
        setError(error);
      }
    };
  
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setFormValues({ ...formValues, [name]: value });
    };

  return (
    <Paper 
        sx={{"display":"block","width":"100%","padding":"20px","max-width":"320px"}} 
        component="form" 
        onSubmit={onSubmit}
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
                    name="name"
                    value={formValues.name}
                    onChange={handleChange}
                    fullWidth
                    variant="standard"
                    />
            </Box>

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
                {loading ? "Loading..." : "Sign Up"}
                </Button>
            </Box>

        </Paper>
  )
}

export default SignUpForm