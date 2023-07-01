import Link from "next/link";
import styles from '@/styles/nav.module.css';

// DIALOG
import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import login from '@/styles/login.module.css';
import * as Tabs from '@radix-ui/react-tabs';

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
              <Dialog.Overlay className={`${login.DialogOverlay}`} />

              <Dialog.Content className={`${login.DialogContent}`}>
                <Tabs.Root defaultValue={tabValue}>
                  <Tabs.List>
                    <Tabs.Trigger value={"login"} onClick={() =>setTabValue("login")}>Login</Tabs.Trigger>
                    <Tabs.Trigger value={"register"} onClick={() =>setTabValue("register")}>Register</Tabs.Trigger>
                  </Tabs.List>
                  <Tabs.Content value="login">
                    this is login tab
                  </Tabs.Content>

                  <Tabs.Content value="register">
                    this is register tab
                  </Tabs.Content>
                </Tabs.Root>


                {/* <fieldset className={`${login.Fieldset}`}>
                  <label className={`${login.Label}`} htmlFor="name">
                    Name
                  </label>
                  <input className={`${login.Input}`} id="name" defaultValue="Pedro Duarte" />
                </fieldset>
                <fieldset className={`${login.Fieldset}`}>
                  <label className={`${login.Label}`} htmlFor="username">
                    Username
                  </label>
                  <input className={`${login.Input}`} id="username" defaultValue="@peduarte" />
                </fieldset>
                <div style={{ display: 'flex', marginTop: 25, justifyContent: 'flex-end' }}>
                  <Dialog.Close asChild>
                    <button className={`${login.Button} ${login.green} `}>Save changes</button>
                  </Dialog.Close>
                </div>  */}
                <Dialog.Close asChild>
                  <button className={`${login.IconButton} `} aria-label="Close" onClick={() => setAuthDialog(false)}>
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