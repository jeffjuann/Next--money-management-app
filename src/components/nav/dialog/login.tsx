import { useState } from 'react';
import { getSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';


// LOGIN COMPONENT
import form from '@/styles/components/dialogs/form.module.css';

export async function getServerSideProps(context: any)
{
  const session = await getSession(context);
  if( session !== null )
  {
    console.log("ERROR: SESSION NOT NULL");
    return {
      props: {},
      redirect: {
        permanent: false,
        destination: "/dashboard",
      },
    }
  }
  else 
  {
    return {
      props: {},
    }
  }
}

export default () =>
{
	const [ authData, setAuthData ] = useState({
		email: '',
		password: ''
	})

  const { push } = useRouter();
  const [err, setErr] = useState(false);

	const handleSubmit = async () =>
	{
    const res = await signIn("credentials", {
      username: authData.email,
      password: authData.password,
      redirect: false
    })
    if(res?.error === 'invalid credentials') setErr(true);
    else push("./dashboard");
	}

	return (
		<div className={`${form.container}`}>
			<fieldset className={`${form.fieldset}`}>
			<label className={`${form.label}`} htmlFor="email">Email</label>
			<input type='text' className={`${form.input}`} id="email" placeholder="Email" value={authData.email}
				onChange={(e) => setAuthData({...authData, email: e.target.value})}/>
			</fieldset>
			<fieldset className={`${form.fieldset}`}>
			<label className={`${form.label}`} htmlFor="password">Password</label>
			<input type='password' className={`${form.input}`} id="password" placeholder="********" value={authData.password}
				onChange={(e) => setAuthData({...authData, password: e.target.value})}/>
			</fieldset>
      {err && <p style={{color: 'red'}}>Invalid Credentials</p>}
			<button className={`${form.button}`}onClick={handleSubmit}>Log In</button>
		</div>
	)
}