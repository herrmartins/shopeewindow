module.exports = {
  apps: [
    {
      name: "moscasshop",
      cwd: "/var/www/shopeewindow",
      script: "npm",
      args: "start",
      exec_mode: "cluster",
      instances: 4,
      env: {
        NODE_ENV: "production"
      }
    }
  ]
}