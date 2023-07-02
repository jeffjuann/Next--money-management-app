
import { getSession } from 'next-auth/react';
import Axios from 'axios';


// COMPONENTS
import Head from 'next/head';
import SidebarLayout from '@/components/sidebar';

// STYLES
import styles from '@/styles/pages/pages.module.css';

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
          </div>
				</SidebarLayout>
			</main>
		</>
	)
}