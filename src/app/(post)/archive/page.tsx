import ArchiveWithPagination from '@/components/ui/ArchiveWithPagination';
import { getArticles, getArticlesWithTotalCount } from '@/lib/article.service';
import { Box, Container, Pagination, Stack, Typography } from '@mui/material'
import React from 'react';

export default async function Archive() {
    //const articles = await getArticles({}, 0, 6, {createdAt:"asc"});
    
    const limit = 6;
    const start = 0;
    const articlesData = await getArticlesWithTotalCount({}, start, limit, {createdAt:"asc"});
    const totalPages = articlesData.totalCount? Math.ceil(articlesData.totalCount/limit) : 1;

  return (
    <main>
          <Container> 
              <Box py={3}>
                <Typography variant="h3" gutterBottom>
                  Archive
                </Typography>
              </Box>
              <ArchiveWithPagination articles={articlesData.articles} totalPages={totalPages} ></ArchiveWithPagination>
          </Container>
    </main>
  )
}
