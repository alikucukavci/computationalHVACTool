import React, {useEffect} from 'react'
import file from "../projects"
import axios from "axios"


const projects = file
console.log(projects)
const ProjectBar = () => {


    
useEffect(() => {
    axios.get("/projects")
    return () => {
        cleanup
    };
}, [input])

    return (
        <div className="col-3 projectBar">
            <h5>Projects</h5>
  
            <button className="btn btn-dark">New</button>
        </div>
    )
}

export default ProjectBar
