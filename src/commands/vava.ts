import { CommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";

import { API } from "vandal.js";

export default {
  data: new SlashCommandBuilder()
    .setName("vava")
    .addStringOption((option) => option.setName("tag").setDescription("Your Valorant tag").setRequired(true))
    .setDescription("Login in Valorant and get your match history"),

  async execute(interaction: any) {
    try {
      const userTag = interaction.options.getString("tag").replaceAll(" ", "_").split("#");

      const user = await API.fetchUser(userTag[0], userTag[1]);

      console.log(user.ranked());

      const embed = new EmbedBuilder()
        .setTitle(user.info().name)
        .setThumbnail(user.info().avatar)
        .addFields([
          {
            name: "Kills",
            value: user.ranked().kills?.toString() ?? "",
            inline: true,
          },
          {
            name: "Rounds Won",
            value: user.ranked().roundsWon?.toString() ?? "",
            inline: true,
          },
          {
            name: "Rounds Lost",
            value: user.ranked().roundsLost?.toString() ?? "",
            inline: true,
          },
        ])
        .addFields([
          {
            name: "Matches Played",
            value: user.ranked().matchesPlayed?.toString() ?? "",
            inline: true,
          },
          {
            name: "Matches Won",
            value: user.ranked().matchesWon?.toString() ?? "",
            inline: true,
          },
          {
            name: "Matches Lost",
            value: user.ranked().matchesLost?.toString() ?? "",
            inline: false,
          },
        ])
        .addFields([
          {
            name: "Deaths",
            value: user.ranked().deaths?.toString() ?? "",
            inline: true,
          },
          {
            name: "Headshots",
            value: user.ranked().headshots?.toString() ?? "",
            inline: true,
          },
          {
            name: "Received Headshots",
            value: user.ranked().receivedHeadshots?.toString() ?? "",
            inline: true,
          },
        ])
        .addFields([
          {
            name: "Clutches",
            value: user.ranked().clutches?.toString() ?? "",
            inline: true,
          },
          {
            name: "Aces",
            value: user.ranked().aces?.toString() ?? "",
            inline: true,
          },
          {
            name: "5K",
            value: user.ranked().kills5K?.toString() ?? "",
            inline: true,
          },
        ])
        .addFields([
          {
            name: "KD",
            value: user.ranked().kDRatio?.toString() ?? "",
            inline: true,
          },
        ]);

      await interaction.reply({ embeds: [embed] });
    } catch (e) {
      console.log(e);
      await interaction.reply(e);
    }
  },
};
