'use client';
import { OAuthButton } from '@/components/oauth-button';
import { buttonVariants } from '@/components/ui/button';
import { GitHubLogoIcon, LinkedInLogoIcon } from '@radix-ui/react-icons';

export const OAuthProvidersButtons = () => {
  return (
    <>
      <OAuthButton
        className={buttonVariants({ variant: 'secondary', size: 'lg', className: 'mt-4' })}
        icon={<GitHubLogoIcon className='w-6 h-6 mr-2' />}
        title={'Continue with Github'}
        provider={'github'}
      />
      <OAuthButton
        className={buttonVariants({ variant: 'secondary', size: 'lg', className: 'mt-4' })}
        icon={<LinkedInLogoIcon className='w-6 h-6 mr-2' />}
        title={'Continue with LinkedIn'}
        provider={'linkedin'}
      />
    </>
  );
};
