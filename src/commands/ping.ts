import { CommandInteraction, SlashCommandBuilder } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong!"),

  async execute(interaction: CommandInteraction) {
    if (interaction.member?.user.id === "1166796479302750330") {
      await interaction.reply("Cala boca, otário!");
    }

    await interaction.reply("Pong!");
  },
};
