// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails"
import "controllers"
import { Application } from "@hotwired/stimulus"
import DropdownController from "./controllers/dropdown_controller"
import DropdownSearchController from "./controllers/dropdown_search_controller"

const application = Application.start()
application.register("dropdown", DropdownController)
application.register("dropdown-search", DropdownSearchController);
