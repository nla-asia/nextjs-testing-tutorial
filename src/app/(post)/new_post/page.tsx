
import { Box, Container, Typography } from '@mui/material'
import NewPostForm from '@/app/(post)/new_post/_form'

export default async function NewPost() {



  return (
    <main>
          <Container > 
              <Box py={3}>
                <Typography variant="h3" gutterBottom>
                  Publish a New Article
                </Typography>
              </Box>

               <NewPostForm />   
                           
          </Container>
    </main>
  )
}
