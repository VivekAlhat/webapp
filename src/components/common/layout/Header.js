import Image from 'next/image';
import Link from 'next/link';
import Mode from 'components/common/buttons/Mode';
import dynamic from 'next/dynamic';
import PopoverPanel from 'components/common/layout/PopoverPanel';
import Icon from '../elements/Icon';
import { useTheme } from 'next-themes';
import { navigation } from './constants';
import { useEffect, useState } from 'react';
import { Transition } from '@headlessui/react';
import ProfilePopoverPanel from './ProfilePopoverPanel';
import ToolTip from '../elements/ToolTip';
const KnockNotificationsComponent = dynamic(() =>
  import('components/modules/account/settings/NotificationsPanel')
);

const Header = ({ user, headerFixed = false, setShowCreatePost }) => {
  const { systemTheme, theme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const controlNavbar = () => {
    if (typeof window !== 'undefined') {
      if (window.scrollY > lastScrollY) {
        if (window.scrollY > 100) {
          setShowHeader(false);
        }
      } else {
        setShowHeader(true);
      }

      setLastScrollY(window.scrollY);
    }
  };

  useEffect(() => {
    if (!headerFixed) {
      if (typeof window !== 'undefined') {
        window.addEventListener('scroll', controlNavbar);

        return () => {
          window.removeEventListener('scroll', controlNavbar);
        };
      }
    }
  }, [lastScrollY]);

  return (
    <>
      <Transition
        show={showHeader}
        enter="transition duration-200 ease-out"
        enterFrom="-translate-y-40 opacity-0"
        enterTo="translate-y-0 opacity-100"
        leave="transition duration-200 ease-in"
        leaveFrom="translate-y-0 opacity-100"
        leaveTo="-translate-y-40 opacity-0"
        className={'sticky top-0 z-50 w-full'}
      >
        <header className="dark:bg-base/90 z-50 border-b border-base-200 bg-white/90 backdrop-blur-sm dark:border-base-700/50 dark:bg-base-900">
          <div className="mx-auto flex max-w-full items-center justify-between px-8 py-4">
            <div className="flex w-6/12 items-center space-x-4 text-base">
              <Link href="/">
                <div className="h-8 w-8 cursor-pointer overflow-hidden rounded-lg">
                  <Image
                    src={
                      currentTheme === 'dark'
                        ? '/assets/icons/thefullstack-dark.webp'
                        : '/assets/icons/thefullstack-light.webp'
                    }
                    className="object-contain"
                    alt="The Full Stack"
                    width={200}
                    height={200}
                  />
                </div>
              </Link>
              <ul className="flex items-center justify-center">
                {navigation.map((item, index) => (
                  <li key={index}>
                    {item.children ? (
                      <PopoverPanel
                        item={item}
                        childrenOne={item.childrenOne}
                        childrenTwo={item.childrenTwo}
                      />
                    ) : (
                      <Link href={item.href} passHref>
                        <a href="#" className="nav-bar">
                          <span>{item.label}</span>
                        </a>
                      </Link>
                    )}
                  </li>
                ))}

                <li>
                  <Link href="/signup" passHref>
                    <a
                      href="#"
                      className="nav-bar ml-6 flex w-72 items-center space-x-2 dark:bg-base-700/50 dark:text-base-500"
                    >
                      <Icon name="FiSearch" className="h-4 w-4" />
                      <span>Search</span>
                    </a>
                  </Link>
                </li>
              </ul>
            </div>

            <div className="flex w-6/12 items-center justify-end space-x-4">
              {user ? (
                <button
                  className="btn btn-primary rounded-full font-medium"
                  onClick={() => setShowCreatePost(true)}
                >
                  Share project
                </button>
              ) : (
                <Link href="/signup" passHref>
                  <a
                    href="#"
                    className="btn btn-primary rounded-full font-medium"
                  >
                    Share project
                  </a>
                </Link>
              )}
              {/* <a
                href="https://github.com/thefullstackgroup/thefullstack"
                className="nav-bar nav-bar-icon group relative"
              >
                <ToolTip message="Star us on GitHub" position={'bottom'} />
                <Icon name={'FiGithub'} />
              </a> */}

              {user ? (
                <div className="w-8">
                  <KnockNotificationsComponent userId={user?.userId} />
                </div>
              ) : (
                <button className="nav-bar nav-bar-icon">
                  <Icon name={'FiBell'} />
                </button>
              )}

              <Mode />

              <ProfilePopoverPanel user={user} />
            </div>
          </div>
        </header>
      </Transition>
    </>
  );
};

export default Header;
