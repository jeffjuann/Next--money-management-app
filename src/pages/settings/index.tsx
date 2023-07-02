
import { useState } from 'react';
import { useRouter } from 'next/router';
import { getSession, signOut, useSession } from 'next-auth/react';
import Axios from 'axios';

// COMPONENTS
import Head from 'next/head';
import SidebarLayout from '@/components/sidebar';

// STYLES
import styles from '@/styles/pages/pages.module.css';
import field from '@/styles/components/fieldset.module.css';

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
            email: response.data.email,
            password: response.data.password,
            balance: response.data.balance,
            createdAt: response.data.createdAt,
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
  const { update } = useSession();
  const { push } = useRouter();
  const [ ableSaveBtn, setAbleSaveBtn] = useState(false);

  const handleLogoutButton = () =>
  {
    signOut({
      redirect: false,
    });
    push('/');
  }

  const [ userData, setUserData ] = useState(data.user);

  const handleSaveButton = async () =>
  {
    if(ableSaveBtn === true)
    {
      console.log('triggered');
      await Axios.patch('http://localhost:3000/api/user/'+data.user.id,
      {
        name: userData.name,
        email: userData.email,
        password: userData.password,
      }).then(() =>
      {
        update({ name: userData.name, email: userData.email });
        push('/settings');
      })
    }
  }


	return (
		<>
			<Head>
					<title>Settings</title>
			</Head>
			<main>
				<SidebarLayout name={data.user.name}>
          <div className={`${styles.pagesContainer}`}>
            <h1>Settings</h1>
            <hr className={`${styles.lineDivider}`} />
            <div className={`${styles.profileSection}`}>
              <h2>Profile</h2>
              <fieldset className={`${field.fieldset}`}>
                <label className={`${field.label}`} htmlFor="name">Name</label>
                <input type='text' className={`${field.input}`} id="name" value={userData.name}
                  onChange={(e) => {setUserData({...userData, name: e.target.value}); setAbleSaveBtn(true)}}/>
              </fieldset>
              
              <fieldset className={`${field.fieldset}`}>
                <label className={`${field.label}`} htmlFor="email">Email</label>
                <input type='text' className={`${field.input}`} id="email" value={userData.email}
                  onChange={(e) => {setUserData({...userData, email: e.target.value}); setAbleSaveBtn(true)}}/>
              </fieldset>
              
              <fieldset className={`${field.fieldset}`}>
                <label className={`${field.label}`} htmlFor="email">Password</label>
                <input type='text' className={`${field.input}`} id="email" value={userData.password}
                  onChange={(e) => {setUserData({...userData, password: e.target.value}); setAbleSaveBtn(true)}}/>
              </fieldset>

              <button className={`${styles.saveButton} ${!ableSaveBtn && styles.ableSaveBtn}`} onClick={handleSaveButton}>Save Changes</button>
            </div>
            <hr className={`${styles.lineDivider}`} />
            <button className={`${styles.logoutButton}`} onClick={handleLogoutButton}>Log Out</button>
          </div>
				</SidebarLayout>
			</main>
		</>
	)
}