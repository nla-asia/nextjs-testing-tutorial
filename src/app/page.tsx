
import BlogPostGrid from '@/components/ui/BlogPostGrid'
import { getArticles } from '@/lib/article.service'
import { Box, Container, Typography } from '@mui/material'

export default async function Home() {

  const latestArticles = await getArticles({});


  return (
    <main>
          <Container > 
              <Box py={3}>
                <Typography variant="h3" gutterBottom>
                  Latest Articles
                </Typography>
              </Box>
              <BlogPostGrid articles={latestArticles} />
          </Container>
    </main>
  )
}
