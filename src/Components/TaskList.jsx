import { useDispatch, useSelector } from "react-redux";
import CardItem from "./CardItem";
import FilterList from "./FilterList";
import { setFilter } from "../Redux/Reducers/TodosReducer";
import PropTypes from "prop-types";

export default function TaskList() {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.todos.todos);
  const filter = useSelector((state) => state.todos.filter);
  const editingNoteId = useSelector((state) => state.todos.editingNoteId);
  const isFinishEdit = useSelector((state) => state.todos.isFinishEdit);
  const isComplete = useSelector((state) => state.todos.isComplete);

  const handleFilter = (newFilter) => {
    dispatch(setFilter(newFilter));
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "Active") {
      return !task.completed;
    } else if (filter === "Completed") {
      return task.completed;
    } else {
      return true;
    }
  });

  return (
    <>
      <FilterList
        filter={filter}
        handleFilter={handleFilter}
        isFinishEdit={isFinishEdit}
        editingNoteId={editingNoteId}
      />
      <div className="row row-cols-1 row-cols-md-3 g-4 py-3">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <CardItem
              key={task.id}
              task={task}
              editingNoteId={editingNoteId}
              isFinishEdit={isFinishEdit}
              isComplete={isComplete}
            />
          ))
        ) : (
          <p className="text-center w-100">No data found.</p>
        )}
      </div>
    </>
  );
}

TaskList.propTypes = {
  tasks: PropTypes.array,
  filter: PropTypes.string,
  handleFilter: PropTypes.func,
  isFinishEdit: PropTypes.bool,
  editingNoteId: PropTypes.number,
};
