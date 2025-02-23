import { useState } from 'react';
import { Popover, Transition } from '@headlessui/react';
import Icon from '../elements/Icon';
import Link from 'next/link';
import Avatar from '../elements/Avatar';
import { useRouter } from 'next/router';

const ProfilePopoverPanel = ({
  user,
  setShowSignOut,
  setShowLogin,
  totalChatNotifications,
}) => {
  const [isShowing, setIsShowing] = useState(false);
  const router = useRouter();

  return (
    <Popover className="relative">
      {user ? (
        <Popover.Button
          className={'btn px-1'}
          onClick={() => setIsShowing(true)}
        >
          <Avatar
            image={user.profilePicUrl}
            name={user.displayName}
            dimensions="h-7 w-7"
          />
        </Popover.Button>
      ) : (
        <Popover.Button
          className={
            'nav-bar nav-bar-icon bg-base-200 dark:bg-base-700 outline-none ' +
            (isShowing && ` bg-base-200 dark:bg-base-700 dark:text-white`)
          }
          onClick={() => setIsShowing(true)}
        >
          <Icon name={'FiUser'} />
        </Popover.Button>
      )}

      <Transition
        show={isShowing}
        onMouseEnter={() => setIsShowing(true)}
        onMouseLeave={() => setIsShowing(false)}
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <Popover.Panel className="absolute -right-2 -top-3 z-50 ">
          <div className="popover px-2">
            <div className="popover-arrow left-auto right-4"></div>

            <div className="flex items-start">
              {user ? (
                <div className="w-56 space-y-2">
                  <Link href={`/${user.displayName}`}>
                    <div className="nav-popover cursor-pointer items-center -space-x-1">
                      <Avatar
                        image={user.profilePicUrl}
                        name={user.displayName}
                        dimensions="h-9 w-9"
                      />
                      <div className="flex flex-col text-left">
                        <span className="text-base font-semibold">
                          {user.name}
                        </span>
                        <span className="text-base-500 dark:text-base-400 text-xs font-normal">
                          @{user.displayName}
                        </span>
                      </div>
                    </div>
                  </Link>

                  <div className="border-base-200 dark:border-base-700 flex flex-col border-b border-t py-2">
                    <Link href="/account/dashboard">
                      <button
                        className="nav-popover items-center"
                        onClick={() => setIsShowing(false)}
                      >
                        <Icon name={'FiGrid'} />
                        <span className="text-black dark:text-white">
                          Dashboard
                        </span>
                      </button>
                    </Link>
                    <Link href="/account/network">
                      <button
                        className="nav-popover items-center"
                        onClick={() => setIsShowing(false)}
                      >
                        <Icon name={'FiUsers'} />
                        <span className="text-black dark:text-white">
                          Network
                        </span>
                      </button>
                    </Link>
                    <Link href="/chat">
                      <button
                        className="nav-popover relative items-center"
                        onClick={() => setIsShowing(false)}
                      >
                        <Icon name={'FiMessageSquare'} />
                        <span className="text-black dark:text-white">
                          Messages
                        </span>

                        {totalChatNotifications > 0 && (
                          <div
                            className="absolute left-6 top-1 flex h-3 w-3 justify-center rounded-full bg-red-600 text-center font-semibold text-white"
                            style={{ fontSize: '11px' }}
                          ></div>
                        )}
                      </button>
                    </Link>
                    <Link href="/account/wallet">
                      <button
                        className="nav-popover items-center"
                        onClick={() => setIsShowing(false)}
                      >
                        <Icon name={'FiCreditCard'} />
                        <span className="text-black dark:text-white">
                          Wallet
                        </span>
                      </button>
                    </Link>
                    <Link href="/account/profile/invite">
                      <button
                        className="nav-popover items-center"
                        onClick={() => setIsShowing(false)}
                      >
                        <Icon name={'FiHeart'} />
                        <span className="text-black dark:text-white">
                          Invite friends
                        </span>
                      </button>
                    </Link>
                    <Link href="/account/settings">
                      <button
                        className="nav-popover items-center"
                        onClick={() => setIsShowing(false)}
                      >
                        <Icon name={'FiSettings'} />
                        <span className="text-black dark:text-white">
                          Account settings
                        </span>
                      </button>
                    </Link>
                  </div>

                  <Link href="/account/settings/signout">
                    <button className="nav-popover text-base-500 hover:text-base-500 dark:text-base-300 hover:dark:text-base-300 items-center focus:border-none focus:outline-none focus:ring-0">
                      <Icon name={'FiLogOut'} className="h-6 w-6" />
                      <span className="text-base-500 hover:text-base-500 dark:text-base-300 hover:dark:text-base-300">
                        Sign out
                      </span>
                    </button>
                  </Link>
                </div>
              ) : (
                <div className="w-64 space-y-2 px-2 py-4 text-center">
                  <div className="bg-base-200 dark:bg-base-700 mx-auto h-20 w-20 rounded-full p-4">
                    <Icon name={'FiUser'} className="h-12 w-12" />
                  </div>
                  <p className="">Sign up or login to your account.</p>
                  <div className="flex items-center justify-center space-x-2">
                    <Link href="/signup">
                      <button className="btn btn-primary btn-with-icon">
                        <span>Sign up</span>
                      </button>
                    </Link>

                    <Link
                      href={{
                        pathname: '/login',
                        query: {
                          destination: encodeURIComponent(
                            `${process.env.BASEURL}${router.asPath}`
                          ),
                        },
                      }}
                    >
                      <button className="btn btn-secondary btn-with-icon">
                        <span>Log in</span>
                      </button>
                    </Link>
                  </div>
                </div>
              )}

              {/* {childrenOne.map((item, index) => (
                  <div key={index}>
                    <Link href={item.href}>
                      <button
                        className="nav-popover"
                        onClick={() => setIsShowing(false)}
                      >
                        <Icon name={item.icon} className="h-6 w-6" />
                        <div className="flex flex-col">
                          <span className="text-black dark:text-white">
                            {item.label}
                          </span>
                          <span className="font-normal text-base-500 dark:text-base-300">
                            {item.desc}
                          </span>
                        </div>
                      </button>
                    </Link>
                  </div>
                ))} */}
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

export default ProfilePopoverPanel;
