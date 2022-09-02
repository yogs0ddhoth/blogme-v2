import * as React from 'react';

import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import { authContext } from '../../utils/context/contexts';
import useControllers from '../../utils/api';
import { Vote } from 'custom-types';
import { VoteButton } from '../Buttons';

interface VoteButtonProps {
  post_id: number;
  vote_count: number;
  votes: Vote[];
}
export default function Votes({ post_id, vote_count, votes }: VoteButtonProps) {
  const { state, dispatch } = React.useContext(authContext);
  const { user, id, auth } = state;

  const [voteCount, setVoteCount] = React.useState(vote_count);
  const [userVote, setUserVote] = React.useState(
    votes.find((v) => v.post_id === post_id && v.user.id === id) ? true : false
  );
  const { upVote, deleteVote } = useControllers();

  const vote = {
    post_id: post_id,
    user: {
      id: id,
      name: user,
    },
  };

  const updateVote = () => {
    setUserVote(!userVote);
    setVoteCount(userVote ? voteCount - 1 : voteCount + 1);
  };

  const mutation = userVote
    ? deleteVote.init(auth, undefined, updateVote)
    : upVote.init(auth, undefined, updateVote);

  return (
    <>
      <VoteButton
        upVoted={userVote ? true : false}
        onClick={() => mutation.mutate(vote)}
      />
      <Tooltip
        title={votes.map((v) => (
          <Typography>{v.user.name}</Typography>
        ))}
      >
        <Typography className="hover:cursor-pointer hover:font-bold">
          {voteCount > 0 ? voteCount : ''}
        </Typography>
      </Tooltip>
    </>
  );
}
