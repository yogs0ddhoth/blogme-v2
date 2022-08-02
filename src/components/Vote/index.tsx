import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import FavoriteIcon from '@mui/icons-material/Favorite';
import mutations from "../../api/mutations";

export default function VoteButton({id, vote_count}:{id:number, vote_count:number}) {
  const [voteCount, setVoteCount] = React.useState(vote_count);
  const upvote = mutations.useVote();
  const handleClick = () => {
    const newVoteCount = voteCount + 1
    setVoteCount(newVoteCount)
    upvote.mutate(id);
  }
  return (
    <>
      <IconButton onClick={handleClick}>
        <FavoriteIcon />
      </IconButton>
      <Typography>
        {voteCount > 0 ? voteCount : ''}
      </Typography>
    </>
  )
}