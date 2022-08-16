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
  <>
    <Stack>
      <Avatar sx={{ bgcolor: color }} />
      {timestamps === undefined ? <Typography>{name}</Typography> : <></>}
    </Stack>

    {timestamps !== undefined ? (
      <Stack>
        <Typography>{name}</Typography>
        <Timestamp
          created_at={timestamps.created_at}
          updated_at={timestamps.updated_at}
        />
      </Stack>
    ) : (
      <></>
    )}
  </>
);
export default UserAvatar;
