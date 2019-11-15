export type TMenuItem = {
  title: string;
  key: string;
  route: string;
  icon?: string;
  childItem: TMenuItem[];
};
