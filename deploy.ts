import {$} from "bun";

try {
    await $`git fetch origin master`;
    await $`git reset --hard origin/master`;
    await $`git clean -fd`;

    await $`bun install`;
    await $`pm2 restart ecosystem.config.cjs --update-env`;

    const time = new Date().toLocaleTimeString();
    console.log(`Deploy Sucessful:: ${time}`)
} 
catch (error) {
    console.log("error in deployment.")
}