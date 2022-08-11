import * as React from 'react'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

import FavoriteIcon from '@mui/icons-material/Favorite'
import { authContext } from '../../utils/context/contexts'
import { useVote } from '../../api/mutations'

interface VoteButtonProps {
  id: number
  vote_count: number
}
export default function VoteButton({ id, vote_count }: VoteButtonProps) {
  const { state, dispatch } = React.useContext(authContext)
  const [voteCount, setVoteCount] = React.useState(vote_count)
  const upvote = useVote(state.auth)

  const handleClick = () => {
    const newVoteCount = voteCount + 1
    setVoteCount(newVoteCount)
    upvote.mutate({ post_id: id })
  }
  return (
    <>
      <IconButton onClick={handleClick}>
        <FavoriteIcon />
      </IconButton>
      <Typography>{voteCount > 0 ? voteCount : ''}</Typography>
    </>
  )
}
