export interface NavItem {
  key: string;
  path: string;
}

export const navItems: NavItem[] = [
  {
    key: "home",
    path: "/",
  },
  {
    key: "polling",
    path: "/polling",
  },
  {
    key: "PubSub",
    path: "/pubsub",
  }
];