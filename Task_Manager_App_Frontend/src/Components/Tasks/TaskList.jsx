import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks,fetchAllData }) => {
  return (
    <div>
      {tasks.map((task) => (
        <TaskItem key={task.task_id} task={task} fetchAllData={fetchAllData}/>
      ))}
    </div>
  );
};

export default TaskList;
