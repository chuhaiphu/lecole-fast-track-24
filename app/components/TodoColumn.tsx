import type { Todo } from "~/types/todo";
import { TodoItem } from "./TodoItem";

interface TodoColumnProps {
  title: string;
  todos: Todo[];
  onStatusChange: (id: number, status: Todo["status"]) => void;
  availableActions: Array<Todo["status"]>;
}

export function TodoColumn({ title, todos, onStatusChange, availableActions }: TodoColumnProps) {
  return (
    <div className="border rounded-lg p-4">
      <h2 className="font-bold mb-4">{title}</h2>
      <div className="space-y-2">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onStatusChange={onStatusChange}
            availableActions={availableActions}
          />
        ))}
      </div>
    </div>
  );
}
