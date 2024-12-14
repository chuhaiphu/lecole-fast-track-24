import { useDroppable } from '@dnd-kit/core';
import type { Todo } from "~/types/todo";
import { TodoItem } from "./TodoItem";

interface TodoColumnProps {
  id: string;
  title: string;
  todos: Todo[];
}

export function TodoColumn({ id, title, todos }: TodoColumnProps) {
  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <div ref={setNodeRef} className="border rounded-lg p-4">
      <h2 className="font-bold mb-4">{title}</h2>
      <div className="space-y-2">
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </div>
    </div>
  );
}
