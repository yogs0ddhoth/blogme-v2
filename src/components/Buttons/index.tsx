import * as React from 'react';

import IconButton from '@mui/material/IconButton';

import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LogoutIcon from '@mui/icons-material/Logout';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

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
  handleHover?: {
    onMouseEnter: (e: React.MouseEvent<HTMLElement | null>) => void;
    onMouseLeave: () => void;
  };
}
export const VoteButton = ({
  onClick,
  upVoted,
  handleHover,
}: VoteButtonProps) => (
  <IconButton
    onClick={onClick}
    onMouseOver={handleHover ? handleHover.onMouseEnter : undefined}
    onMouseLeave={handleHover ? handleHover.onMouseLeave : undefined}
  >
    <FavoriteIcon className={upVoted ? `text-[#e57373]` : ''} />
  </IconButton>
);

interface VisibilityButtonProps {
  show: boolean;
  dispatch: React.Dispatch<React.SetStateAction<boolean>>;
}
export const VisibilityButton = ({show, dispatch}: VisibilityButtonProps) => {
  const handleClickShowPassword = () => dispatch(!show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => event.preventDefault();
  return (
    <IconButton
      aria-label="toggle password visibility"
      onClick={handleClickShowPassword}
      onMouseDown={handleMouseDownPassword}
      edge="end"
    >
      {show ? <VisibilityOff /> : <Visibility />}
    </IconButton>
  );
};
