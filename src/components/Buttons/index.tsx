import * as React from 'react';

import IconButton from '@mui/material/IconButton';

import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { PaletteMode } from '@mui/material';

export const CloseButton = (props: { onClick: () => void }) => (
  <IconButton onClick={props.onClick}>
    <ClearOutlinedIcon />
  </IconButton>
);

interface MenuButtonProps {
  className: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  icon: React.ReactElement;
}
export const MenuButton = (props: MenuButtonProps) => (
  <IconButton id="button" className={props.className} onClick={props.onClick}>
    {props.icon}
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
export const VisibilityButton = ({ show, dispatch }: VisibilityButtonProps) => {
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
