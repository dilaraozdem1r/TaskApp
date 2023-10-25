import React from 'react';
import { TodoProvider } from '@/app/context/context';
import Navbar from '@/app/components/navbar';
import TaskChart from '@/app/components/taskChart';

export default function taskStatistics() {
  return (
    <TodoProvider>
        <Navbar/>
         <TaskChart/> 
    </TodoProvider>
  )
}
