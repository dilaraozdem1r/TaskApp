import React, { useState, useEffect } from "react";
import { useTodoContext } from "../context/context";
import dynamic from "next/dynamic";
import axios from "axios";
import styles from "../styles/Chart.module.css";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

function TaskChart() {
  const { state, dispatch } = useTodoContext();

  const [taskCounts, setTaskCounts] = useState({});
  const [subjectCounts, setSubjectCounts] = useState({});

  const getDayAndMonthFromDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    return { day, month };
  };

  useEffect(() => {
    axios.get("http://localhost:4000/todos").then((response) => {
      const newTaskCounts = {};
      const newSubjectCounts = {};
      const sortedData = response.data.sort((a, b) => new Date(a.createdOn) - new Date(b.createdOn));


      sortedData.forEach((todo) => {
        const { day, month } = getDayAndMonthFromDate(todo.createdOn);
        const key = `${day}.${month}`;

        if (newTaskCounts[key]) {
          newTaskCounts[key] += 1;
        } else {
          newTaskCounts[key] = 1;
        }

        const subject = todo.subject;
        if (newSubjectCounts[subject]) {
          newSubjectCounts[subject] += 1;
        } else {
          newSubjectCounts[subject] = 1;
        }
      });

      setTaskCounts(newTaskCounts);
      setSubjectCounts(newSubjectCounts);
    });
  }, []);

  const lineChartData = {
    options: {
      chart: {
        id: "line-chart",
      },
      xaxis: {
        categories: Object.keys(taskCounts),
      },
      yaxis: {
        title: {
          text: "Count of Tasks",
        },
      },
      title: {
        text: "Number of Tasks Per Day",
        align: "center",
        margin:60,
        offsetY: 20,
        style: {
          fontSize: "25px",
        },
      },
      stroke: {
        curve: "smooth",
        width: 3, 
        colors: ["#EB455F"], 
      },
    },
    series: [
      {
        name: "series-1",
        data: Object.values(taskCounts),
      },
    ],
  };

  const donutChartData = {
    options: {
      chart: {
        type: "donut",
      },
      labels: state.subjects,
      title: {
        text: "Tasks by Subject",
        align: "center",
        margin: 60,
        offsetY: 20,
        style: {
          fontSize: "25px",
        },
      },
    },
    series: state.subjects.map((subject) => subjectCounts[subject] || 0),
  };

  return (
    <div style={{ marginTop: "8rem", display: "flex" }}>
      <div className={styles.chartContainer}>
        <main>
          <Chart
            options={lineChartData.options}
            series={lineChartData.series}
            type="line"
            height={500}
            width={500}
          />
        </main>
      </div>
      <div className={styles.chartContainer}>
        <main>
          <Chart
            options={donutChartData.options}
            series={donutChartData.series}
            type="donut"
            height={500}
            width={500}
          />
        </main>
      </div>
    </div>
  );
}

export default TaskChart;
