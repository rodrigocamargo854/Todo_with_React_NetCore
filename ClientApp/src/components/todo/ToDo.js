import React, { useState, useEffect } from 'react';
import ToDoList from './ToDoList';

export const ToDo = () => {

    const [tasks, setTasks] = useState([]);
    const [name, setName] = useState();

    useEffect(() => {
        handleGetTasks();

    }, []);

    const renderCreateTask = () => {
        return <div className="container mb-3">
            <div className="row">
                <div className="col-12">
                    <div className="card border-dark">
                        <div className="card-header">
                            Create Task
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label>Name</label>
                                        <input
                                            type="text"
                                            onChange={handleTaskNameField}
                                            className="form-control"
                                            name="name"
                                            placeholder="eg.: Study"
                                            value={name}
                                            required />
                                    </div>
                                </div>
                                <button
                                    type='button'
                                    className={isSaveButtonDisabled() ? "btn btn-secondary" :
                                        "btn btn-sucess"}
                                    onclick={handleSubmit}
                                    disabled={isSaveButtonDisabled()}
                                >
                                    Add
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
    //metodos para delete
    const deleteTask = async (taskId) => {
        await fetch('todo/' + taskId, {
            method: 'delete',
            headers: { 'Content-Type': 'application/json' }
        });
    };

    const handleTaskDelete = async (taskId) => {
        await deleteTask(taskId);
        await handleGetTasks();
    };
    //A propriedade deleteTask recebe a referência de handleTaskDelete que 
    //será acionada pelo compenente filho ToDoList.js 
    //assim que o usuário clicar no botão Delete

    const renderToDoList = () => {
        return <ToDoList
        tasks={tasks}
        deleteTask={handleTaskDelete}
        />
           };
       



    

    const saveTasks = async () => {
        await fetch('todo', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                Name: name,
                IsDone: false
            })
        });
    };

    const handleSubmit = async (event) => {
        await saveTasks();
        setName("");
        await handleGetTasks();
    };

    const isSaveButtonDisabled = () => {
        if (name)
            return false
        return true;
    };

    const handleTaskNameField = (event) => {
        setName(event.target.value);
        isSaveButtonDisabled();
    };



    const geTasks = async () => {
        const response = await fetch('todo');
        const data = await response.json();
        return data;
    };

    const handleGetTasks = async () => {
        let tasks = await geTasks();
        setTasks(tasks);
    };
    const renderToDoList = () => {
        return <ToDoList
            tasks={tasks}
        />
    };

    return (
        <div>
            {renderCreateTask()}
            {renderToDoList()}
        </div>
    );
};
