
import PostItemsGrid from '@/components/ui/PostItemsGrid'
import { getArticles } from '@/lib/article.service'
import { Box, Container, Typography } from '@mui/material'
import { ErrorBoundary } from "react-error-boundary"

export default async function Home() {

  const latestArticles = await getArticles({}, 0, 6);


  return (
    <main>
          <Container > 
              <Box py={3}>
                <Typography variant="h3" gutterBottom>
                  Latest Articles
                </Typography>
              </Box>
              <ErrorBoundary fallback={<div>Something went wrong</div>}>
                  <PostItemsGrid articles={latestArticles} />
              </ErrorBoundary>
          </Container>
    </main>
  )
}
