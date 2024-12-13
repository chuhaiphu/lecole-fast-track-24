import { Button } from "~/components/ui/button";
import { TodoColumn } from "~/components/TodoColumn";
import type { Todo } from "~/types/todo";

interface TodoBoardProps {
  todos: Todo[];
  onStatusChange: (todoId: number, status: Todo["status"]) => void;
}

export function TodoBoard({ todos, onStatusChange }: TodoBoardProps) {
  const filterTodosByStatus = (status: Todo["status"]) => {
    return todos.filter((todo) => todo.status === status);
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      <TodoColumn
        title="Backlog"
        todos={filterTodosByStatus("backlog")}
        onStatusChange={onStatusChange}
        availableActions={["in_progress"]}
      />
      <TodoColumn
        title="In Progress"
        todos={filterTodosByStatus("in_progress")}
        onStatusChange={onStatusChange}
        availableActions={["backlog", "done"]}
      />
      <TodoColumn
        title="Done"
        todos={filterTodosByStatus("done")}
        onStatusChange={onStatusChange}
        availableActions={["in_progress"]}
      />
    </div>
  );
}
