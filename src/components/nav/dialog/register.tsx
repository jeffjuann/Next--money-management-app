
// REGISTER COMPONENT
import form from '@/styles/components/dialogs/form.module.css'; // CSS
import field from '@/styles/components/fieldset.module.css'; // CSS
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import Axios from 'axios';

export default () =>
{
  const { push } = useRouter();
	const [ newUser, setNewUser ] = useState({
		name: '',
		email: '',
		password: ''
	})

	const handleSubmit = async () =>
	{
    await Axios.post('http://localhost:3000/api/user',
		{
      name: newUser.name,
		  email: newUser.email, 
		  password: newUser.password
		}).then((response) => console.log(response));
    const resSignIn = await signIn("credentials", {
      email: newUser.email,
      password: newUser.password,
      redirect: false
    })
    push("./dashboard");
	}

	return (
		<div className={`${form.container}`}>
			<fieldset className={`${field.fieldset}`}>
			<label className={`${field.label}`} htmlFor="name">Name</label>
			<input type='text' className={`${field.input}`} id="name" placeholder="Name" value={newUser.name}
				onChange={(e) => setNewUser({...newUser, name: e.target.value})}/>
			</fieldset>
			<fieldset className={`${field.fieldset}`}>
			<label className={`${field.label}`} htmlFor="email">Email</label>
			<input type='text' className={`${field.input}`} id="email" placeholder="Email" value={newUser.email}
				onChange={(e) => setNewUser({...newUser, email: e.target.value})}/>
			</fieldset>
			<fieldset className={`${field.fieldset}`}>
			<label className={`${field.label}`} htmlFor="password">Password</label>
			<input type='password' className={`${field.input}`} id="password" placeholder="********" value={newUser.password}
				onChange={(e) => setNewUser({...newUser, password: e.target.value})}/>
			</fieldset>
			<button className={`${form.button}`}onClick={handleSubmit}>Register</button>
		</div>
	)
}