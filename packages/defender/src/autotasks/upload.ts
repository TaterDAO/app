import path from "path";
import client from "./client";

(async () => {
  const args = process.argv.slice(2);
  const taskName = args[0];

  if (!Boolean(taskName)) throw new Error("Task Name argument required");

  // Load tasks and get id of task name
  const tasks = await client.list();

  let taskId: string = "";
  for (const task of tasks.items) {
    if (taskName === task.name) taskId = task.autotaskId;
  }

  if (!Boolean(taskId)) throw new Error(`Task "${taskName}" not found`);

  console.log("Uploading");
  await client.updateCodeFromFolder(
    taskId,
    path.resolve("dist/autotasks", taskName)
  );

  console.log(`${taskName} src updated`);
})();
