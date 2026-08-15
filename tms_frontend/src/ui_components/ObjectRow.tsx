import { useState } from "react";
import { Link } from "react-router";

type ObjectRowProps = {
  id: string;
  title: string;
  description: string;
  selected: boolean;
};

export default function ObjectRow({
  id,
  title,
  description,
  selected,
}: ObjectRowProps) {
  const [isChecked, setIsChecked] = useState(selected)
  return (
    <div className="task-row position-relative d-flex align-items-center gap-3 p-3 my-3 border rounded-4">
      {/* Independent clickable control */}
      <input        className="form-check-input position-relative z-2"        type="checkbox"        checked={isChecked}        aria-label={`${title} is selected`}        onChange={() => {setIsChecked(!isChecked)}}      />


      {/* Main content/navigation action */}
      <div className="flex-grow-1 overflow-hidden">
        <Link          to={`/action/?id=${id}`}          className="stretched-link text-decoration-none text-reset"        >
          <strong>{title}</strong>
          {description.length>0 ? <span className="text-secondary ms-2">({description})</span> : null}
        </Link>
      </div>

      {/* Independent clickable control */}
      <button        type="button"        className="btn btn-sm btn-outline-warning position-relative z-2"        aria-label={`Edit ${title}`}>
        Edit
      </button>

      {/* Independent clickable control */}
      <button        type="button"        className="btn btn-sm btn-outline-danger position-relative z-2"        aria-label={`Delete ${title}`}>
        Delete
      </button>
    </div>
  );
}