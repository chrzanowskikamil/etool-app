import { githubProfileUrl } from '@/utils/paths';
import { GitHubLogoIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

export async function AuthHero() {
  return (
    <aside className='flex items-center justify-center w-2/3 h-full p-4'>
      <div className='flex flex-col items-center justify-center w-full h-full border border-transparent  rounded-xl bg-gray-100 dark:bg-neutral-900'>
        <h2 className='w-1/2 text-3xl my-4'>ETool is the first online assistant to help you effectively manage repairs in your workshop!</h2>
        <p className='flex items-center text-foreground/60 text-xl'>
          Created by <GitHubLogoIcon className='mx-2' />
          <Link
            className='underline text-foreground/60 hover:text-foreground/80'
            href={githubProfileUrl}>
            chrzanowskikamil
          </Link>
        </p>
      </div>
    </aside>
  );
}
