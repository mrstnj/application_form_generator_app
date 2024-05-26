import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import BusinessIcon from '@mui/icons-material/Business';
import ListIcon from '@mui/icons-material/List';
import CreateIcon from '@mui/icons-material/Create';

interface ChildItem {
  name: string;
  icon: JSX.Element;
  path: string;
}

interface DrawerItem {
  name: string;
  icon: JSX.Element;
  child: ChildItem[];
}

const drawerItems: DrawerItem[] = [
  {
    name: "管理者管理",
    icon: <AdminPanelSettingsIcon />,
    child: [
      {
        name: "管理者一覧",
        icon: <ListIcon />,
        path: "/admin/admin_users",
      },
      {
        name: "管理者登録",
        icon: <CreateIcon />,
        path: "/admin/admin_users/new",
      },
    ],
  },
  {
    name: "企業管理",
    icon: <BusinessIcon />,
    child: [
      {
        name: "企業一覧",
        icon: <ListIcon />,
        path: "/admin/companies",
      },
      {
        name: "企業登録",
        icon: <CreateIcon />,
        path: "/admin/companies/new",
      },
    ],
  },
];

export default drawerItems;