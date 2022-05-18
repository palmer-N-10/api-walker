import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const Show = () => {

    const [apiData, setApiData] = useState()
    const [homeworld, setHomeworld] = useState("")
    const [errMsg, setErrMsg] = useState()
    const { query, x } = useParams();

    const homeWorld = (url) => {
        axios.get(url)
            .then(resp => {
                setHomeworld(resp.data.name);
            })
            .catch(err => console.log("Error API call:", err));
    }

    useEffect(() => {
        setApi()
        if (query) {
            let apiQuery = `https://swapi.dev/api/${query}/${x}/`;
            axios.get(apiQuery)
                .then(resp => {
                    setApiData(resp.data)
                    setErrMsg("");
                    if (query === "people") homeWorld(resp.data.homeworld);
                })
                .catch(err => {
                    setErrMsg("These aren't the droids you're looking for" )
                })
        }
    }, [query, x])

    return (
        <div>
            {
                !errMsg && apiData && ((
                    query === 'planets' &&
                    <>
                        <h1>Planet Name: {apiData.name || ''}</h1>
                        <h2>Climate: {apiData.climate || ''}</h2>
                        <h2>Terrain: {(apiData.terrain &&
                            apiData.terrain.includes(",") ? apiData.terrain.split(",").join(" || ") : apiData.terrain)
                            || "Loading"}</h2>
                    </>
                )
                    ||
                    (query === 'people' &&
                        <>
                            <h1>Name: {apiData.name || ''}</h1>
                            <h2>Hair: {apiData.hair_color || ''}</h2>
                            <h2>Mass: {apiData.mass || ''}kg</h2>
                            <h2>Height: {apiData.height / 100 || ''}m</h2>
                            <h2>Homeworld: {apiData.homeworld &&
                                <Link to={`/planets/${apiData.homeworld[apiData.homeworld.length - 2]}`}>
                                    {homeworld}</Link>
                            } </h2>
                        </>
                    ))
            }
            {
                errMsg &&
                (
                    <p>
                        <h1>{errMsg}</h1>
                    </p>
                )
            }
        </div>
    )
}

export default Show