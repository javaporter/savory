# config valid only for current version of Capistrano
lock '3.4.0'

set :application, 'savory'
set :repo_url, 'https://github.com/savoryinstitute/savory.git'
set :keep_releases, 2

set :linked_dirs, %w{node_modules}

namespace :deploy do
  task :restart do
    on roles(:web), in: :groups, limit: 3, wait: 10 do
      execute :sudo, :service, fetch(:upstart_name), :restart
    end
  end
  after :publishing, :restart
end
