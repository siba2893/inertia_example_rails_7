import { IconSun, IconMoonStars } from '@tabler/icons'
import {
  ActionIcon,
  AppShell,
  Burger,
  Group,
  Header,
  Navbar,
  Text,
  useMantineTheme,
} from '@mantine/core'

import { useState } from 'react'
import UserInfo from '@components/UserInfo'
import MainLinks from '@components/MainLinks'

const MainLayout = ({ children }) => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

  return (
    <AppShell
      padding="md"
      fixed
      navbar={
        <Navbar
          width={ { sm: 300 } }
          style={ {
            left: opened ? '0' : '-100%'
          } }
          sx={ {
            overflow: "hidden",
            transition: "left 320ms ease"
          } }>
          <Navbar.Section grow mt="xs">
            <MainLinks/>
          </Navbar.Section>
          <Navbar.Section>
            <UserInfo/>
          </Navbar.Section>
        </Navbar>
      }
      header={
        <Header height={ 60 }>
          <Group sx={ { height: '100%' } } px={ 20 } position="apart">
            <Burger
              opened={ opened }
              onClick={ () => setOpened((o) => !o) }
              size="sm"
              color={ theme.colors.gray[6] }
            />
            <Text><b>Betting Journal</b></Text>
          </Group>
        </Header>
      }
      styles={ (theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
          paddingLeft: opened ? 'calc(var(--mantine-navbar-width, 0px) + 16px)' : '16px',
          transition: "padding 500ms ease"
        },
      }) }
    >
      { children }
    </AppShell>
  );
};

export default MainLayout;
