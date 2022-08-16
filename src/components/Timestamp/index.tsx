import Typography from '@mui/material/Typography';

interface TimestampProps {
  created_at: string;
  updated_at: string;
}
const Timestamp = ({ created_at, updated_at }: TimestampProps) => (
  <Typography>
    {Date.parse(updated_at) > Date.parse(created_at)
      ? 'edited ' + new Date(updated_at).toLocaleDateString('en-us')
      : new Date(created_at).toLocaleDateString('en-us')}
  </Typography>
);
export default Timestamp;
