const { MessageButton, MessageActionRow } = require("discord.js");
const Tetris = require("../../Object/Tetris");

module.exports = {
  name: "테트리스",
  execute: async ({ bot, msg }) => {
    if (bot._tetris.has(msg.channel.id)) {
      msg.reply("이미 이 채널에서 게임이 실행 중입니다.");
      return;
    }
    const leftButton = new MessageButton()
      .setCustomID("TETRIS|LEFT")
      .setStyle("PRIMARY")
      .setLabel("⬅️");
    const rotateButton = new MessageButton()
      .setCustomID("TETRIS|ROTATE")
      .setStyle("SECONDARY")
      .setLabel("🌀");
    const rightButton = new MessageButton()
      .setCustomID("TETRIS|RIGHT")
      .setStyle("PRIMARY")
      .setLabel("➡️");
    const downButton = new MessageButton()
      .setCustomID("TETRIS|DOWN")
      .setStyle("DANGER")
      .setLabel("⬇️");
    const actionRow = new MessageActionRow({
      components: [leftButton, rotateButton, rightButton, downButton],
    });
    const playMessage = await msg.channel.send({
      content: "게임 인스턴스 생성 중입니다..",
      components: [actionRow],
    });
    const playInstance = new Tetris(18, 11);
    playInstance.startWithDiscord(playMessage);
    bot._tetris.set(msg.channel.id, playInstance);
  },
};