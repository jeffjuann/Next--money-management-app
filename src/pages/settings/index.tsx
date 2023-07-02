
import { getSession, signOut } from 'next-auth/react';


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
    return {
      props: {
        name: session?.user.name},
    }
  }
}

export default ({ name }:{ name: string}) =>
{
  const handleLogoutButton = () =>
  {
    signOut();
  }
	return (
		<>
			<Head>
					<title>Settings</title>
			</Head>
			<main>
				<SidebarLayout name={name}>
					<h1>Settings</h1>
          <button onClick={handleLogoutButton}>Log Out</button>
				</SidebarLayout>
			</main>
		</>
	)
}