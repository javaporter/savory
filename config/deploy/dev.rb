set :branch, ENV['BRANCH'] || 'dev'
set :deploy_to, '/home/savory/apps/savory-dev'
set :upstart_name, 'savory-dev'
server '107.170.243.33', user: 'savory', roles: %w{app web}
