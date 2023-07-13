import { Dialog, Transition, Disclosure } from '@headlessui/react';
import { useRef, useState } from 'react';
import Link from 'next/link';
import Icon from '../elements/Icon';
import { navigation } from './constants';
import Avatar from '../elements/Avatar';
import Image from 'next/future/image';
import { useTheme } from 'next-themes';

const Drawer = ({ user, show, setShow, setShowSignOut }) => {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;
  const [activeDisclosurePanel, setActiveDisclosurePanel] = useState(null);
  const cancelButtonRef = useRef(null);

  const togglePanels = (newPanel) => {
    if (activeDisclosurePanel) {
      if (
        activeDisclosurePanel.key !== newPanel.key &&
        activeDisclosurePanel.open
      ) {
        activeDisclosurePanel.close();
      }
    }

    setActiveDisclosurePanel({
      ...newPanel,
      open: !newPanel.open,
    });
  };

  return (
    <Transition.Root show={show}>
      <Dialog
        as="div"
        className="relative z-50"
        initialFocus={cancelButtonRef}
        onClose={setShow}
      >
        <Transition.Child
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-base-800/50" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 flex justify-center">
          <div className="flex w-full items-end justify-center text-center sm:items-center sm:p-0">
            <Transition.Child
              enter="ease-out duration-200"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="ease-in duration-200"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
              className={`fixed left-0 top-0 h-screen w-[85vw] bg-base-50 dark:bg-base-900 md:w-[40vw]`}
            >
              <Dialog.Panel
                className={`relative h-full w-full overflow-hidden px-1 py-0 text-left shadow-xl dark:border-base-600`}
              >
                <div className="relative flex min-h-screen flex-col overflow-scroll">
                  <div>
                    <div className="flex items-center justify-between px-4 py-4">
                      <Link href="/">
                        <div className="h-10 w-10 cursor-pointer overflow-hidden">
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
                      <button
                        className="btn btn-ghost px-0"
                        onClick={() => setShow(false)}
                        aria-label="Close"
                      >
                        <Icon name={'FiX'} className="h-8 w-8" />
                      </button>
                    </div>
                    <div className="no-scrollbar h-[80vh] space-y-4 overflow-y-scroll px-4 py-4">
                      <div className="flex flex-col space-y-3">
                        {navigation.map((item, index) => (
                          <Disclosure key={index}>
                            {(panel) => {
                              const { open, close } = panel;
                              return (
                                <>
                                  {item.slug !== 'teams' &&
                                    item.slug !== 'developers' && (
                                      <Disclosure.Button
                                        className="flex items-center justify-between pr-2 text-left text-lg font-medium text-base-600 focus:outline-none dark:text-base-200"
                                        onClick={() => {
                                          if (!open) {
                                            close();
                                          }
                                          togglePanels({
                                            ...panel,
                                            key: index,
                                          });
                                        }}
                                      >
                                        <span>{item.label}</span>
                                        {item.label !== 'Teams' &&
                                          item.label !== 'Developers' && (
                                            <Icon
                                              name="FiChevronDown"
                                              className={
                                                'h-5 w-5 text-base-600 dark:text-base-200 ' +
                                                (open
                                                  ? 'rotate-180 transform duration-200'
                                                  : '')
                                              }
                                            />
                                          )}
                                      </Disclosure.Button>
                                    )}
                                  {item.slug !== 'teams' &&
                                    item.slug !== 'developers' && (
                                      <Transition
                                        enter="transition duration-300 ease-out"
                                        enterFrom="opacity-0"
                                        enterTo="opacity-100"
                                      >
                                        <Disclosure.Panel className="text-base-600 dark:text-base-200">
                                          <ul className="mb-2 ml-2 space-y-2">
                                            {item.childrenOne.map(
                                              (navItem, index) => (
                                                <li key={index}>
                                                  <Link href={navItem.href}>
                                                    <button
                                                      className="btn btn-with-icon btn-ghost w-full px-0 text-base-600 dark:text-base-200"
                                                      onClick={() =>
                                                        setShow(false)
                                                      }
                                                    >
                                                      <Icon
                                                        name={navItem.icon}
                                                      />
                                                      <span>
                                                        {navItem.label}
                                                      </span>
                                                    </button>
                                                  </Link>
                                                </li>
                                              )
                                            )}
                                            {item.childrenTwo.map(
                                              (navItem, index) => (
                                                <li key={index}>
                                                  <Link href={navItem.href}>
                                                    <button
                                                      className="btn btn-with-icon btn-ghost w-full px-0 text-base-600 dark:text-base-200"
                                                      onClick={() =>
                                                        setShow(false)
                                                      }
                                                    >
                                                      <Icon
                                                        name={navItem.icon}
                                                      />
                                                      <span>
                                                        {navItem.label}
                                                      </span>
                                                    </button>
                                                  </Link>
                                                </li>
                                              )
                                            )}
                                          </ul>
                                        </Disclosure.Panel>
                                      </Transition>
                                    )}
                                </>
                              );
                            }}
                          </Disclosure>
                        ))}
                        <Link href={'/for/developers'}>
                          <button
                            className="flex items-center justify-between text-left text-lg font-medium text-base-600 focus:outline-none dark:text-base-200"
                            onClick={() => setShow(false)}
                          >
                            <span>About</span>
                          </button>
                        </Link>
                        <Link href={'/teams'}>
                          <button
                            className="flex items-center justify-between text-left text-lg font-medium text-base-600 focus:outline-none dark:text-base-200"
                            onClick={() => setShow(false)}
                          >
                            <span>Teams</span>
                          </button>
                        </Link>
                        <Link href={'/search'}>
                          <button
                            className="flex items-center justify-between text-left text-lg font-medium text-base-600 focus:outline-none dark:text-base-200"
                            onClick={() => setShow(false)}
                          >
                            <span>Search</span>
                          </button>
                        </Link>
                        <button
                          onClick={() =>
                            currentTheme === 'dark'
                              ? setTheme('light')
                              : setTheme('dark')
                          }
                          className="nav-bar nav-bar-icon"
                        >
                          <span className="capitalize">{currentTheme}</span>
                          {currentTheme === 'dark' ? (
                            <Icon name="FiSun" />
                          ) : (
                            <Icon name="FiMoon" />
                          )}
                        </button>

                        <div className="w-full py-8">
                          {user ? (
                            <div className="flex justify-between">
                              <Link href={`/${user.displayName}`}>
                                <button
                                  className="btn btn-with-icon px-0"
                                  onClick={() => setShow(false)}
                                >
                                  <Avatar
                                    image={user.profilePicUrl}
                                    name={user.displayName}
                                    dimensions="h-10 w-10"
                                  />
                                  <div className="flex flex-col text-left leading-5">
                                    <p>{user.name}</p>
                                    <p className="text-sm text-base-400 dark:text-base-500">
                                      @{user.displayName}
                                    </p>
                                  </div>
                                </button>
                              </Link>
                              <Link href="#">
                                <button
                                  className="btn btn-with-icon px-0"
                                  onClick={() => setShowSignOut(true)}
                                >
                                  <Icon name="FiLogOut" />
                                </button>
                              </Link>
                            </div>
                          ) : (
                            <div className="flex w-full flex-col space-y-2">
                              <Link href={'/signup'}>
                                <button className="btn btn-primary rounded-full">
                                  Sign up
                                </button>
                              </Link>
                              <Link href={'/login'}>
                                <button className="btn btn-secondary rounded-full">
                                  Login
                                </button>
                              </Link>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Drawer;
