interface ChildItem {
  name: string;
  path: string;
}

interface DrawerItem {
  name: string;
  child: ChildItem[];
}

const drawerItems: DrawerItem[] = [
  {
    name: "管理者管理",
    child: [
      {
        name: "管理者一覧",
        path: "/admin/admin_users",
      },
      {
        name: "管理者登録",
        path: "/admin/admin_users/new",
      },
    ],
  },
  {
    name: "企業管理",
    child: [
      {
        name: "企業一覧",
        path: "/admin/companies",
      },
      {
        name: "企業登録",
        path: "/admin/companies/new",
      },
    ],
  },
];

export default drawerItems;