import Link from 'next/link';
import s from './Navbar.module.css';

import Logo from 'components/icons/Logo';
import { useRouter } from 'next/router';
import { useUser } from 'utils/useUser';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useState } from 'react';

const Navbar = () => {
  const router = useRouter();
  const supabaseClient = useSupabaseClient();
  const { user } = useUser();
  const [toggle, setToggle] = useState(false);

  return (
    <nav className={s.root}>
      <a href="#skip" className="sr-only focus:not-sr-only">
        Skip to content
      </a>
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex justify-between align-center flex-row py-4 md:py-6 relative">
          <div className="flex flex-1 items-center">
            <Link href="/">
              <a className={s.logo} aria-label="Logo">
                <Logo />
              </a>
            </Link>
            <nav className="space-x-2 ml-6 hidden lg:block">
              <Link href="/">
                <a className={s.link}>Pricing</a>
              </Link>
              <Link href="/account">
                <a className={s.link}>Account</a>
              </Link>
            </nav>
            <div className={`flex flex-col h-[100vh] w-[100%] p-10 fixed top-0 left-0 bg-black text-4xl justify-center gap-5 transition lg:hidden ${toggle ? "visible" :"hidden"}`}>
            <a onClick={() => setToggle(t => !t)} className="absolute text-[20px] top-6 right-6 cursor-pointer"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
</svg>
</a>
              <Link href="/">
                <a className={s.link}>Pricing</a>
              </Link>
              <Link href="/account">
                <a className={s.link}>Account</a>
              </Link>
            </div>
          </div>

          <div className="flex flex-1 justify-end space-x-8">
            {user ? (
              <span
                className={s.link}
                onClick={async () => {
                  await supabaseClient.auth.signOut();
                  router.push('/signin');
                }}
              >
                Sign out
              </span>
            ) : (
              <Link href="/signin">
                <a className={s.link}>Sign in</a>
              </Link>
            )}
            <span className='lg:hidden'>
            <a onClick={() => setToggle(t => !t)} className={s.link}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
</svg>

</a>
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
