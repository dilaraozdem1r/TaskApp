'use client'

import React, {createContext,useContext,useReducer} from 'react';

const TodoContext = createContext();

export const useTodoContext=()=>{
    return useContext(TodoContext);
};

const initialState={
    todos:[],
    subjects:["Work","Home","Personal","Shopping","School","Sports","Other"]
};

const todoReducer=(state,action)=>{
    switch(action.type){
        case 'ADD_TODO':
            return{
                ...state,
                todos:[...state.todos,action.payload],
            }
        case 'GET_TODOS':
            return{
                ...state,
                todos:action.payload,
            }
        case 'DELETE_TODO':
            return{
                ...state,
                todos:state.todos.filter((todo)=>todo.id!==action.payload),
            }
        default:
            return state;
    }
}

export const TodoProvider=({children})=>{
    const [state,dispatch]=useReducer(todoReducer,initialState);

    return (
        <TodoContext.Provider value={{state,dispatch}}>
            {children}
        </TodoContext.Provider>
    )
}