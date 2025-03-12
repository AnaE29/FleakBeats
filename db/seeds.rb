require 'open-uri'
require 'json'

movies = JSON.load(URI.open("https://tmdb.lewagon.com/movie/top_rated"))['results']
movies.each do |movie|
  Show.create!(
    name: movie['title'],
    poster_url: "https://image.tmdb.org/t/p/original#{movie['poster_path']}",
  )
  puts "Création (Film): #{movie['title']}"
end

series = JSON.load(URI.open("https://tmdb.lewagon.com/tv/top_rated"))['results']
series.each do |serie|
  Show.create!(
    name: serie['title'],
    poster_url: "https://image.tmdb.org/t/p/original#{serie['poster_path']}",
  )
  puts "Création (Serie): #{serie['name']}"
end


#TODO voir pour ajouter les musiques dans la seed