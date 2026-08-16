import React from 'react'



export function Homepage() {
  return (
    <>
        <div>Homepage</div>
        <a className="btn btn-secondary p-3" href="list/category/" role="button">Category</a>
        <a className="btn btn-secondary p-3" href="list/tag/" role="button">Tag</a>
        <a className="btn btn-outline-secondary p-3" href="list/task/" role="button">Task</a>
        <a className="btn btn-outline-secondary p-3" href="list/activity/" role="button">Activity</a>
        <a className="btn btn-outline-secondary p-3" href="list/action/" role="button">Action</a>
            
        
    </>
  )
}

