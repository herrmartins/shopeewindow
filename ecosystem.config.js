module.exports = {
  apps: [
    {
      name: "moscasshop",
      cwd: "/var/www/shopeewindow",
      script: "./dist/server/entry.mjs",
      exec_mode: "cluster",
      instances: 4,
      env: {
        NODE_ENV: "production",
        PORT: 3000
      }
    }
  ]
}