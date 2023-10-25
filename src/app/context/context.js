'use client'

import React, {createContext,useContext,useReducer} from 'react';

const TaskContext = createContext();

export const useTaskContext=()=>{
    return useContext(TaskContext);
};

const initialState={
    tasks:[],
    subjects:["Work","Home","Personal","Shopping","School","Sports","Other"]
};

const taskReducer=(state,action)=>{
    switch(action.type){
        case 'ADD_TASK':
            return{
                ...state,
                tasks:[...state.tasks,action.payload],
            }
        case 'GET_TASKS':
            return{
                ...state,
                tasks:action.payload,
            }
        case 'DELETE_TASK':
            return{
                ...state,
                tasks:state.tasks.filter((task)=>task.id!==action.payload),
            }
        default:
            return state;
    }
}

export const TaskProvider=({children})=>{
    const [state,dispatch]=useReducer(taskReducer,initialState);

    return (
        <TaskContext.Provider value={{state,dispatch}}>
            {children}
        </TaskContext.Provider>
    )
}