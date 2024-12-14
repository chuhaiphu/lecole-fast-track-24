import { useEffect, useState } from "react";
import type { Route } from "../track-three/+types";
import { Button } from "~/components/ui/button";
import { TodoBoard } from "~/components/TodoBoard";
import { localDbService } from "~/services/localDb";
import type { Todo } from "~/types/todo";
import { AddTodoDialog } from "~/components/AddTodoDialog";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Track Three" }];
}

export default function TrackThree() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<string>("");
  const [showAddDialog, setShowAddDialog] = useState(false);

  useEffect(() => {
    const initDb = async () => {
      try {
        await localDbService.initialize();
        await syncWithBackend();
        loadTodos();
      } catch (err: any) {
        setError(err.message || "Failed to initialize local database");
      }
    };

    if (typeof window !== "undefined") {
      initDb();
    }

    return () => {
      localDbService.close();
    };
  }, []);

  const loadTodos = () => {
    setTodos(localDbService.getTodos());
  };

  const updateTodoStatus = (todoId: number, newStatus: Todo["status"]) => {
    try {
      localDbService.updateTodoStatus(todoId, newStatus);
      loadTodos();
    } catch (err: any) {
      setError("Failed to update todo status");
    }
  };

  const syncWithBackend = async () => {
    try {
      const unsyncedTodos = localDbService.getUnsyncedTodos();
      console.log("Unsynced todos:", unsyncedTodos);
      
      const response = await fetch("http://localhost:3000/api/todos/sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ todos: unsyncedTodos })
      });

      if (!response.ok) throw new Error("Sync failed");
      const serverTodos = await response.json();
      console.log("Server response:", serverTodos);
      
      localDbService.syncTodos(serverTodos);
      loadTodos();
    } catch (err: any) {
      setError("Failed to sync with backend: " + err.message);
    }
  };
  useEffect(() => {
    const interval = setInterval(syncWithBackend, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col p-8 gap-4 min-h-screen">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Todo App</h1>
        <Button onClick={syncWithBackend}>Sync Now</Button>
      </div>

      {error && <div className="text-red-500 mb-4">Error: {error}</div>}

      <Button onClick={() => setShowAddDialog(true)}>Add New Todo</Button>

      {showAddDialog && (
        <AddTodoDialog
          onAdd={(title) => {
            localDbService.addTodo(title);
            loadTodos();
          }}
          onClose={() => setShowAddDialog(false)}
        />
      )}

      <TodoBoard todos={todos} onStatusChange={updateTodoStatus} />
    </div>
  );
}