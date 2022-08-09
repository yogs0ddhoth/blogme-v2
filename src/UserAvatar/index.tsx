import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

interface UserAvatarProps {
  name: string;
  color: string;
  timestamps?: {
    created_at: string;
    updated_at: string;
  }
}
const UserAvatar = ({name, color, timestamps}:UserAvatarProps) =>  (
  <>
    <Stack>
      <Avatar sx={{bgcolor: color}} />
      {timestamps !== undefined ? <Typography>{name}</Typography> : <></>}
    </Stack>
    {timestamps !== undefined
      ? (
        <Stack>
          <Typography>{name}</Typography>
            <Typography>
              {Date.parse(timestamps.updated_at) > Date.parse(timestamps.created_at) 
                ? 'edited ' + new Date(timestamps.updated_at).toLocaleDateString('en-us')
                : new Date(timestamps.created_at).toLocaleDateString('en-us')
              }
            </Typography>
        </Stack>
      ) : (
        <></>
      )
    }
  </>
)
export default UserAvatar;