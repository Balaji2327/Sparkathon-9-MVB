export interface LinkItem {
  id: string;
  title: string;
  url: string;
  icon: string;
}

export interface UserProfile {
  name: string;
  bio: string;
  links: LinkItem[];
  theme: 'light' | 'dark';
  accentColor: string;
  role: 'admin' | 'viewer';
}