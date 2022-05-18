import React, { useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';

const Form = () => {
    const navigate = useNavigate();
    const [query, setQuery] = useState({
        queryType: "people",
        id: 0
    })

    const changeHandler = (e) => {
        const { name, value } = e.target;
        setQuery({
            ...query,
            [name]: value
        });
    }

    const submitHandler = (e) => {
        e.preventDefault();
        query.queryType && query.id
            ? navigate(`${query.queryType}/${query.id}`)
            : alert(" Please fill out all information");
    }


    return (
        <div>
            <form onSubmit={submitHandler}>
                <div>
                    <label>Query Type: </label>
                    <select name="queryType" onChange={changeHandler}>
                        <option value="people">People</option>
                        <option value="planets">Planets</option>
                    </select>
                </div>
                <div>
                    <label>ID: </label>
                    <input
                        type="number"
                        name="id"
                        value={query.id}
                        onChange={changeHandler} />
                </div>
                <button>Search</button>
            </form>
            <Outlet />
        </div>
    )
}

export default Form