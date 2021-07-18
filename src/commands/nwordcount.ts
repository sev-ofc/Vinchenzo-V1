import { Player } from "discord-player";
import { Message } from "discord.js";
import {bot, MusicPlayer} from '../index';

export let commandProps = {
	'name': 'nwordcount',
	'usage': '[prefix]nwordcount @person',
	'aliases': ['nwords']
}

function between(min, max) {  
    return Math.floor(
      Math.random() * (max - min) + min
    )
  }

  // Meme command - not serious. It actually is a random number
export async function cmd(message: Message, args: string[]){
    if(!args[0]) return message.reply(":x: You must specify who to check the count of!");
    if(message.guild.members.cache.find(member => member.user.username.toLowerCase() == args[0].toLowerCase() || member.user.id == args[0].toLowerCase()) || message.mentions.users.size > 0){
        let member = await bot.users.cache.find(member => member.username.toLowerCase() == args[0].toLowerCase() || member.id == args[0].toLowerCase()) || message.mentions.users.first();
        if(!message.guild.members.cache.has(member.id)) message.reply(":x: You must specify a user in this server!");
        return message.reply(`:white_check_mark: User **${member.username}** has said the N-word **${between(0, 1060327)}** times!`)
    }
    else return message.reply(":x: You must specify who to check the count of!");   
}