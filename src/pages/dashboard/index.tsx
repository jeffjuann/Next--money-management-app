import { useState } from 'react';
import { getSession } from 'next-auth/react';
import Axios from 'axios';

// COMPONENTS
import Head from 'next/head';
import SidebarLayout from '@/components/sidebar';
import * as Tabs from '@radix-ui/react-tabs';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';

// STYLES
import styles from '@/styles/pages/pages.module.css';
import dialog from '@/styles/components/dialogs/dialog.module.css'


export async function getServerSideProps(context: any)
{
  const session = await getSession(context);
  if( session === null )
  {
    console.log("ERROR: SESSION NULL");
    return {
      props: {},
      redirect: {
        permanent: false,
        destination: "/login",
      },
    }
  }
  const id = session?.user.id;
  return await Axios.get('http://localhost:3000/api/user/'+id)
  .then((response) =>
  {
    return {
      props: {
        data: {
          error: null,
          user: {
            id: id,
            name: response.data.name,
            balance: response.data.balance,
          },
        }
      },
    }
  }).catch(() =>
  {
    return {
      props: {
        data: {
          error: "failed fetching data",
        }
      },
    }
  })
}

export default ({ data }:{ data: any}) =>
{

	return (
		<>
			<Head>
					<title>Dashboard</title>
			</Head>
			<main>
				<SidebarLayout name={data.user.name}>
					<div className={`${styles.pagesContainer}`}>
            <h1>Dashboard</h1>

            <h2>Your Current Balance: Rp. {data.user.balance}</h2>
            <Tabs.Root defaultValue={'monthly'}>
              <Tabs.List className={``}>
                <Tabs.Trigger className={``} value={'monthly'}>Monthly</Tabs.Trigger>
                <Tabs.Trigger className={``} value={"weekly"}>Weekly</Tabs.Trigger>
              </Tabs.List>

              {/* SHOW MONTHLY */}
              <Tabs.Content value='monthly'>
                <h2>This Month you spend: Rp. {data.user.balance}</h2>
              </Tabs.Content>

              {/* SHOW WEEKLY */}
              <Tabs.Content value='weekly'>
                <h2>This Week you spend: Rp. {data.user.balance}</h2>
              </Tabs.Content>
            </Tabs.Root>
            
            {/* Add Expense */}
            <Dialog.Root>
              <Dialog.Trigger asChild>
                <button >Add Expense</button>
              </Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Overlay className={`${dialog.dialogOverlay}`} />
                <Dialog.Content className={`${dialog.dialogContent}`}>
                  <h1>Add Expense Dialog</h1>
                  <Dialog.Close asChild>
                    <button className={`${dialog.IconButton}`}>
                      <Cross2Icon />
                    </button>
                  </Dialog.Close>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>

            {/* Add Income */}
            <Dialog.Root>
              <Dialog.Trigger asChild>
                <button >Add Income Dialog</button>
              </Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Overlay className={`${dialog.dialogOverlay}`} />
                <Dialog.Content className={`${dialog.dialogContent}`}>
                  <h1>Add Income Dialog</h1>
                  <Dialog.Close asChild>
                    <button className={`${dialog.IconButton}`}>
                      <Cross2Icon />
                    </button>
                  </Dialog.Close>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
          </div>
				</SidebarLayout>
			</main>
		</>
	)
}