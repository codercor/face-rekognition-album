import React from "react";
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Home as HomeIcon, ExitToApp as ExitToAppIcon } from "@mui/icons-material";

const menu = [
  {
    text: "Anasayfa",
    icon: <HomeIcon />,
  },
  {
    text: "Çıkış yap",
    icon: <ExitToAppIcon />,
  },
];

export default function SideMenu() {
  return (
    <Box sx={{ width: 250 }} role="presentation">
      <List>
        {menu.map((item, index) => (
          <ListItem button key={item.text}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
