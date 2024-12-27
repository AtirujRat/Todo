import React, { createContext, useState } from "react";

import Todo from "../models/todo";

type TodoContextType = {
  items: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  addTodo: (todoText: string) => void;
  removeTodo: (id: string) => void;
};

export const TodosContext = createContext<TodoContextType>({
  items: [],
  setTodos: () => {},
  addTodo: () => {},
  removeTodo: () => {},
});

const TodosContextProvider: React.FC<{ children: React.ReactNode }> = (
  props
) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodoHandler = (todoText: string) => {
    const newTodo: Todo = {
      id: Math.random().toString(),
      text: todoText,
    };

    setTodos((prevTodos) => {
      return prevTodos.concat(newTodo);
    });
  };

  const removeTodoHandler = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const contextValue: TodoContextType = {
    items: todos,
    setTodos: setTodos,
    addTodo: addTodoHandler,
    removeTodo: removeTodoHandler,
  };

  return (
    <TodosContext.Provider value={contextValue}>
      {props.children}
    </TodosContext.Provider>
  );
};

export default TodosContextProvider;
