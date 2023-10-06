import { NavLink } from '@/types/common.types'
import { Button } from '@mui/material'
import Link from 'next/link'
import React from 'react'

function LinkBtn({href, title}: NavLink) {
  return (
    <Button
                    
                    href={href}
                    LinkComponent={Link}
                    sx={{ color: 'white', display: 'block', '&:hover': {
                      backgroundColor: '#fff',
                      color: '#3c52b2',
                    } }}
                    > {title}
    </Button>
  )
}

export default LinkBtn