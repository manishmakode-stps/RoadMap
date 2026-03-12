import { createContext, useContext, useState, useEffect, useMemo } from "react";

const MovieContext = createContext([]);

async function fetchData(){
    try{
        const res = await fetch("https://jsonfakery.com/movies/paginated");

        if(!res.ok){
           throw new Error(`HTTP error! status: ${res.status}`);
        }
        const result = await res.json();

        return result.data;

    }catch(error){
        console.log("error occured ",error);
        alert("Error Occured ",error)
        return []
    }
}

export function MovieProvider({children}){

    const [movies,setMovies] = useState([]);
    const [loading,setLoading] = useState(true);

    useEffect(()=>{
        const load = async ()=>{
            const result = await fetchData();
            if(result){
                setMovies(result);
            } 
            setLoading(false);
        }
        load();
    },[])


    const value = useMemo(()=>{
       return {movies,
        loading}
    },[movies,loading])
    return(
        <MovieContext.Provider value={value}>
            {children}
        </MovieContext.Provider>
    )
}

export function getMovies(){
    return useContext(MovieContext);
}