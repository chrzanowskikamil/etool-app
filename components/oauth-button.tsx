'use client';
import { Button } from '@/components/ui/button';
import { FC, ReactNode, useState } from 'react';
import { LoadingSpinner } from '@/components/icons';
import { type ProviderName, signInUserByOAuth } from '../features/user/actions/sign-in-user-by-oauth';

interface OAuthButtonProps {
  className: string;
  title: string;
  icon: ReactNode;
  provider: ProviderName;
}

export const OAuthButton: FC<OAuthButtonProps> = ({ className, title, icon, provider }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignInUserByOAuth = async () => {
    setIsLoading(true);
    await signInUserByOAuth(provider);
  };

  return (
    <Button
      className={className}
      disabled={isLoading}
      onClick={handleSignInUserByOAuth}>
      {icon} {title} {isLoading && <LoadingSpinner />}
    </Button>
  );
};
