module.exports = {
    apps: [{
      name: "alex log bot",
      script: "bun",
      args: "run bot.ts",
      exec_mode: "fork",
      interpreter: "none", 
      env: {
        NODE_ENV: "production",
      }
    }]
  }