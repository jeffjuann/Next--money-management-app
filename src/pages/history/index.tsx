
import { getSession } from 'next-auth/react';
import Axios from 'axios';

// COMPONENTS
import Head from 'next/head';
import SidebarLayout from '@/components/sidebar';

// STYLES
import styles from '@/styles/pages/pages.module.css';
import { transaction } from '@prisma/client';

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
        destination: "/",
      },
    }
  }
  else 
  {
    return await Axios.get('http://localhost:3000/api/transaction/'+session?.user.id)
    .then((response) =>
    {
      // console.log(response.data.transactions);
      return {
        props: {
          name: session?.user.name,
          transactions: response.data.transactions,
        },
      }
    })
  }
}

export default ({ name, transactions }:{ name: string, transactions: Array<transaction>}) =>
{
	return (
		<>
			<Head>
					<title>History</title>
			</Head>
			<main>
				<SidebarLayout name={name}>
					<div className={`${styles.pagesContainer}`}>
            <h1>History</h1>
            <div>
              { transactions.map((data) =>
              {
                return (
                  <h1>{data.name}</h1>
                )
              })}
            </div>
          </div>
				</SidebarLayout>
			</main>
		</>
	)
}