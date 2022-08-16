import * as React from 'react';

import IconButton from '@mui/material/IconButton';

import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LogoutIcon from '@mui/icons-material/Logout';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import theme from '../../utils/mui-theme';

export const CloseButton = (props: { onClick: () => void }) => (
  <IconButton onClick={props.onClick}>
    <ClearOutlinedIcon />
  </IconButton>
);

interface LogoutButtonProps {
  className: string;
  onClick: () => void;
}
export const LogoutButton = (props: LogoutButtonProps) => (
  <IconButton onClick={props.onClick}>
    <LogoutIcon className={props.className} />
  </IconButton>
);

interface MenuButtonProps {
  className: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
export const MenuButton = (props: MenuButtonProps) => (
  <IconButton id="button" className={props.className} onClick={props.onClick}>
    <MoreVertIcon />
  </IconButton>
);

interface VoteButtonProps {
  onClick: () => void;
  upVoted: boolean;
}
export const VoteButton = ({ onClick, upVoted }: VoteButtonProps) => (
  <IconButton onClick={onClick}>
    <FavoriteIcon sx={upVoted ? { color: theme.palette.error.light } : {}} />
  </IconButton>
);
