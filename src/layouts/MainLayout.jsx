import { useState } from 'react';
import { AppShell, Burger, Group, UnstyledButton, Image, Container } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { NavLink, useNavigate, Link, Outlet } from "react-router-dom";
import classes from './MainLayout.module.css'
import logo from '../assets/logo-no-background.png'
import ColorToggle from '../components/ColorToggle'
import FallbackLoader from '../components/utility/FallbackLoader';
import { LogoutButton } from '../components/utility/LogoutButton';
import { useAuth0 } from '@auth0/auth0-react';

const links = [
  {
    label: "Home",
    link: "/"
  },
  {
    label: "Dashboard",
    link: "/dashboard"
  },
  {
    label: "Scores",
    link: "/scores"
  },
  {
    label: "Leagues",
    link: "/leagues"
  },
  {
    label: "Profile",
    link: "/profile"
  },
  {
    label: "Friends",
    link: "/friends"
  }
]

export default function MainLayout() {
  const [opened, { toggle }] = useDisclosure();
  const [activePage, setActivePage] = useState(links[0].link);
  const navigate = useNavigate();

  const createNavItem = (linkItem, shouldTransform) => (
    <UnstyledButton
      key={linkItem.label}
      className={`${classes.link} ${shouldTransform ? classes.transform : ''} ${activePage === linkItem.link ? classes.activeLink : ''}`}
      onClick={(event) => {
        event.preventDefault();
        setActivePage(linkItem.link);
        navigate(linkItem.link);
      }}
    >
      {linkItem.label}
    </UnstyledButton>
  );
  
  const itemsWithTransform = links.map((linkItem) => createNavItem(linkItem, true));
  const itemsWithoutTransform = links.map((linkItem) => createNavItem(linkItem, false));

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { desktop: true, mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header className={classes.header}>
        <Container size="xl" className={classes.container}>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Group justify="space-between" style={{ flex: 1 }}>
            <Image
              h={40}
              w="auto"
              fit="contain"
              src={logo}
            />
            <LogoutButton />
            <Group ml="xl" gap={4} visibleFrom="sm">
              {itemsWithTransform}
            </Group>
          </Group>
          <ColorToggle />
        </Group>
        </Container>
      </AppShell.Header>

      <AppShell.Navbar py="md" px={4}>
        {itemsWithoutTransform}
      </AppShell.Navbar>

      <Outlet />
    </AppShell>
  );
}