# config/initializers/default_meta.rb
# Initialisation des meta tags par défaut

DEFAULT_META = YAML.load_file(Rails.root.join("config/meta.yml"))
