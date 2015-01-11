# config valid only for current version of Capistrano
lock '3.3.5'

set :application, 'savory'
set :branch, :master
set :repo_url, 'git@github.com:javaporter/savory.git'
set :keep_releases, 2

namespace :deploy do

  after :restart, :clear_cache do
    on roles(:web), in: :groups, limit: 3, wait: 10 do
      # Here we can do anything such as:
      # within release_path do
      #   execute :rake, 'cache:clear'
      # end
    end
  end

end
