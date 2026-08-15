import { useState } from "react";
import { Link } from "react-router";

type TaskRowProps = {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  starred: boolean;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
};

export default function TaskRow({
  id,
  title,
  description,
  completed,
  starred,
  
  onEdit,
  onDelete,
}: TaskRowProps) {
  const [isChecked, setIsChecked] = useState(completed)
  const [isStarred, setIsStarred] = useState(starred)
  return (
    <div className="task-row position-relative d-flex align-items-center gap-3 p-3 my-3 border rounded-4">
      {/* Independent clickable control */}
      <input        className="form-check-input position-relative z-2"        type="checkbox"        checked={isChecked}        aria-label={`Mark ${title} as completed`}        onChange={() => {setIsChecked(!isChecked)}}      />

      {/* Independent clickable control */}
      <button
        type="button"        className="btn btn-sm position-relative z-2"        aria-label={isStarred ? `Unstar ${title}` : `Star ${title}`}        onClick={() => {setIsStarred(!isStarred)}}      >
        {isStarred ? "★" : "☆"}
      </button>

      {/* Main content/navigation action */}
      <div className="flex-grow-1 overflow-hidden">
        <Link          to={`/action/?id=${id}`}          className="stretched-link text-decoration-none text-reset"        >
          <strong>{title}</strong>
          {description.length>0 ? <span className="text-secondary ms-2">({description})</span> : null}
        </Link>
      </div>

      {/* Independent clickable control */}
      <button        type="button"        className="btn btn-sm btn-outline-warning position-relative z-2"        aria-label={`Edit ${title}`}        onClick={() => onEdit(id)}      >
        Edit
      </button>

      {/* Independent clickable control */}
      <button        type="button"        className="btn btn-sm btn-outline-danger position-relative z-2"        aria-label={`Delete ${title}`}        onClick={() => onDelete(id)}      >
        Delete
      </button>
    </div>
  );
}