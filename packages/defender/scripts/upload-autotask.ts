import path from "path";
import client from "../src/services/autotask";

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
  const dirPath = path.resolve("dist/autotasks", taskName);

  console.log(dirPath);

  try {
    await client.updateCodeFromFolder(taskId, dirPath);

    console.log(`${taskName} src updated`);
  } catch (error) {
    console.error(error);
  }
})();
