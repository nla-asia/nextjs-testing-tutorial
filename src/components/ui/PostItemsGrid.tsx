"use client";
import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import PostItemCard from './PostItemCard';
import { Prisma } from '@prisma/client';
import { Article } from '@/types/article.types';

interface ArticleListProps {
    articles: Article[];
}

export default function PostItemsGrid({articles}: ArticleListProps) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {articles?.map((article,i)=>
          <Grid item xs={2} sm={4} md={4} key={i}>
             <PostItemCard article={article} />
          </Grid>)}
      </Grid>
    </Box>
  );
}

