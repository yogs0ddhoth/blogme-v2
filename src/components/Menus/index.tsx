import * as React from 'react';

import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Modal from '@mui/material/Modal';
import { MenuButton } from '../Buttons';

interface MenuActionProps {
  className?: string;
  label: string;
  icon: React.ReactElement;
  onClick?: () => void;
  action: () => void;
}
export const MenuAction = ({
  className,
  onClick,
  label,
  icon,
  action,
}: MenuActionProps) => (
  <MenuItem
    className={className}
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
  iconColor?: string;
  modals?: React.ReactNode;
}
export const ActionsMenu = ({
  children,
  className,
  icon,
  modals,
}: ActionMenuProps) => {
  // Menu state
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <div>
      <MenuButton
        icon={icon}
        className={className ? className : ''}
        onClick={handleClick}
      />

      <Menu id="menu" open={open} anchorEl={anchorEl} onClose={handleClose}>
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, [{ onClick: handleClose }]);
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

interface PopupProps {
  children: React.ReactElement;
  open: boolean;
  onClose: () => void;
}
export function Popup(props: PopupProps) {
  return (
    <Modal
      {...props}
      sx={{
        top: '25%',
        left: '12.5%',
        right: '12.5%',
        margin: 'auto',
      }}
    >
      {props.children}
    </Modal>
  );
}
