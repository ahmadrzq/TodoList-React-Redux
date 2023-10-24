export default function FilterList() {
    return (
        <div className="row py-5">
            <div className="col">
                <ul className="nav nav-pills justify-content-center">
                    <li className="nav-item">
                        <a className="nav-link active" aria-current="page" href="#">All</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Active</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Completed</a>
                    </li>
                </ul>
            </div>
        </div>
    )
}
