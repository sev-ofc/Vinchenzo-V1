// JOKE COMMAND - IT GENERATES A RANDOM NUMBER. NO REAL RACISM INTENDED HERE!
import { Player } from "discord-player";
import { Message } from "discord.js";
import {bot, MusicPlayer} from '../index';

export let commandProps = {
	'name': 'nwordcount',
	'usage': '[prefix]nwordcount @person',
	'aliases': ['nwords']
}

// Blatant code stolen from:
// https://futurestud.io/tutorials/generate-a-random-number-in-range-with-javascript-node-js
function between(min, max) {  
    return Math.floor(
      Math.random() * (max - min) + min
    )
  }

// Blatant code stolen from:
// https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export async function cmd(message: Message, args: string[]){
    if(!args[0]) return message.reply(":x: You must specify who to check the count of!");
    if(message.guild.members.cache.find(member => member.user.username.toLowerCase() == args[0].toLowerCase() || member.user.id == args[0].toLowerCase()) || message.mentions.users.size > 0){
        let member = await bot.users.cache.find(member => member.username.toLowerCase() == args[0].toLowerCase() || member.id == args[0].toLowerCase()) || message.mentions.users.first();
        if(!message.guild.members.cache.has(member.id)) message.reply(":x: You must specify a user in this server!");
        return message.reply(`:white_check_mark: User **${member.username}** has said the N-word **${numberWithCommas(between(0, 100060327))}** times!`)
    }
    else return message.reply(":x: You must specify who to check the count of!");   
}