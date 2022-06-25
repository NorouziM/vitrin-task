import React from 'react';
import Link from 'next/link';
// MUI
import { Button, Chip, Stack, Typography } from '@mui/material';
// utils
import { IPost } from '@utils/interfaces';

const Post = ({ title, body, userId, id }: IPost) => {
  return (
    <Stack>
      <Typography variant="h5" component={'h2'} color="#000" mb={1}>
        {title}
      </Typography>
      <Typography variant="h6" component={'h2'} color="#3E5060">
        {body.length > 50 ? body.slice(0, 50) + '...' : body}
      </Typography>
      <Stack mt={3} direction={'row'} justifyContent="space-between">
        <Chip label={`Author ID: ${userId}`} variant="outlined" />
        <Link href={`posts/${id}`} style={{ cursor: 'pointer' }}>
          <Button size="medium">Read More</Button>
        </Link>
      </Stack>
    </Stack>
  );
};

export default Post;
