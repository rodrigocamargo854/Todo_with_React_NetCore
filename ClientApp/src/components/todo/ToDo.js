import React, { useState, useEffect } from 'react';
import ToDoList from './ToDoList'

export const ToDo = () => {

    const [name, setName] = useState("");
    const [tasks, setTasks] = useState([]);
    const [taskToEdit, setTaskToEdit] = useState(null);

    useEffect(() => {
        handleGetTasks();
    }, []);

    const handleTaskNameField = (event) => {

        if (!event.target.value)
            setTaskToEdit(null);

        if (taskToEdit)
            taskToEdit.name = event.target.value;

        setName(event.target.value);
        isSaveButtonDisabled();
    };

    const getTasks = async () => {
        const response = await fetch('todo');
        const data = await response.json();
        return data;
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

    const updateTask = async (task) => {
        await fetch('todo/' + taskToEdit.id, {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(taskToEdit)
        });
    };

    const deleteTask = async (taskId) => {
        await fetch('todo/' + taskId, {
            method: 'delete',
            headers: { 'Content-Type': 'application/json' }
        });
    };

    const toggleTaskStatus = async (taskId) => {
        await fetch('todo/' + taskId, {
            method: 'patch',
            headers: { 'Content-Type': 'application/json' }
        });
    };

    const handleGetTasks = async () => {
        let tasks = await getTasks();
        setTasks(tasks);
    };

    const handleSubmit = async (event) => {
        await saveTasks();
        setName("");
        await handleGetTasks();
    };

    const handleTaskUpdate = async () => {
        await updateTask(taskToEdit);
        setName("");
        setTaskToEdit(null);
        await handleGetTasks();
    };

    const handleTaskDelete = async (taskId) => {
        await deleteTask(taskId);
        await handleGetTasks();
    };

    const handleTaskStatus = async (taskId) => {
        await toggleTaskStatus(taskId);
        await handleGetTasks();
    };

    const setEditTaskMode = (task) => {
        setTaskToEdit(task);
        setName(task.name);
    };

    const isSaveButtonDisabled = () => {
        if (name)
            return false
        return true;
    };

    const renderCreateTask = () => {
        return <div className="container mb-3">
            <div className="row">
                <div className="col-12">
                    <div className="card border-dark">
                        <div className="card-header">
                            Criar Tarefa
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label>Nome</label>
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
                                    type="button"
                                    className={isSaveButtonDisabled() ? "btn btn-secondary" : "btn btn-success"}
                                    onClick={handleSubmit}
                                    disabled={isSaveButtonDisabled()}
                                    hidden={taskToEdit != null}
                                >
                                    Adicionar
                            </button>
                                <button
                                    type="button"
                                    className="btn btn-success"
                                    onClick={handleTaskUpdate}
                                    disabled={taskToEdit == null}
                                    hidden={taskToEdit == null}
                                >
                                    Salvar alterações
                            </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    };

    const renderToDoList = () => {
        return <ToDoList
            tasks={tasks}
            toggleTaskStatus={handleTaskStatus}
            updateTask={setEditTaskMode}
            deleteTask={handleTaskDelete}
        />
    };

    return (
        <div>
            {renderCreateTask()}
            {renderToDoList()}
        </div>
    );

};