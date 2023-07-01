
// LOGIN COMPONENT

import login from '@/styles/components/dialogs/login.module.css';
import { useState } from 'react';

export default () =>
{
	const [ authData, setAuthData ] = useState({
		email: '',
		password: ''
	})

	const handleSubmit = () =>
	{

	}

	return (
		<div className={`${login.container}`}>
			<fieldset className={`${login.fieldset}`}>
			<label className={`${login.label}`} htmlFor="email">Email</label>
			<input type='text' className={`${login.input}`} id="email" placeholder="WiseUser@SpendWise.com" value={authData.email}
				onChange={(e) => setAuthData({...authData, email: e.target.value})}/>
			</fieldset>
			<fieldset className={`${login.fieldset}`}>
			<label className={`${login.label}`} htmlFor="password">Password</label>
			<input type='password' className={`${login.input}`} id="password" placeholder="********" value={authData.password}
				onChange={(e) => setAuthData({...authData, password: e.target.value})}/>
			</fieldset>
			<button className={`${login.button}`}onClick={handleSubmit}>Log In</button>
		</div>
	)
}