export default function FilterList({
  filter,
  handleFilter,
  isFinishEdit,
  editingNoteId,
}) {
  return (
    <div className="row py-5">
      <div className="col">
        <ul className="nav nav-pills justify-content-center">
          <li className="nav-item">
            <button
              className={`nav-link ${filter === "All" ? "active" : ""}`}
              aria-current="page"
              onClick={() => {
                if (isFinishEdit && editingNoteId === null) {
                  handleFilter("All");
                }
              }}
            >
              All
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${filter === "Active" ? "active" : ""}`}
              onClick={() => {
                if (isFinishEdit && editingNoteId === null) {
                  handleFilter("Active");
                }
              }}
            >
              Active
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${filter === "Completed" ? "active" : ""}`}
              onClick={() => {
                if (isFinishEdit && editingNoteId === null) {
                  handleFilter("Completed");
                }
              }}
            >
              Completed
            </button>
          </li>
        </ul>
      </div>
      {editingNoteId !== null ? (
          <span className="text-danger text-center w-100 py-1" style={{ fontSize: 12 }}>
            When editing note can't filter note
          </span>
        ) : (
          ""
        )}
    </div>
  );
}
