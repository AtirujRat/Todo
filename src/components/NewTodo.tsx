import { useContext, useState } from "react";
import classes from "./NewTodo.module.css";
import { motion } from "framer-motion";
import { TodosContext } from "../store/todos.context";

const NewTodo: React.FC = () => {
  const [newTodoInput, SetNewTodoInput] = useState<string>("");

  const todoCtx = useContext(TodosContext);

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    if (newTodoInput.trim().length === 0) {
      return;
    }

    todoCtx.addTodo(newTodoInput);

    SetNewTodoInput("");
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <label htmlFor="text">Todo text</label>
      <input
        onChange={(e) => SetNewTodoInput(e.target.value)}
        value={newTodoInput}
        type="text"
        id="text"
      />
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 1 }}
        type="submit"
      >
        Add Todo
      </motion.button>
    </form>
  );
};

export default NewTodo;
