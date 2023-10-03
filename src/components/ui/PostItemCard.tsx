"use client";
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Article } from '@/types/article.types';

interface ArticleItemCardProps {
    article?: Article;
}

export default function PostItemCard({article}:ArticleItemCardProps) {

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="https://images.immediate.co.uk/production/volatile/sites/23/2014/09/GettyImages-720079175-7838da2.jpg?quality=90&fit=700,466"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {article?.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {article?.summary}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
