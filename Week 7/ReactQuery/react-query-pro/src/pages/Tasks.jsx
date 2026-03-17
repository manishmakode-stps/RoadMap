import { useState } from 'react';
import axios from 'axios';
import { useMutation, useQuery } from '@tanstack/react-query';
import { queryClient } from '../main.jsx';
import '../App.css';

const fetchTasks = async () => {
    const res = await axios.get('http://localhost:3000/tasks');
    return res.data.tasks;
};

const deleteTask = async (id) => {
    const res = await axios.delete(`http://localhost:3000/tasks/${id}`);
    return res.data;
};

const addTask = async (task) => {
    const res = await axios.post('http://localhost:3000/tasks', task);
    return res.data;
};

const Tasks = () => {
    // const queryClient = useQueryClient();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const { data = [], isPending, error } = useQuery({
        queryKey: ['tasks'],
        queryFn: fetchTasks,
    });

    const mutation = useMutation({
        onMutate: async ({ title, description }) => {
            await queryClient.cancelQueries(['tasks']);
            const previousTasks = queryClient.getQueryData(['tasks']);
            queryClient.setQueryData(['tasks'], (old) => [
                ...old,
                {
                    id: Date.now(),
                    title,
                    description,
                    isComplete: false,
                },
            ]);
            return { previousTasks };
        },
        mutationFn: addTask,
        onError: (err, newTask, context) => {
            if(context?.previousTasks){
                queryClient.setQueryData(['tasks'], context.previousTasks);
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({queryKey:['tasks']});
        },
        onSuccess:()=>{
            setTitle('');
            setDescription('');
        }
    });

    const mutationDelete = useMutation({
        onMutate: async (id) => {
            await queryClient.cancelQueries(['tasks']);
            const previousTasks = queryClient.getQueryData(['tasks']);
            queryClient.setQueryData(['tasks'], (old) => old.filter((task) => task.id !== id));
            return {previousTasks};
        },
        onError: (err, id, context) => {
            if(context?.previousTasks){
                queryClient.setQueryData(['tasks'],context.previousTasks);
            }
        },
        mutationFn: deleteTask,
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
        },
    });

    const handleAdd = () => {
        const trimmedTitle = title.trim();
        const trimmedDescription = description.trim();

        if (!trimmedTitle || !trimmedDescription) {
            return;
        }

        mutation.mutate({
            title: trimmedTitle,
            description: trimmedDescription,
            isComplete: false,
        });
    };

    const handleDelete = (id) => {
        mutationDelete.mutate(id);
    };

    return (
        <div className="page">
            <div className="container stack">
                <section className="card stack-sm">
                    <h1 className="title">Add Task</h1>
                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <button
                        className="btn"
                        onClick={handleAdd}
                        disabled={mutation.isPending}
                    >
                        {mutation.isPending ? 'Adding...' : 'Add Task'}
                    </button>
                </section>

                <section className="card stack">
                    <h1 className="title">Tasks</h1>
                    {isPending && <p className="status status-loading">Loading tasks...</p>}
                    {error && <p className="status status-error">Error: {error.message}</p>}
                    {!isPending && !error && (
                        <ul className="list">
                            {data.map((task) => (
                                <li key={task.id} className="post-card stack-sm">
                                    <h3>{task.title}</h3>
                                    <p>{task.description}</p>
                                    <button
                                        className="btn btn-secondary"
                                        onClick={() => handleDelete(task.id)}
                                        disabled={mutationDelete.isPending}
                                    >
                                        Delete
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                    {!isPending && !error && data.length === 0 && (
                        <p className="subtitle">No tasks found for the current API response.</p>
                    )}
                </section>
            </div>
        </div>
    );
};

export default Tasks;
