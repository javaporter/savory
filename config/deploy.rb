# config valid only for current version of Capistrano
lock '3.3.5'

set :application, 'savory'
set :branch, ENV['BRANCH'] || 'master'
set :repo_url, 'savory-github:javaporter/savory.git'
set :keep_releases, 2

set :linked_dirs, %w{node_modules}

namespace :deploy do
  after :restart, :clear_cache do
    on roles(:web), in: :groups, limit: 3, wait: 10 do
      execute :sudo, :service, :savory, :restart
    end
  end
end
