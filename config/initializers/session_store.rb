# Be sure to restart your server when you modify this file.

# Your secret key for verifying cookie session data integrity.
# If you change this key, all old sessions will become invalid!
# Make sure the secret is at least 30 characters and all random, 
# no regular words or you'll be exposed to dictionary attacks.
ActionController::Base.session = {
  :key         => '_kratos_session',
  :secret      => '7bfba4acf2343cea9b616199323099bf344b82c4cb0727aa164d57f67420d48358219b2cc798f995ebc4ec45926424f8f9c3f14840049acf4258ec42d838e562'
}

# Use the database for sessions instead of the cookie-based default,
# which shouldn't be used to store highly confidential information
# (create the session table with "rake db:sessions:create")
# ActionController::Base.session_store = :active_record_store
