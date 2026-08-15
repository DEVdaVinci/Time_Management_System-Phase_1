import React from 'react'



export function Homepage() {
  return (
    <>
        <div>Homepage</div>
        <a className="btn btn-secondary p-3" href="list/categories/" role="button">Category</a>
        <a className="btn btn-secondary p-3" href="list/tags/" role="button">Tag</a>
        <a className="btn btn-outline-secondary p-3" href="list/tasks/" role="button">Task</a>
        <a className="btn btn-outline-secondary p-3" href="list/activities/" role="button">Activity</a>
        <a className="btn btn-outline-secondary p-3" href="list/actions/" role="button">Action</a>
            
        
    </>
  )
}

