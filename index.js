const { Client, GatewayIntentBits, SlashCommandBuilder } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const token = 'token';
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

const rest = new REST({ version: '9' }).setToken(token);
var fs = require('fs')

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName, options } = interaction;

  if (commandName === 'textchg') {
    const text = options.getString('text');
    console.log(`${text}`);
    fs.writeFile('text.txt', `${text}`, function nothingdnned(err) {if(err){throw err}});
    await interaction.reply(`User is not a nigger. Applying changes.`);
  }
});

client.login(token);

client.on('ready', () => {
  rest.put(Routes.applicationGuildCommands(client.application.id, 'guild-id'), { body: [{
    name: 'textchg',
    description: 'Prints out the text variable in the Node.js command line',
    options: [{
      name: 'text',
      description: 'The text variable to print in the command line',
      type: 3,
      required: true,
    },],
  }] })
    .then(() => console.log('Slash command registered'))
    .catch(console.error);
});
