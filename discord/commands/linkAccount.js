const { MessageEmbed } = require('discord.js-light');

const userModel = require('../../models/user');

let name = 'linkaccount';
let aliases = ['la', 'linkacc', 'laccount'];
let run = async (msg, args, owner) => {
    let userCheck = await userModel.findOne({ discord: msg.author.id });
    if (userCheck !== null) return msg.channel.send(new MessageEmbed()
        .setTitle('You already have an account linked.')
        .setColor('#e9172b'));

    if (!args[0]) return msg.channel.send(new MessageEmbed()
        .setTitle(`You must include a key.`)
        .setColor('#e9172b'));

    let uKey = args[0];

    let userData = await userModel.findOne({ key: uKey });

    if (userData == null) return msg.channel.send(new MessageEmbed()
        .setTitle('User does not exist.')
        .setColor('#e9172b'));

    await userModel.findOneAndUpdate({ key: uKey }, { discord: msg.author.id });

    msg.delete().catch();

    return msg.channel.send(new MessageEmbed()
        .setTitle('User Updated.')
        .setDescription(`**User**: \`${userData.name}\`\n**Discord ID**: \`${msg.author.id}\`\n`)
        .setColor('#e9172b'));
};

module.exports = { name, aliases, run };