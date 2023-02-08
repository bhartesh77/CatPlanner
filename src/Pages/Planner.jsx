import React, { useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { AddTaskDetailModal } from "./AddTaskDetailModal";
import classes from "../styles/Planner.module.css";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Video from "../Assets/Celebrate.mp4";
import { v4 as uuid } from "uuid";

export const Planner = () => {
  const [InputTaskValue, setInputTaskValue] = useState("");
  const [Tasks, setTasks] = useState([]);
  const [DisableTask, setDisableTask] = useState(false);
  const [ActivateVideo, setActivateVideo] = useState(false);

  useEffect(() => {
    let CountComplete = 0;
    Tasks.forEach((task) => {
      if (task.Complete === true) CountComplete++;
    });
    if (CountComplete === Tasks.length && Tasks.length > 0)
      setActivateVideo(true);
    else setActivateVideo(false);
  }, [Tasks]);

  const AddTaskInputHandler = (e) => {
    setInputTaskValue(e.target.value);
  };
  const AddTaskButtonHandler = () => {
    setInputTaskValue("");
    if (InputTaskValue.trim().length === 0) return;

    // let TempTasks = Tasks
    let TempTasks = Tasks.filter((obj) => !obj.Complete);
    console.log(TempTasks);
    TempTasks.push({
      Id: uuid(),
      Task: InputTaskValue.trim(),
      Complete: false,
    });
    Tasks.forEach((task) => {
      if (task.Complete === true) TempTasks.push(task);
    });
    setTasks(TempTasks);
  };
  const AddTaskByEnterHandler = (e) => {
    if (e.key === "Enter") {
      setInputTaskValue("");
      if (InputTaskValue.trim().length === 0) return;
      let TempTasks = Tasks.filter((obj) => !obj.Complete);
      console.log(TempTasks);
      TempTasks.push({
        Id: uuid(),
        Task: InputTaskValue.trim(),
        Complete: false,
      });
      Tasks.forEach((task) => {
        if (task.Complete === true) TempTasks.push(task);
      });
      setTasks(TempTasks);
    }
  };

  const DeleteTaskButtonHandler = (TaskId) => {
    const TempTasks = Tasks.filter((task) => task.Id !== TaskId);
    setTasks(TempTasks);
  };

  const CheckTaskButtonHandler = (TaskId) => {
    let TempTasks = [];
    Tasks.forEach((task) => {
      if (task.Id === TaskId) {
        const Temp = task;
        Temp.Complete = !Temp.Complete;
        TempTasks.push(Temp);
        return;
      }
      TempTasks.push(task);
    });

    const CompleteTasks = TempTasks.filter((task) => task.Complete === true);
    TempTasks = TempTasks.filter((task) => task.Complete === false);
    TempTasks = TempTasks.concat(CompleteTasks);
    setTasks(TempTasks);
  };

  return (
    <div className={classes.Planner}>
      <div className={classes.PlannerDiv}>
        
        <div>
          {ActivateVideo && (
            <video autoPlay loop className={classes.Video}>
              <source src={Video} type="video/mp4" />
            </video>
          )}
          <div className={classes.TopContainerDiv}>
            {/* Search Bar */}
            <Paper
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                width: "80%",
                boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
                margin: 0,
              }}
              onChange={AddTaskInputHandler}
              value={InputTaskValue}
              onKeyDown={AddTaskByEnterHandler}
            >
              {/* <IconButton sx={{ p: "10px" }} aria-label="menu">
              <MenuIcon />
            </IconButton> */}
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Enter a new task"
                onChange={AddTaskInputHandler}
                value={InputTaskValue}
                onKeyDown={AddTaskByEnterHandler}
                //   inputProps={{ "aria-label": "search google maps" }}
              />
              <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
                {/* <SearchIcon /> */}
              </IconButton>
              <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
              <Button
                className={classes.AddTaskButton}
                onClick={AddTaskButtonHandler}
              >
                Add
              </Button>
            </Paper>
          </div>
          <div className={classes.TaskList}>
            {Tasks.map((task) => {
              return (
                <button
                  key={task.Id}
                  className={classes.TaskLi}
                  style={{ opacity: task.Complete ? "60%" : "100%" }}
                >
                  <div
                    className={classes.CompleteTaskLine}
                    style={{ opacity: task.Complete ? "40%" : "0" }}
                  ></div>
                  <span
                    className={classes.LiContentSpan}
                    style={{
                      color: ActivateVideo ? "#000" : "#fff",
                      fontWeight: ActivateVideo ? "bold" : "500",
                    }}
                  >
                    {task.Task}
                  </span>
                  <button
                    className={`${classes.LiButton} ${classes.LiButtonDelete}`}
                    onClick={() => DeleteTaskButtonHandler(task.Id)}
                  >
                    <DeleteRoundedIcon />
                  </button>
                  <button
                    className={`${classes.LiButton} ${classes.LiButtonCheck}`}
                    onClick={() => CheckTaskButtonHandler(task.Id)}
                  >
                    <CheckRoundedIcon />
                  </button>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
