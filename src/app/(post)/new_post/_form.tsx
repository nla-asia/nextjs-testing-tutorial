"use client";
import { NewPostData, NewPostFormSchema } from '@/types/article.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Paper, TextField } from '@mui/material'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';

function NewPostForm() {
    const router = useRouter()
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const {
      register, 
      handleSubmit,
      formState: { errors },
    } = useForm<NewPostData>({
      resolver: zodResolver(NewPostFormSchema),
    });
  
    const onSubmit: SubmitHandler<NewPostData> = async (data) => {
      
      setLoading(true);
      try {
        const res = await fetch("/api/new_post", {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        if (!res.ok) {
          setError((await res.json()).message);
          return;
        }
       
        router.push("/");
        

      } catch (error: any) {
        console.log("error", error);
        setError(error);
      } finally {
        setLoading(false);
      }


    };

  return (
    <div>
        <Paper 
        sx={{"display":"block","width":"100%","padding":"20px","maxWidth":"980px"}} 
        component="form" 
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="no-thanks" >

           

            {error && (
                <p className='error'>{error}</p>
            )}

            <Box py={2}>  
                <TextField
                    id="standard-text-input"
                    label="Title"
                    type="text"
                    {...register('title')}
                    fullWidth
                    variant="standard"
                    />
                {errors.title?.message && <p className='error'>{errors.title?.message?.toString()}</p>}
            </Box>

            <Box py={2}>  
                <TextField
                    id="standard-text-input"
                    label="Slug"
                    type="text"
                    {...register('slug')}
                    fullWidth
                    variant="standard"
                    />
                {errors.slug?.message && <p className='error'>{errors.slug?.message?.toString()}</p>}
            </Box>

            <Box py={2}>  
                <TextField
                    id="standard-text-input"
                    label="Summary"
                    type="text"
                    {...register('summary')}
                    fullWidth
                    variant="standard"
                    />
                {errors.summary?.message && <p className='error'>{errors.summary?.message?.toString()}</p>}
            </Box>

            <Box py={2}>  
                <TextField
                    id="standard-text-input"
                    label="Body"
                    type="text"
                    {...register('body')}
                    fullWidth
                    rows={4}
                    multiline
                    />
                {errors.body?.message && <p className='error'>{errors.body?.message?.toString()}</p>}
            </Box>

            

            <Box py={2}>  
                <Button type="submit" variant="contained" color="success" disabled={loading}>
                {loading ? "Loading..." : "Publish"}
                </Button>
            </Box>

        </Paper>
    </div>
  )
}

export default NewPostForm