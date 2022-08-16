import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';


import { authContext } from '../../utils/context/contexts';
import useControllers from '../../controllers';
import { Vote } from 'custom-types';
import { VoteButton } from '../Buttons';

interface VoteButtonProps {
  post_id: number;
  vote_count: number;
  votes: Vote[];
}
export default function Votes({ post_id, vote_count, votes }: VoteButtonProps) {
  const { state, dispatch } = React.useContext(authContext);
  const [ voteCount, setVoteCount ] = React.useState(vote_count);
  const { useUpVote, useDeleteVote, refreshCache } = useControllers();
  const vote = {
    post_id: post_id,
    user: {
      id: state.id,
      name: state.user
    }
  }
  const userVote = votes.find(
    e => (e.post_id === post_id && e.user.id === state.id)
  );
  const updateVote = () => {
    setVoteCount(userVote ? voteCount - 1 : voteCount + 1);
  };
  const mutation = userVote ? useDeleteVote(state.auth, updateVote) : useUpVote(state.auth, updateVote);

  return (
    <>
      <VoteButton 
        upVoted={userVote ? true : false} 
        onClick={
          () => mutation.mutate(vote)
        } 
      />
      <Typography>{voteCount > 0 ? voteCount : ''}</Typography>
    </>
  );
}
