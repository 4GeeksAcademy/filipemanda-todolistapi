import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";


export const Home = () => {
	const [newTodolist, setnewtodolist] = useState([]);
	const [input, setinput] = useState("");

	useEffect(() => {
		fetch('https://silver-space-fiesta-v67rqqww952p456-3001.app.github.dev/todos')
			.then((resp) => resp.json())
			.then((todos_array) => setnewtodolist(todos_array));

	}, []);

	function handleChange(event) {
		setinput(event.target.value);
	}
	const handleButtonClick = () => {
		fetch('https://silver-space-fiesta-v67rqqww952p456-3001.app.github.dev/todos', {
			method: 'POST',
			body: JSON.stringify(
				{
					task: input,
					done: false
				}
			), // data can be a 'string' or an {object} which comes from somewhere further above in our application
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then((resp) => resp.json())
			.then((todos_array) => setnewtodolist(todos_array));
	}


	const update_task = (editedTodo) => {
		fetch('https://silver-space-fiesta-v67rqqww952p456-3001.app.github.dev/todos/' + editedTodo.id, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(
				{
					task: editedTodo.task,
					done: true
				}
			)
		})
			.then(response => {
				if (!response.ok) {
					throw new Error(`HTTP error ${response.status}`);
				}
				return response.json();
			})
			.then(updatedData => {
				setnewtodolist(updatedData);
			})
			.catch(error => {
				console.error('Error updating data:', error);
			});

	}
	const deleteList = (index) => {
		setnewtodolist(newTodolist.filter((item, idx) => index !== idx));
	}

	return (
		<div className="text-center">
			<h1 className="text-center mt-5">To-Do-List</h1>
			<input className="fa-solid" type="text" placeholder="..." onChange={handleChange} />
			<div className="list">
				<ul>
					{
						newTodolist.length ? newTodolist.map((item, idx) => <li key={idx}> {item.task} <span onClick={() => update_task(item)}><i className="fa-solid fa-pen-to-square" ></i> </span></li>)
							: <h2>Getting Data...</h2>}

				</ul>
			</div>

			<button onClick={handleButtonClick}>send</button>
		</div>
	);
};
