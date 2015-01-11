set :deploy_to, '/home/savory/apps/savory-node'
server '107.170.243.33', user: 'savory', roles: %w{app}
