import { useSelector } from "react-redux";
import CardItem from "./CardItem";
import FilterList from "./FilterList";

export default function TaskList() {
    const tasks = useSelector(state => state.todos.todos)
    console.log(tasks)

    return (
        <>
            <FilterList />
            <div className="row row-cols-1 row-cols-md-3 g-4 py-3">
                {
                    tasks.map((task) => {
                        return (
                            <CardItem key={task.id} task={task} />
                        )
                    })
                }
            </div>
        </>
    )
}
