import React, { useState, useEffect } from "react";
import { Context } from "../store/appContext";
import "./pages/home.css";

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
			body: JSON.stringify({
				task: input,
				done: false
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then((resp) => resp.json())
			.then((todos_array) => setnewtodolist(todos_array));
	};

	const update_task = (editedTodo) => {
		console.log('Updating task:', editedTodo);
		fetch('https://silver-space-fiesta-v67rqqww952p456-3001.app.github.dev/todos/' + editedTodo.id, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				task: editedTodo.task,
				done: !editedTodo.done
			})
		})
			.then(response => {
				if (!response.ok) {
					throw new Error(`HTTP error ${response.status}`);
				}
				return response.json();
			})
			.then(() => {
				setnewtodolist(newTodolist.map(item =>
					item.id === editedTodo.id ? { ...item, done: !item.done } : item
				));
			})
			.catch(error => {
				console.error('Error updating data:', error);
			});
	};

	const deleteList = (id) => {
		fetch('https://silver-space-fiesta-v67rqqww952p456-3001.app.github.dev/todos/' + id, {
			method: 'DELETE'
		})
			.then(response => {
				if (!response.ok) {
					throw new Error(`HTTP error ${response.status}`);
				}
			})
			.then(() => {
				setnewtodolist(newTodolist.filter(item => item.id !== id));
			})
			.catch(error => {
				console.error('Error deleting todo item:', error);
			});
	};

	return (
		<div className="text-center">
			<h1 className="text-center mt-5">To-Do-List</h1>
			<input className="fa-solid" type="text" placeholder="..." onChange={handleChange} />
			<div className="list">
				<ul>
					{
						newTodolist.length ? newTodolist.map((item) => (
							<li key={item.id} className={item.done ? 'task-completed' : ''}>
								{item.task}
								<span onClick={() => update_task(item)} classname="icon-space">

									<i className="fa-solid fa-pen-to-square"></i>
								</span>
								<span onClick={() => deleteList(item.id)} className="icon-space">

									<i className="fa-solid fa-trash"></i>
								</span>
							</li>
						)) : <h2>Getting Data...</h2>
					}
				</ul>
			</div>
			<button onClick={handleButtonClick}>Send</button>
		</div>
	);
};
