import React from "react";

interface TaskItemProps {
  task: string;
  category: string;
  deadline: string;
  completed: boolean;
  onCheckboxChange: (atividadeId: string, concluida: boolean) => void;
  atividadeId: string;
  categoryColor: string;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  category,
  deadline,
  completed,
  onCheckboxChange,
  atividadeId,
  categoryColor,
}) => {
  return (
    <div className="bg-indigo-100 rounded-lg shadow-md p-6 flex flex-col gap-4 w-full">
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={completed}
          className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
          onChange={() => onCheckboxChange(atividadeId, completed)}
        />
        <span
          className={`text-sm font-medium text-gray-800 ${
            completed ? "line-through text-gray-500" : ""
          }`}
        >
          {task}
        </span>
      </div>
      <div className="text-xs text-gray-500">
        <p>Data limite: {deadline}</p>
        <p>
          Categoria:{" "}
          <strong
            style={{
              color: categoryColor ? categoryColor : "",
              textTransform: "uppercase",
            }}
          >
            {category}
          </strong>
        </p>
      </div>
      <button className="bg-indigo-500 text-white text-sm font-semibold rounded-md px-4 py-2 hover:bg-indigo-600">
        + adicionar pomodoro
      </button>
    </div>
  );
};

export default TaskItem;
