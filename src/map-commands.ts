import path from "path";
import fs from "fs";
import { client } from ".";
import { REST, Routes } from "discord.js";
import { env } from "./utils/env";

export function mapCommands() {
  const foldersPath = path.join(__dirname, "commands");
  const commandFolders = fs.readdirSync(foldersPath);
  var commands: any[] = [];

  for (const file of commandFolders) {
    const filePath = path.join(foldersPath, file);
    const command = require(filePath).default;

    if ("data" in command && "execute" in command) {
      client.commands?.set(command.data.name, command);
      commands = [...commands, command.data.toJSON()];
    } else {
      console.log(
        `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
      );
    }
  }

  console.log("Commands have been mapped.");
  console.log(commands);

  const rest = new REST().setToken(env.DISCORD_TOKEN);

  // and deploy your commands!
  (async () => {
    try {
      console.log(
        `Started refreshing ${commands.length} application (/) commands.`
      );

      // The put method is used to fully refresh all commands in the guild with the current set
      const data: any = await rest.put(
        Routes.applicationCommands(env.DISCORD_CLIENT_ID),
        { body: commands }
      );

      console.log(
        `Successfully reloaded ${data.length} application (/) commands.`
      );
    } catch (error) {
      // And of course, make sure you catch and log any errors!
      console.error(error);
    }
  })();
}
