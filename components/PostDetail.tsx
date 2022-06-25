import React from 'react';
import { useRouter } from 'next/router';
// MUI
import { Chip, IconButton, Stack, Typography } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

interface IProps {
  title: string;
  body: string;
  userId: number;
}

const PostDetail = ({ title, body, userId }: IProps) => {
  const router = useRouter();

  return (
    <Stack>
      <Stack direction={'row'} mb={3} alignItems="center">
        <IconButton aria-label="Back" onClick={router.back} sx={{ mr: 3 }}>
          <ArrowBackIosNewIcon />
        </IconButton>
        <Typography variant="h4" component={'h2'} color="#000" align="center">
          {title}
        </Typography>
      </Stack>
      <Typography variant="h5" component={'p'} color="#3E5060">
        {body}
      </Typography>
      <Stack direction={'row'} justifyContent="space-between">
        <Chip
          label={`Author ID: ${userId}`}
          variant="outlined"
          sx={{ mt: 5 }}
        />
      </Stack>
    </Stack>
  );
};

export default PostDetail;
