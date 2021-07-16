import {bot} from '../index';
import {GuildMastero} from '../events/ready';
import * as Discord from 'discord.js';

// Timer system that can be used for something actually helpful like timed mutes, but instead we are using it for a fucking meme :)
export class SusTimer {
    repeatMS: number;
    roleDurationMS: number;

    constructor(msToRepeat: number, roleDuartion: number){
        this.repeatMS = msToRepeat;
        this.roleDurationMS = roleDuartion;

        console.log(`[TIMERS] Sus timer set to check every ${Math.floor(this.repeatMS / 60000).toString()} minutes! (Role Duration: ${Math.floor(this.roleDurationMS / 60000).toString()} Minutes)`);
        this.check(roleDuartion);
        
        function loopCycle() {
            this.check(roleDuartion);
        }

        bot.setInterval(loopCycle, msToRepeat);
    }

    check(roleDurationMillS: number) {
        // console.log(`[TIMERS] Checking sus timer...`);
        let currentTimestamp = Date.now();
        bot.guilds.cache.forEach(async guild => {
            let config = await GuildMastero.getConfig(guild.id);
            for(let prop in config.sussyusers){
                console.log(`Checking prop ${prop} versus ${currentTimestamp} || Time Passed in MS: ${currentTimestamp - parseInt(prop)} || Duration MS: ${roleDurationMillS}`)
                /* Current Timestamp: 5000
                *  Timestamp Assigned to role: 4000
                *  5000 - 4000 = 1000 MS passed since
                */
                if(currentTimestamp - parseInt(prop) >= roleDurationMillS){
                    console.log("Gotta remove that role ig")
                    let memberToRemoveRole = await guild.members.fetch(config.sussyusers[prop])
                    try {
                        let susRole = guild.roles.cache.find(role => role.name.toLowerCase() == "sus");
                        if(!susRole) continue;
                        memberToRemoveRole.roles.remove(susRole)
                        if(memberToRemoveRole.nickname.length > 2) memberToRemoveRole.setNickname(memberToRemoveRole.user.username);
                        delete config.sussyusers[prop];
                        GuildMastero.updateConfig(guild.id, config);
                    }
                    catch (error){console.log(error);}
                    continue;
                }
            }
        })
    }
}