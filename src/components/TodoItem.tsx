import { motion } from "framer-motion";
import classes from "./TodoItem.module.css";
import { XCircleIcon, PencilSquareIcon } from "@heroicons/react/24/solid";
import { useContext, useState } from "react";
import { TodosContext } from "../store/todos.context";

type TodoItemProps = {
  text: string;
  id: string;
  onRemoveTodo: (id: string) => void;
};

const TodoItem: React.FC<TodoItemProps> = (props) => {
  const [editingTodo, setEditingTodo] = useState<string>("");
  const [isEditingTodo, setIsEditingTodo] = useState<boolean>(false);

  const todoCtx = useContext(TodosContext);

  const editTodoToggleHandler = () => {
    setEditingTodo(props.text);
    setIsEditingTodo(true);
  };

  const editTodoSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    const editedTodo = todoCtx.items.map((todo) => {
      return todo.id === props.id
        ? { ...todo, text: editingTodo }
        : { ...todo };
    });

    todoCtx.setTodos(editedTodo);

    setIsEditingTodo(false);
  };

  return (
    <li className={classes.item}>
      {isEditingTodo ? (
        <form onSubmit={editTodoSubmitHandler}>
          <input
            type="text"
            onChange={(e) => setEditingTodo(e.target.value)}
            value={editingTodo}
          />
        </form>
      ) : (
        <p>{props.text}</p>
      )}

      <div>
        <motion.div
          onClick={editTodoToggleHandler}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 1 }}
        >
          <PencilSquareIcon className={classes.button} />
        </motion.div>

        <motion.div
          onClick={() => props.onRemoveTodo(props.id)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 1 }}
        >
          <XCircleIcon className={classes.button} />
        </motion.div>
      </div>
    </li>
  );
};

export default TodoItem;
