import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import SignInForm from '@/features/auth/components/signin-form';
import { APP_ROUTES } from '@/config/routes';

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login form.'
};

export default function Login() {
  return (
    <div className='relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0'>
      <Link
        href='/examples/authentication'
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'absolute right-4 top-4 hidden md:right-8 md:top-8'
        )}
      >
        Login
      </Link>
      <div className='relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex'>
        <div className='absolute inset-0 bg-zinc-900' />

        <Image
          src={'/images/features-2.svg'}
          alt={'startup'}
          fill
          className=''
        />
      </div>
      <div className='flex h-full items-center p-4 lg:p-8'>
        <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
          <div className='flex flex-col space-y-2 text-center'>
            <h1 className='text-2xl font-semibold tracking-tight'>
              Login to your account
            </h1>
            <p className='text-sm text-muted-foreground'>
              Enter your email below to login to your account
            </p>
          </div>
          <SignInForm />
          <div className='relative'>
            <div className='absolute inset-0 flex items-center'>
              <span className='w-full border-t' />
            </div>
            <div className='relative flex justify-center text-xs uppercase'>
              <span className='bg-background px-2 text-muted-foreground'>
                Or
              </span>
            </div>
          </div>
          <Link
            href={APP_ROUTES.auth.register}
            className='underline underline-offset-4 hover:text-primary'
          >
            <Button variant='secondary' className='w-full' type='button'>
              Sign Up
            </Button>
          </Link>{' '}
          {/*<GithubSignInButton />*/}
        </div>
      </div>
    </div>
  );
}
