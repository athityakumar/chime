json.user do
  json.partial! "api/users/user", user: @user
end

json.playlists @user.playlists do |playlist|
  json.partial! "api/playlists/playlist", playlist: playlist
end

json.tracks @user.tracks do |track|
  json.partial! "api/tracks/track", track: track
end
