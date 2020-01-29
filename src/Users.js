import React, {useEffect, useState} from 'react';
import axios from 'axios';

const API = 'https://acme-users-api-rev.herokuapp.com/api/users';

function Users(){

	const [users, setUsers] = useState([]);
	const [count, setCount] = useState(0);
	const [pages, setPages] = useState([]);
	
	const fetchUser = async() => {
		const userAPI = `${API}` + `${ count ? '/${ count }' : ''}`;
		return axios.get(userAPI).then(res => res.data)
		}

	useEffect(()=>{
		const nums = [];
		for(let i = 0; i < 24; i++){
			nums.push(i);
		}
		fetchUser().then( res => { 
			console.log(res.users);
			setUsers(res.users);
			setPages(nums);
			})

		
		
	},[])
	return (
		<div>
			<nav id = 'pageNav'>{
				pages.map((page, idx) => {
					return(
						<a className = 'page' href = { `${ API }${ page ? '/page' : '' }` }>{ idx }</a>
					)
				})
			}</nav>
			<ul>{
				users.map((user,idx) => {
					return (
						<li key = { idx }>{ user.fullName }</li>
					)
				})
			}</ul>
		</div>
	)
}

export default Users;