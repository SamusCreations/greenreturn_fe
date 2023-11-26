import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Image,
} from "@nextui-org/react";
import {
  ChevronDown,
  Activity,
  TagUser,
  HomeIcon,
  MaterialIcon,
  CouponIcon,
  SwapIcon,
} from "../../assets/Icons.jsx";
import logo from "../../assets/greenreturn_logo.png";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const icons = {
    chevron: <ChevronDown fill="currentColor" size={16} />,
    activity: (
      <Activity className="text-secondary" fill="currentColor" size={30} />
    ),
    user: <TagUser className="text-danger" fill="currentColor" size={30} />,
    store: <HomeIcon className="text-primary" fill="currentColor" size={30} />,
    material: (
      <MaterialIcon className="text-warning" fill="currentColor" size={30} />
    ),
    coupon: (
      <CouponIcon className="text-danger" fill="currentColor" size={30} />
    ),
    exchange: (
      <SwapIcon className="text-danger" fill="currentColor" size={30} />
    ),
  };

  const menuItems = [
    { label: "Home", route: "/" },
    { label: "Materials", route: "/material" },
    { label: "Collection Centers", route: "/collection-center" },
    { label: "Coupons", route: "/coupons" },
    { label: "User History", route: "/user-history" },
    { label: "Collection C. History", route: "/cc-history" },
    { label: "Login", route: "/login" },
    { label: "Sign up", route: "/signup" },
  ];

  return (
    <Navbar
      maxWidth="2xl"
      onMenuOpenChange={setIsMenuOpen}
      shouldHideOnScroll
      classNames={{
        item: [
          "flex",
          "relative",
          "h-full",
          "items-center",
          "data-[active=true]:after:content-['']",
          "data-[active=true]:after:absolute",
          "data-[active=true]:after:bottom-5",
          "data-[active=true]:after:left-0",
          "data-[active=true]:after:right-0",
          "data-[active=true]:after:h-[2px]",
          "data-[active=true]:after:rounded-[2px]",
          "data-[active=true]:after:bg-primary",
        ],
      }}
    >
      <NavbarContent justify="center">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="lg:hidden"
        />
        <NavbarBrand>
          <Link href="/">
            <Image
              width={300}
              alt="Green Return Logo"
              src={logo}
              radius="none"
            />
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden lg:flex gap-4" justify="center">
        <NavbarItem isActive>
          <Link href="/" aria-current="page" className="font-medium text-base">
            Home
          </Link>
        </NavbarItem>
        <Dropdown>
          <NavbarItem>
            <DropdownTrigger>
              <Button
                disableRipple
                className="p-0 bg-transparent data-[hover=true]:bg-transparent font-medium text-base"
                endContent={icons.chevron}
                radius="sm"
                variant="light"
                color="foreground"
              >
                Features
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
            aria-label="Green_Return features"
            className="w-[340px]"
            itemClasses={{
              base: "gap-4",
            }}
          >
            <DropdownItem
              style={{ color: "#11181C" }}
              key="materials"
              startContent={icons.material}
              as={Link}
              href="/material"
            >
              Materials
            </DropdownItem>

            <DropdownItem
              style={{ color: "#11181C" }}
              key="collection_centers"
              startContent={icons.store}
              as={Link}
              href="/collection-center"
            >
              Collection Centers
            </DropdownItem>
            <DropdownItem key="coupons" startContent={icons.coupon}>
              Coupons
            </DropdownItem>
            <DropdownItem
              style={{ color: "#11181C" }}
              key="user_history"
              startContent={icons.activity}
              as={Link}
              href="/user-history"
            >
              User History
            </DropdownItem>
            <DropdownItem
              style={{ color: "#11181C" }}
              key="cc_history"
              startContent={icons.activity}
              as={Link}
              href="/cc-history"
            >
              Collection Center History
            </DropdownItem>
            <DropdownItem
              style={{ color: "#11181C" }}
              key="table_material"
              startContent={icons.material}
              as={Link}
              href="/table-material"
            >
              Material Table
            </DropdownItem>
            <DropdownItem
              style={{ color: "#11181C" }}
              key="table_collection_center"
              startContent={icons.store}
              as={Link}
              href="/table-collection-center"
            >
              Collection Center Table
            </DropdownItem>
            <DropdownItem
              style={{ color: "#11181C" }}
              key="material_exchange"
              startContent={icons.exchange}
              as={Link}
              href="/material-exchange"
            >
              Material Exchange
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <NavbarItem>
          <Link color="foreground" href="#" className="font-medium text-base">
            About Us
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#" className="font-medium text-base">
            Contact Us
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            color="foreground"
            href="/dashboard"
            className="font-medium text-base"
          >
            Dashboard
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="center" className="hidden lg:flex">
        <NavbarItem>
          <Button
            as={Link}
            color="primary"
            href="/login"
            variant="bordered"
            className="font-medium text-base max-h-8"
            radius="sm"
          >
            Login
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button
            as={Link}
            color="primary"
            href="/signup"
            variant="solid"
            className="font-medium text-base max-h-8"
            radius="sm"
          >
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item.label}-${index}`}>
            <Link
              color={
                index === 2
                  ? "primary"
                  : index === menuItems.length - 1
                  ? "danger"
                  : "foreground"
              }
              className="w-full"
              href={item.route}
              size="lg"
            >
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
