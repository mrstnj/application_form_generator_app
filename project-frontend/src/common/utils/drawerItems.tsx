import StorefrontIcon from '@mui/icons-material/Storefront';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import BusinessIcon from '@mui/icons-material/Business';
import ListIcon from '@mui/icons-material/List';
import CreateIcon from '@mui/icons-material/Create';
import RedeemIcon from '@mui/icons-material/Redeem';
import FeedIcon from '@mui/icons-material/Feed';
import PersonIcon from '@mui/icons-material/Person';
import VisibilityIcon from "@mui/icons-material/Visibility";
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';

type Company = {
  id: number;
}

type CurrentUser = {
  is_super_admin: boolean;
  company?: Company;
}

const DrawerItems = ( current_user: CurrentUser ) => {

  let drawerItems = [
    {
      name: "ホーム",
      icon: <HomeIcon />,
      child: [
        {
          name: "トップ",
          icon: <DashboardIcon />,
          path: "/admin/top",
        },
      ],
    },
    {
      name: "会員管理",
      icon: <PersonIcon />,
      child: [
        {
          name: "会員一覧",
          icon: <ListIcon />,
          path: "/admin/users",
        },
      ],
    },
    {
      name: "サービス管理",
      icon: <StorefrontIcon />,
      child: [
        {
          name: "サービス一覧",
          icon: <ListIcon />,
          path: "/admin/services",
        },
        {
          name: "サービス登録",
          icon: <CreateIcon />,
          path: "/admin/services/new",
        },
      ],
    },
    {
      name: "プラン管理",
      icon: <RedeemIcon />,
      child: [
        {
          name: "プラン一覧",
          icon: <ListIcon />,
          path: "/admin/plans",
        },
        {
          name: "プラン登録",
          icon: <CreateIcon />,
          path: "/admin/plans/new",
        },
      ],
    },
    {
      name: "フォーム管理",
      icon: <FeedIcon />,
      child: [
        {
          name: "フォーム一覧",
          icon: <ListIcon />,
          path: "/admin/forms",
        },
        {
          name: "フォーム登録",
          icon: <CreateIcon />,
          path: "/admin/forms/new",
        },
      ],
    },
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
  ];

  if (current_user.is_super_admin) {
    drawerItems = [...drawerItems, 
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
  } else {
    drawerItems = [...drawerItems, 
      {
        name: "企業管理",
        icon: <BusinessIcon />,
        child: [
          {
            name: "企業詳細",
            icon: <VisibilityIcon />,
            path: `/admin/companies/${current_user?.company?.id}`,
          },
        ],
      },
    ];
  }

  return drawerItems;
};

export default DrawerItems;