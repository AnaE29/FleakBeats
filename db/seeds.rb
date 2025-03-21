require 'open-uri'
require 'json'

Track.destroy_all
Playlist.destroy_all
Show.destroy_all
Favorite.destroy_all


ids = [916224, 372058, 671, 808, 22, 11, 8587, 85, 118340, 424694]
# ids = [808, 22]

#Suzume 916224 DONE
#Your name 372058
#Harry Potter 671
#Shrek 808 DONE
#Peaky blinders 60574 (TV)
#Pirates des caraibes 22 DONE
#Stranger Things 66732 (TV) DONE
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
    tmdb_id: id,
    poster_url: "https://image.tmdb.org/t/p/original#{movie['poster_path']}",
    )
  puts "Création (Film): #{movie['title']}"
end

ids = [66732, 93405, 60574, 1399, 71446]
# ids = [93405, 22, 808]

ids.each do |id|
  serie = JSON.load(URI.open("https://tmdb.lewagon.com/tv/#{id}"))
  Show.create!(
    name: serie['name'],
    show_type: "tv",
    tmdb_id: id,
    poster_url: "https://image.tmdb.org/t/p/original#{serie['poster_path']}",
  )
  puts "Création (Serie): #{serie['name']}"
end
tracks = {
  22 => [
    {
      name: "davy_jones",
      artist: "Davy Jones"
    }, {
      name: "he_s_a_pirate",
      artist: "He's a pirate",
    }, {
      name: "hoist_the_colours",
      artist: "Hoist the colours",
    }, {
      name: "up_is_down",
      artist: "Up is down",
    }
  ],
  93405 => [
    {
      name: "mingle_game",
      artist: "Mingle Game"
    }, {
      name: "pink_soldiers",
      artist: "Pink Soldiers",
    }, {
      name: "the_blue_danube_waltz",
      artist: "The Blue Danube",
    }
  ],
  808 => [
    {
      name: "all_stars",
      artist: "All Stars"
    }, {
      name: "holding_out_for_a_hero",
      artist: "Holdin' Out for a Hero",
    }, {
      name: "im_a_believer",
      artist: "I'm a Believer",
    }, {
      name: "hallelujah",
      artist: "Hallelujah",
    }
  ],
  66732 => [
    {
      name: "africa",
      artist: "Africa",
    },
    {
      name: "ghostbusters",
      artist: "Ghostbusters",
    },
    {
      name: "running_up_that_hill",
      artist: "Running Up That Hill",
    },
    {
      name: "should_i_stay_or_should_i_go",
      artist: "Should I Stay or Should I Go",
    },
    {
      name: "time_after_time",
      artist: "Time After Time",
    }
  ],
  916224 => [
    {
      name: "kanata_haluka",
      artist: "Kanata Haluka",
    }, {
      name: "suzume_no_tojimari",
      artist: "Suzume no Tojimari",
    }, {
      name: "tamaki",
      artist: "Tamaki",
    }, {
      name: "tears_of_suzume",
      artist: "Tears of Suzume",
    }
  ]
}

tracks.each do |id, songs|
  show = Show.find_by(tmdb_id: id)
  playlist = Playlist.create!(name: show.name, show: show)
  songs.each do |song|
    Track.create!(
      playlist: playlist,
      name: "#{song[:name]}",
      artist: song[:artist],
      lofi: false,
      url: "#{id}/#{song[:name]}.mp3",
      cover_art_url: show.poster_url
    )
    Track.create!(
      playlist: playlist,
      name: "#{song[:name]}_lofi",
      artist: song[:artist],
      lofi: true,
      url: "#{id}/#{song[:name]}_lofi.mp3",
      cover_art_url: show.poster_url
    )
    puts "Création (Track): #{song[:name]}"
  end
end

User.create!(email: "test@test.com", password: "password")