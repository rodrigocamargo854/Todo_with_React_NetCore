import React from 'react';
import FormatDate from '../FormatDate';

export default (props) => {

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
                                <th>Task</th>
                                <th>Created at</th>
                                <th>Last modified</th>
                                <th>Concluded at</th>
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
                                        >Edit</button>
                                        <button
                                            onClick={() => handleDelete(task.id)}
                                            type="button"
                                            className="btn btn-outline-danger"
                                        >Delete</button>
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