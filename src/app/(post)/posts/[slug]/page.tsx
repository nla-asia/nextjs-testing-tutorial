
import { getArticleBySlug } from '@/lib/article.service';
import { Box, Container, Typography } from '@mui/material'
import Image from 'next/image'


export default async function PostDetails({ params }: { params: { slug: string }}) {
   
  const article = await getArticleBySlug(params.slug);



  return (
    <main>
          <Container > 
              <Box py={3}>
                <Typography variant="h3" gutterBottom>
                  {article?.title}
                </Typography>
              </Box>
              <Box py={2}>
                <Image width={800} height={400} alt='post image' src={"https://images.immediate.co.uk/production/volatile/sites/23/2014/09/GettyImages-720079175-7838da2.jpg?quality=90&fit=700,466"} />
              </Box>
              <Box py={2}>
                {article?.body}
              </Box>

                           
          </Container>
    </main>
  )
}
