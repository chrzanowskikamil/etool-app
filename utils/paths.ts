interface UrlPaths {
  about: string;
  contact: string;
  dashboard: string;
  emailVerification: string;
  docs: string;
  githubAuth: string;
  help: string;
  home: string;
  login: string;
  linkedInAuth: string;
  linkedInCallback: string;
  newPassword: string;
  profile: string;
  register: string;
  reports: string;
  reviews: string;
  resetPassword: string;
}

interface EndpointsPaths {
  githubUserApi: string;
  githubUserEmailsApi: string;
  linkedInUserApi: string;
}

const home = '/';
const dashboard = '/dashboard';

export const urlPaths: UrlPaths = {
  home,
  about: '/about',
  contact: '/contact',
  docs: '/docs',
  emailVerification: '/email-verification',
  githubAuth: '/login/github',
  login: '/login',
  linkedInAuth: '/login/linkedin',
  linkedInCallback: '/login/linkedin/callback',
  newPassword: '/new-password',
  register: '/register',
  reviews: '/reviews',
  resetPassword: '/reset-password',
  dashboard,
  help: `${dashboard}/help`,
  profile: `${dashboard}/profile`,
  reports: `${dashboard}/reports`,
};

export const endpointsPaths: EndpointsPaths = {
  githubUserApi: 'https://api.github.com/user',
  githubUserEmailsApi: 'https://api.github.com/user/emails',
  linkedInUserApi: 'https://api.linkedin.com/v2/userinfo',
};

export const createResetPasswordLink = (token: string) => `${process.env.NEXT_PUBLIC_BASE_URL}${urlPaths.newPassword}?token=${token}`;
export const githubProfileUrl = 'https://github.com/chrzanowskikamil';
