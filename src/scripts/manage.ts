import readline from "readline";
import { createUser } from "@/lib/user";

function ask(question: string): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) =>
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.trim());
    })
  );
}

export default async function () {
  console.log("Create new user\n");

  const email = await ask("Email: ");
  const password = await ask("Password: ");
  const name = await ask("Name: ");

  const roles = ["admin", "editor", "viewer"];

  console.log("\nAvailable roles:");
  roles.forEach((r, i) => {
    console.log(`[${i + 1}] ${r}`);
  });

  const roleInput = await ask("\nSelect role number: ");
  const roleIndex = parseInt(roleInput, 10) - 1;
  const role = roles[roleIndex];

  if (!role) {
    console.error("Invalid role. Aborting.");
    process.exit(1);
  }

  console.log(`\nCreating user "${name}" (${email}) with role ${role}`);

  await createUser(email, password, name, role);

  console.log("\nUser created successfully.");
}
