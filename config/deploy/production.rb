set :branch, 'master'
set :deploy_to, '/home/savory/apps/savory-node'
set :upstart_name, 'savory'
server '107.170.243.33', user: 'savory', roles: %w{app web}
