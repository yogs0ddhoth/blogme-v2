import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import Timestamp from '../Timestamp';

interface UserAvatarProps {
  name: string;
  color: string;
  timestamps?: {
    created_at: string;
    updated_at: string;
  };
}
const UserAvatar = ({ name, color, timestamps }: UserAvatarProps) => (
  <div className='flexRow gap-2 items-center'>
    <Stack>
      <Avatar sx={{ bgcolor: color }} />
      {!timestamps ? <Typography variant='subtitle1'>{name}</Typography> : <></>}
    </Stack>

    {timestamps ? (
      <Stack>
        <Typography variant='h6'>{name}</Typography>
        <Timestamp
          created_at={timestamps.created_at}
          updated_at={timestamps.updated_at}
        />
      </Stack>
    ) : (
      <></>
    )}
  </div>
);
export default UserAvatar;
