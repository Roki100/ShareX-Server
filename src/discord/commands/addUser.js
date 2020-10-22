/*
    The command used to create a user
*/
const { MessageEmbed } = require('discord.js-light');

const { saveUser, getUserFromKey } = require('../../database/index');

let createKey = async () => {
    let string = Math.floor(Math.random() * (10 ** 18)).toString(36) +
        Math.floor(Math.random() * (10 ** 18)).toString(36) +
        Math.floor(Math.random() * (10 ** 18)).toString(36);
    let urlTest = await getUserFromKey(string);
    if (urlTest !== null) return await CreateUrl();
    return string;
};

let name = 'newuser';
let aliases = ['newu', 'nu'];
let permissions = 100;
let run = async (msg, args, owner) => {
    if (!owner) return msg.channel.send(new MessageEmbed()
        .setTitle(`You do not have the required permissions to run this command.`)
        .setColor('#e9172b'));

    if (!args[0]) return msg.channel.send(new MessageEmbed()
        .setTitle(`You must include the name of a new user.`)
        .setColor('#e9172b'));
    let uName = args[0];

    let userCheck = await getUserFromKey(args[0]);
    if (userCheck !== null) return msg.channel.send(new MessageEmbed()
        .setTitle(`User already exists.`)
        .setColor('#e9172b'));

    let key = (await createKey()).toString();
    await saveUser({
        key: key,
        name: uName,
        owner: false,
        uploads: 0,
        redirects: 0,
        discord: 'none',
        CreatedAt: new Date(),
        subdomain: "none",
        domain: "none",
    });

    return msg.channel.send(new MessageEmbed()
        .setTitle('Created User')
        .setThumbnail('https://cdn.discordapp.com/attachments/686689269296922682/755359943242154005/0HL9FFhngVZRSKZ.png')
        .setDescription(`**Name**: \`${uName}\`\n**Key**: \`${key}\``)
        .setColor('#1eda61'));
};

module.exports = { name, aliases, run, permissions };
