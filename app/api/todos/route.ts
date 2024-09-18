import { ToDo } from "@/types/todo";

let todos: ToDo[] = [
  {
    id: 1,
    task: "Buy Milk",
    done: true,
  },
  {
    id: 2,
    task: "Pay Utility Bills",
    done: false,
  },
  {
    id: 3,
    task: "Pick up Randy after Soccer",
    done: false,
  },
];

export async function GET() {
  console.log("GET");
  return Response.json(todos, { status: 200 });
}

export async function POST(req: Request) {
  console.log("POST");
  const { id, task } = await req.json();
  const newTodo: ToDo = { id, task, done: false };
  todos.push(newTodo);
  return Response.json(newTodo, { status: 201 });
}

export async function DELETE(req: Request) {
  console.log("DELETE");
  const { id } = await req.json();
  todos = todos.filter((todo) => todo.id !== id);
  return Response.json(
    { message: "Todo deleted successfully" },
    { status: 200 }
  );
}

export async function PUT(req: Request) {
  console.log("PUT");
  const { id } = await req.json();
  const index = todos.findIndex((todo) => todo.id === id);
  if (index !== -1) {
    todos[index].done = !todos[index].done;
    return Response.json(
      { message: "Todo updated successfully" },
      { status: 200 }
    );
  } else {
    return Response.json({ error: "Todo not found" }, { status: 404 });
  }
}
