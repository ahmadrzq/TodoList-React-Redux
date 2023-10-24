import { useState } from 'react';

export default function Todos() {
    const [todos, setTodos] = useState('');
    const handleChange = (e) => {
        setTodos(e.target.value);
    };

    return (
        <>
            <div className="add__todos">
                <input type="text" value={todos} onChange={handleChange} />
            </div>

            <button className='add__button'>Add</button>
        </>
    );
}
