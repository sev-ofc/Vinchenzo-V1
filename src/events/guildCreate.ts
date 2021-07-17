import { bot } from "../index";
import {GuildMastero} from "./ready";

bot.on('guildCreate', async(guild) => {
	await GuildMastero.generateConfig(guild.id);
	console.log(`[BOT] Joined Guild \"${guild.name}\" [${guild.id}] owned by ${guild.owner.user.tag} [${guild.ownerID}]`);
})