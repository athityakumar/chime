json.extract! track, :id, :title, :slug, :track_url, :description

json.img_hero      track.img_hero
json.img_thumb     track.img_thumb
json.img_square    track.img_square

json.user do
  json.extract! track.user, :id, :username
end
