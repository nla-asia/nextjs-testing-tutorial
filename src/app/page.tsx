
import BlogPostGrid from '@/components/ui/BlogPostGrid'
import { Box, Container, Typography } from '@mui/material'

export default function Home() {
  return (
    <main>
          <Container > 
              <Box py={3}>
                <Typography variant="h3" gutterBottom>
                  Latest Blog Posts
                </Typography>
              </Box>
              <BlogPostGrid />
          </Container>
    </main>
  )
}
