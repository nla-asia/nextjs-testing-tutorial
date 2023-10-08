"use client";
import { Box, Pagination, Stack } from '@mui/material';
import React, { ChangeEvent, useState } from 'react';
import PostItemsGrid from './PostItemsGrid';
import { Article } from '@/types/article.types';
import { ErrorBoundary } from 'react-error-boundary';
 
interface ArticleListProps {
    articles: Article[];
    totalPages: number;
}

function ArchiveWithPagination({articles, totalPages}: ArticleListProps) {
    const [page, setPage] = React.useState(1);
    const [totalPage, setTotalPage] = React.useState(totalPages);
    const [data, setData] = useState(articles);


    const fetchData = (p:number)=>{
        fetch(`/api/posts?page=${p}`)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            setData(data.articles);
            setTotalPage(data.totalPages);
           // setLoading(false)
        });
    }

    const onPageChange=(p: ChangeEvent<unknown>, value: number)=>{
            console.log(value);
            setPage(value);
            fetchData(value);
    }

  return (
    <Box py={2}>
              <ErrorBoundary fallback={<div>Something went wrong</div>}>
                <PostItemsGrid articles={data} />
              </ErrorBoundary>
              <Stack spacing={2} py={2}>
                {totalPage?<Pagination count={totalPage} page={page} onChange={onPageChange} variant="outlined" color="primary" shape="rounded" />:null}
              </Stack>
    </Box>
  )
}

export default ArchiveWithPagination