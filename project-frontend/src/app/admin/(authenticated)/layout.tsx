"use client";

import { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import AppBar from '@/features/common/AppBar'
import CustomDrawer from '@/features/common/CustomDrawer'
import DrawerHeader from '@/features/common/custom/DrawerHeader'
import "./globals.css";
import { fetchCurrentUser } from '@/actions/adminUser';
import { CurrentUserContext } from '@/contexts/currentUserContext'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const [currentUser, setCurrentUser] = useState({
    is_super_admin: false
  });
  useEffect(() => {
    const settingCurrentUser = async () => {
      const data = await fetchCurrentUser();
      setCurrentUser(data.response)
    }
    settingCurrentUser();
  }, []);

  const [open, setOpen] = useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  
  return (
    <Box sx={{ display: 'flex' }} >
      <AppBar open={open} handleDrawerOpen={handleDrawerOpen} />
      <CustomDrawer open={open} handleDrawerClose={handleDrawerClose} />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <CurrentUserContext.Provider value={{ current_user: currentUser }}>
          {children}
        </CurrentUserContext.Provider>
      </Box>
    </Box>
  );
}