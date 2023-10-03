import BlogPostGrid from '@/components/ui/BlogPostGrid'
import { getArticles } from '@/lib/article.service';
import { Box, Container, Pagination, Stack, Typography } from '@mui/material'

export default async function Archive() {
    
    const articles = await getArticles({}, 0, 12, {createdAt:"asc"});

  return (
    <main>
          <Container> 
              <Box py={3}>
                <Typography variant="h3" gutterBottom>
                  Archive
                </Typography>
              </Box>
              <BlogPostGrid articles={articles} />
              <Stack spacing={2} py={2}>
                <Pagination count={10} variant="outlined" shape="rounded" />
              </Stack>
          </Container>
    </main>
  )
}
