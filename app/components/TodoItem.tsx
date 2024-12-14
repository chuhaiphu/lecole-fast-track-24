import { useDraggable } from '@dnd-kit/core';
import type { Todo } from "~/types/todo";

interface TodoItemProps {
  todo: Todo;
}

export function TodoItem({ todo }: TodoItemProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: todo.id,
    data: todo
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`p-3 rounded-lg border cursor-move ${todo.synced ? "bg-green-100" : "bg-yellow-100"}`}
    >
      <p>{todo.title}</p>
    </div>
  );
}
