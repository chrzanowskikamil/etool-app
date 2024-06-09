interface UrlPaths {
  about: string;
  contact: string;
  dashboard: string;
  docs: string;
  help: string;
  home: string;
  login: string;
  newPassword: string;
  profile: string;
  register: string;
  reports: string;
  reviews: string;
  resetPassword: string;
}

const home = '/';
const dashboard = '/dashboard';

export const githubProfileUrl = 'https://github.com/chrzanowskikamil';

export const urlPaths: UrlPaths = {
  home,
  about: '/about',
  contact: '/contact',
  docs: '/docs',
  login: '/login',
  newPassword: '/new-password',
  register: '/register',
  reviews: '/reviews',
  resetPassword: '/reset-password',
  dashboard,
  help: `${dashboard}/help`,
  profile: `${dashboard}/profile`,
  reports: `${dashboard}/reports`,
};

export const createResetPasswordLink = (token: string) => `${process.env.NEXT_PUBLIC_BASE_URL}${urlPaths.newPassword}?token=${token}`;
