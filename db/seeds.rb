require 'open-uri'
require 'json'

# ids = [916224, 372058, 671, 808, 22, 11, 8587, 85, 118340, 424694]
ids = [916224, 808, 22]

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

# ids = [66732, 93405, 60574, 1399, 71446]
ids = [66732, 93405]

ids.each do |id|
  serie = JSON.load(URI.open("https://tmdb.lewagon.com/tv/#{id}"))
  Show.create!(
    name: serie['title'],
    show_type: "tv",
    tmdb_id: id,
    poster_url: "https://image.tmdb.org/t/p/original#{serie['poster_path']}",
  )
  puts "Création (Serie): #{serie['name']}"
end
tracks = {
  22 => [
    {
      name: "Davy Jones",
      artist: "Hans Zimmer"
    }, {
      name: "He’s a Pirate",
      artist: "Hans Zimmer",
    }, {
      name: "Hoist the Colours",
      artist: "Hans Zimmer",
    }, {
      name: "Up Is Down",
      artist: "Hans Zimmer",
    }
  ],
  808 => [
    {
      name: "All Stars",
      artist: "Smash Mouth"
    }, {
      name: "Holding Out For A Hero",
      artist: "Smash Mouth",
    }, {
      name: "Im a Believer",
      artist: "Smash Mouth",
    }, {
      name: "Hallelujah",
      artist: "Rufus Wainwright",
    }
  ],
  66732 => [
    {
      name: "Ghostbusters",
      artist: "Ray Parker Jr."
    }, {
      name: "Running Up That Hill",
      artist: "Ray Parker Jr."
    }, {
      name: "Should I Stay or Should I Go",
      artist: "The Clash"
    }, {
      name: "Time After Time",
      artist: "Cyndi Lauper"
    }, {
      name: "Africa",
      artist: "Toto"
    }
  ],
  916224 => [
    {
      name: "Kanata Haluka",
      artist: "Kanata Haluka"
    }, {
      name: "Suzume no Tojimari",
      artist: "Suzume no Tojimari"
    }, {
      name: "Tamaki",
      artist: "Tamaki"
    }, {
      name: "Tears of Suzume",
      artist: "Tears of Suzume"
    }
  ],
  93405 => [
    {
      name: "Pink Soldiers",
      artist: "Pink Soldiers"
    }
  ]
}

tracks.each do |id, songs|
  show = Show.find_by(tmdb_id: id)
  playlist = Playlist.create!(name: show.name, show: show)
  songs.each do |song|
    Track.create!(
      playlist: playlist,
      name: "#{song[:name]} - Normal",
      artist: song[:artist],
      lofi: false,
      url: "#{id}/#{song[:name]} - Normal.mp3",
      cover_art_url: show.poster_url
    )
    Track.create!(
      playlist: playlist,
      name: "#{song[:name]} - Lofi",
      artist: song[:artist],
      lofi: true,
      url: "#{id}/#{song[:name]} - Lofi.mp3",
      cover_art_url: show.poster_url
    )
    puts "Création (Track): #{song[:name]}"
  end
end
