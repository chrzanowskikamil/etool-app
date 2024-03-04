import NewPasswordForm from '@/components/new-password-form';

export default function NewPasswordPage() {
  return (
    <main>
      <div className='container flex justify-center'>
        <div className='my-16 sm:w-3/4 md:w-1/3 md:my-48 md:h-1/2'>
          <div>
            <h1 className='text-3xl font-medium text-center p-4'>NEW PASSWORD</h1>
            <p className=' text-pretty'>Create new strong password</p>
          </div>
          <div>
            <NewPasswordForm />
          </div>
        </div>
      </div>
    </main>
  );
}
