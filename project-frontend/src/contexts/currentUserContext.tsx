'use client';

import {
  createContext,
  useContext,
} from 'react';

export const CurrentUserContext = createContext({current_user: { is_super_admin: false }});

export const useCurrentUser = () => useContext(CurrentUserContext);