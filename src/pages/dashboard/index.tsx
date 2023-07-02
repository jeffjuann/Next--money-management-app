
import { getSession } from 'next-auth/react';


// COMPONENTS
import Head from 'next/head';
import SidebarLayout from '@/components/sidebar';

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
		console.log(session);
    return {
      props: {
        name: session?.user.name},
    }
  }
}

export default ({ name }:{ name: string}) =>
{
	return (
		<>
			<Head>
					<title>Dashboard</title>
			</Head>
			<main>
				<SidebarLayout name={name}>
					<h1>Dashboard</h1>
				</SidebarLayout>
			</main>
		</>
	)
}