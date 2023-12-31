import { useState } from 'react';
import { getSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';


// LOGIN COMPONENT
import form from '@/styles/components/dialogs/form.module.css';
import field from '@/styles/components/fieldset.module.css';

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
			<fieldset className={`${field.fieldset}`}>
			<label className={`${field.label}`} htmlFor="email">Email</label>
			<input type='text' className={`${field.input}`} id="email" placeholder="Email" value={authData.email}
				onChange={(e) => setAuthData({...authData, email: e.target.value})}/>
			</fieldset>
			<fieldset className={`${field.fieldset}`}>
			<label className={`${field.label}`} htmlFor="password">Password</label>
			<input type='password' className={`${field.input}`} id="password" placeholder="********" value={authData.password}
				onChange={(e) => setAuthData({...authData, password: e.target.value})}/>
			</fieldset>
      {err && <p style={{color: 'red'}}>Invalid Credentials</p>}
			<button className={`${form.button}`}onClick={handleSubmit}>Log In</button>
		</div>
	)
}