import { useContext, useEffect, useState } from "react";
import { Disclosure, Menu } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { UserContext } from "../../context/UserContext";
import { Avatar, AvatarIcon, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Image, Link } from "@nextui-org/react";
import favicon from "../../assets/greenreturn_favicon.png";

const navigation = [
  { name: "Dashboard", href: "/dashboard", current: true },
  { name: "Material", href: "/table-material", current: false },
  { name: "Collection Center", href: "#", current: false },
  { name: "User", href: "#", current: false },
  { name: "Reports", href: "#", current: false },
];
const userNavigation = [
  { name: "Profile", href: "#", color: "primary" },
  { name: "Settings", href: "#", color: "primary" },
  { name: "Log out", href: "/logout", color: "primary" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function HeaderDashboard() {
  const { user, decodeToken, authorize } = useContext(UserContext);
  const [userData, setUserData] = useState(decodeToken());
  useEffect(() => {
    setUserData(decodeToken());
  }, [user]);

  return (
    <>
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-gray-800">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Link href="/Dashboard">
                        <Image
                          width={50}
                          alt="Green Return favicon"
                          src={favicon}
                          radius="none"
                        />
                      </Link>
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                        {navigation.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className={classNames(
                              item.current
                                ? "bg-gray-900 text-white"
                                : "text-gray-300 hover:bg-gray-700 hover:text-white",
                              "rounded-md px-3 py-2 text-sm font-medium"
                            )}
                            aria-current={item.current ? "page" : undefined}
                          >
                            {item.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                      {/* Profile dropdown */}
                      <Menu as="div" className="relative ml-3">
                        <div>
                          <Dropdown placement="bottom-end">
                            <DropdownTrigger>
                              <Avatar
                                icon={<AvatarIcon />}
                                classNames={{
                                  base: "bg-gradient-to-br from-[#1D9634] to-[#ECECEC]",
                                  icon: "text-black/80",
                                }}
                                isBordered
                                isFocusable
                                color="primary"
                              />
                            </DropdownTrigger>
                            <DropdownMenu
                              aria-label="Profile Actions"
                              variant="flat"
                            >
                              <DropdownItem
                                key="profile"
                                className="h-14 gap-2"
                                as={Link}
                                href={`/user/profile/${userData.id_user}`}
                              >
                                <p
                                  className="font-semibold"
                                  style={{ color: "#11181C" }}
                                >
                                  Signed in as
                                </p>
                                <p
                                  className="font-semibold"
                                  style={{ color: "#11181C" }}
                                >
                                  {userData.email}
                                </p>
                              </DropdownItem>
                              {user &&
                                authorize({ allowedRoles: ["User"] }) && (
                                  <DropdownItem
                                    key="wallet"
                                    as={Link}
                                    href={`/user/wallet/${userData.id_user}`}
                                    style={{ color: "#11181C" }}
                                  >
                                    Wallet
                                  </DropdownItem>
                                )}
                              {user &&
                                authorize({ allowedRoles: ["User"] }) && (
                                  <DropdownItem
                                    key="history"
                                    as={Link}
                                    href={`/user/history/${userData.id_user}`}
                                    style={{ color: "#11181C" }}
                                  >
                                    History
                                  </DropdownItem>
                                )}
                              {user &&
                                authorize({
                                  allowedRoles: ["Admin", "CC_Admin"],
                                }) && (
                                  <DropdownItem
                                    key="dashboard"
                                    as={Link}
                                    href={`/dashboard/`}
                                    style={{ color: "#11181C" }}
                                  >
                                    Dashboard
                                  </DropdownItem>
                                )}
                              <DropdownItem
                                key="change-password"
                                as={Link}
                                href={`/user/password/${userData.id_user}`}
                                style={{ color: "#11181C" }}
                              >
                                Change Password
                              </DropdownItem>
                              <DropdownItem
                                key="logout"
                                color="danger"
                                as={Link}
                                href="/logout"
                                className="text-danger"
                              >
                                Log Out
                              </DropdownItem>
                            </DropdownMenu>
                          </Dropdown>
                        </div>
                      </Menu>
                    </div>
                  </div>
                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-0.5" />
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="md:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                  {navigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className={classNames(
                        item.current
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "block rounded-md px-3 py-2 text-base font-medium"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
                <div className="border-t border-gray-700 pb-3 pt-4">
                  <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                      <Avatar
                        icon={<AvatarIcon />}
                        classNames={{
                          base: "bg-gradient-to-br from-[#1D9634] to-[#ECECEC]",
                          icon: "text-black/80",
                        }}
                        isBordered
                        isFocusable
                        color="primary"
                      />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium leading-none text-white">
                        {userData.name}
                      </div>
                      <div className="text-sm font-medium leading-none text-gray-400">
                        {userData.email}
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 space-y-1 px-2">
                    {userNavigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as="a"
                        href={item.href}
                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                      >
                        {item.name}
                      </Disclosure.Button>
                    ))}
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </>
  );
}
