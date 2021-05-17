import React, { useState } from 'react';
import ToDoList from './ToDoList';

export const ToDo = () => {

    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        handleGetTasks();

    }, []);

    const geTasks = async () => {
        const response = await fetch('todo');
        const data = await response.json();
        return data;
    };

    const handleGetTasks = async () => {
        let tasks = await geTasks();
        setTasks(tasks);
    };
    const renderTodoList = () => {
        return <ToDoList
            tasks={tasks} 
            />
    };

    return(
        <div>
            {renderTodoList()}
        </div>
    );
};
