import { useDispatch, useSelector } from "react-redux";
import CardItem from "./CardItem";
import FilterList from "./FilterList";
import { setFilter } from "../Redux/Reducers/TodosReducer";

export default function TaskList() {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.todos.todos);
  const filter = useSelector((state) => state.todos.filter);
  console.log(tasks);
  console.log(filter);

  const handleFilter = (newFilter) => {
    dispatch(setFilter(newFilter))
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
      <FilterList filter={filter} handleFilter={handleFilter}/>
      <div className="row row-cols-1 row-cols-md-3 g-4 py-3">
        {filteredTasks.map((task) => {
          return <CardItem key={task.id} task={task} />;
        })}
      </div>
    </>
  );
}
