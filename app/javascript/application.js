// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails"
import "controllers"
import { Application } from "@hotwired/stimulus"
import ToggleMusicController from "./controllers/toggle_music_controller"
import DropdownController from "./controllers/dropdown_controller"
import DropdownSearchController from "./controllers/dropdown_search_controller"

const application = Application.start()
application.register("toggle-music", ToggleMusicController)
application.register("dropdown", DropdownController)
application.register("dropdown-search", DropdownSearchController);
