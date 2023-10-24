export default function FilterList({filter, handleFilter}) {
    return (
        <div className="row py-5">
            <div className="col">
                <ul className="nav nav-pills justify-content-center">
                    <li className="nav-item">
                        <a className={`nav-link ${filter === 'All' ? 'active' : ''}`} aria-current="page" href="#" onClick={()=> handleFilter('All')}>All</a>
                    </li>
                    <li className="nav-item">
                        <a className={`nav-link ${filter === 'Active' ? 'active' : ''}`} href="#" onClick={()=> handleFilter(('Active'))}>Active</a>
                    </li>
                    <li className="nav-item">
                        <a className={`nav-link ${filter === 'Completed' ? 'active' : ''}`} href="#" onClick={()=> handleFilter('Completed')}>Completed</a>
                    </li>
                </ul>
            </div>
        </div>
    )
}
