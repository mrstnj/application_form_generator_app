"use client";

import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse
} from "@mui/material";
import { useState } from "react";
import drawerItems from '../../common/utils/drawerItems';

interface Props {
  handleDrawerClose: () => void;
}

const DrawerList = ({ handleDrawerClose }: Props): JSX.Element => {
  const [openLists, setOpenLists] = useState<number[]>([]);

  const handleClick = (index: number) => {
    setOpenLists((prevOpenLists) => {
      const isOpen = prevOpenLists.includes(index);
      if (isOpen) {
        return prevOpenLists.filter((i) => i !== index);
      } else {
        return [...prevOpenLists, index];
      }
    });
  };

  return (
    <List>
      {drawerItems.map((item, index) => (
        <div key={index}>
          <ListItemButton onClick={() => handleClick(index)}>
            <ListItemIcon>
              {item.icon}
            </ListItemIcon>
            <ListItemText secondary={item.name} />
          </ListItemButton>
          <Collapse in={openLists.includes(index)}>
            <List component="div" disablePadding>
              {item.child.map((childItem, childIndex) => (
                <ListItemButton key={childIndex} sx={{ pl: 3 }} onClick={handleDrawerClose} href={childItem.path}>
                  <ListItemIcon>
                    {childItem.icon}
                  </ListItemIcon>
                  <ListItemText secondary={childItem.name} />
                </ListItemButton>
              ))}
            </List>
          </Collapse>
        </div>
      ))}
    </List>
  )
};

export default DrawerList;