import React from 'react';
import FormatDate from '../FormatDate';

export default (props) => {
    const handleToggleStatusTask = async (event) => {
        await props.toggleTaskStatus(event.target.value);
    };

    const handleUpdateTask = async (task) => {
        await props.updateTask(JSON.parse(task));
    }
    const handleDelete = async (taskId) => {
        await props.deleteTask(taskId);
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <table className="table">
                        <thead className="thead-dark">
                            <tr>
                                <th></th>
                                <th>Tarefa</th>
                                <th>Criada em</th>
                                <th>Última Modificação</th>
                                <th>Concluída em</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.tasks.map(task =>
                                <tr key={task.id}>
                                    <td>
                                        <div className="form-check">
                                            <input
                                                checked={task.isDone}
                                                onChange={handleToggleStatusTask}
                                                className="form-check-input"
                                                type="checkbox"
                                                value={task.id} />
                                        </div>
                                    </td>
                                    <td>{task.name}</td>
                                    <td>{FormatDate(task.createdAt || "")}</td>
                                    <td>{FormatDate(task.editedAt || "")}</td>
                                    <td>{FormatDate(task.dateConclusion || "")}</td>
                                    <td>
                                        <button
                                            type="button"
                                            className="btn btn-outline-info mr-2"
                                            onClick={() => handleUpdateTask(JSON.stringify(task))}
                                        >Editar</button>

                                        <button
                                            onClick={() => handleDelete(task.id)}
                                            type="button"
                                            className="btn btn-outline-danger"
                                        >Deletar</button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}