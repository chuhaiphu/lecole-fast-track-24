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
      className={`p-3 rounded-lg border cursor-move ${todo.synced ? "bg-green-100" : "bg-yellow-100"} flex justify-between items-center`}
    >
      <p>{todo.title}</p>
      {!todo.synced && (
        <div className="animate-spin h-4 w-4 border-2 border-blue-500 rounded-full border-t-transparent"></div>
      )}
    </div>
  );
}
