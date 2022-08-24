import * as React from 'react';

import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { MenuButton } from '../Buttons';

interface MenuActionProps {
  label: string;
  icon: React.ReactElement;
  onClick?: () => void;
  action: () => void;
}
export const MenuAction = ({
  onClick,
  label,
  icon,
  action,
}: MenuActionProps) => (
  <MenuItem
    onClick={() => {
      if (onClick !== undefined) {
        onClick();
      }
      action();
    }}
  >
    <ListItemIcon>{icon}</ListItemIcon>
    <ListItemText>{label}</ListItemText>
  </MenuItem>
);

interface ActionMenuProps {
  children: React.ReactNode;
  className?: string;
  icon: React.ReactElement;
  modals?: React.ReactNode;
}
export const ActionsMenu = ({
  children,
  className,  
  icon, 
  modals
}: ActionMenuProps) => {
  // Menu state
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <div className={className !== undefined ? className : ''}>
      <MenuButton icon={icon}
        className={
          className !== undefined
            ? className
            : ''
        }
        onClick={handleClick}
      />

      <Menu id="menu" open={open} anchorEl={anchorEl} onClose={handleClose}>
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, {
              onClick: handleClose,
            });
          }
          return child;
        })}
      </Menu>
      {React.Children.map(modals, (child) => {
        if (React.isValidElement(child)) {
          return child;
        }
      })}
    </div>
  );
};
