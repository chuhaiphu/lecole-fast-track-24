import { Button } from "~/components/ui/button";
import type { Todo } from "~/types/todo";

interface TodoItemProps {
  todo: Todo;
  onStatusChange: (id: number, status: Todo["status"]) => void;
  availableActions: Array<Todo["status"]>;
}

export function TodoItem({ todo, onStatusChange, availableActions }: TodoItemProps) {
  return (
    <div className={`p-3 rounded-lg border ${todo.synced ? "bg-green-100" : "bg-yellow-100"}`}>
      <p>{todo.title}</p>
      <div className="flex gap-2 mt-2">
        {availableActions.map((status) => (
          <Button key={status} size="sm" onClick={() => onStatusChange(todo.id, status)}>
            Move to {status.replace("_", " ")}
          </Button>
        ))}
      </div>
    </div>
  );
}
