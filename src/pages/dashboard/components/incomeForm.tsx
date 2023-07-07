import { useState } from 'react';
import { getSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';


// LOGIN COMPONENT
import form from '@/styles/components/dialogs/form.module.css';
import field from '@/styles/components/fieldset.module.css';

export default () =>
{
    const [ transaction, setTransaction ] = useState({
        name: '',
        description: ''
    });
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
			<button className={`${form.button}`}onClick={handleSubmit}>Add expense</button>
		</div>
	)
}