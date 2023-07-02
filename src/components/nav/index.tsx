import Link from "next/link";
import styles from '@/styles/components/nav.module.css';

// DIALOG
import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import * as Tabs from '@radix-ui/react-tabs';
import Login from './dialog/login';
import Register from './dialog/register';
import dialog from '@/styles/components/dialogs/dialog.module.css';

export default function navBar()
{
  const [ tabValue, setTabValue ] = useState('');
  const [ authDialog, setAuthDialog ] = useState(false);

  const handleLoginButton = () =>
  {
    setAuthDialog(true);
    setTabValue("login");
  }
  
  const handleRegisterButton = () =>
  {
    setAuthDialog(true);
    setTabValue("register");
  }

  const handleLogoutButton = () =>
  {
    setAuth('unauthenticated');
  }

  return (
    <>
    <nav className={`${styles.nav}`}>
      <h1>SpendWise</h1>
      <div className={`${styles.links}`}>
        <Link className={`${styles.link}`} href={''}>About</Link>
        <div className={`${styles.auths}`}>
          <button className={`${styles.button}`} onClick={handleLoginButton}>Login</button>
          <button className={`${styles.button}`} onClick={handleRegisterButton}>Register</button>
          <Dialog.Root open={authDialog}>
            <Dialog.Portal>
              <Dialog.Overlay className={`${dialog.dialogOverlay}`} />

              <Dialog.Content className={`${dialog.dialogContent}`}>
                <Tabs.Root defaultValue={tabValue}>
                  <Tabs.List className={`${dialog.tabsList}`}>
                    <Tabs.Trigger className={`${dialog.tabs} ${dialog.leftTab}`} value={"login"} onClick={() =>setTabValue("login")}>Login</Tabs.Trigger>
                    <Tabs.Trigger className={`${dialog.tabs} ${dialog.rightTab}`} value={"register"} onClick={() =>setTabValue("register")}>Register</Tabs.Trigger>
                  </Tabs.List>

                  {/* LOGIC SECTION */}
                  <Tabs.Content value="login">
                    <Login />
                  </Tabs.Content>

                  {/* REGISTER SECTION */}
                  <Tabs.Content value="register">
                    <Register />
                  </Tabs.Content>
                </Tabs.Root>


                <Dialog.Close asChild>
                  <button className={`${dialog.IconButton} `} onClick={() => setAuthDialog(false)}>
                    <Cross2Icon />
                  </button>
                </Dialog.Close>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </div>
    </nav>
    </>
  )
}