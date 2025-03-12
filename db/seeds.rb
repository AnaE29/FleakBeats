require 'open-uri'
require 'json'

ids = [916224, 372058, 671, 808, 22, 11, 8587, 85, 118340, 424694]

#Suzume 916224
#Your name 372058
#Harry Potter 671
#Shrek 808
#Peaky blinders 60574 (TV)
#Pirates des caraibes 22
#Stranger Things 66732 (TV)
#Attaques des titans (tokyo ghoul/demon slayer)
#Stars wars 11
#Squid game 93405 (TV)
#Roi lion 8587
#Indiana Jones 85
#Game of thrones 1399 (TV)
#Casa de papel 71446 (TV)
#Guardians of the Galaxy 118340
#Bohemian Rapsody 424694

ids.each do |id|
  movie = JSON.load(URI.open("https://tmdb.lewagon.com/movie/#{id}"))
  Show.create!(
    name: movie['title'],
    show_type: "movie",
    poster_url: "https://image.tmdb.org/t/p/original#{movie['poster_path']}",
    )
  puts "Création (Film): #{movie['title']}"
end

ids = [66732, 93405, 60574, 1399, 71446]


ids.each do |id|
  serie = JSON.load(URI.open("https://tmdb.lewagon.com/tv/#{id}"))
  Show.create!(
    name: serie['title'],
    show_type: "tv",
    poster_url: "https://image.tmdb.org/t/p/original#{serie['poster_path']}",
  )
  puts "Création (Serie): #{serie['name']}"
end

#TODO voir pour ajouter les musiques dans la seed