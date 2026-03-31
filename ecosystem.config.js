module.exports = {
  apps: [
    {
      name: "moscasshop",
      cwd: "/var/www/shopeewindow",
      script: "./node_modules/next/dist/bin/next",
      args: "start",
      exec_mode: "cluster",
      instances: 4,
      env: {
        NODE_ENV: "production",
        PORT: 3000
      }
    }
  ]
}