require 'faker'
require 'open-uri'

# Delete existing records
Magazine.destroy_all
Issue.destroy_all

magazine = Magazine.create!(
  name: 'Time'
)

# Define the list of cover image URLs
cover_image_urls = [
  'https://api.time.com/wp-content/uploads/2014/11/15503962-e1519162349439.jpg?quality=85&w=280',
  # 'https://api.time.com/wp-content/uploads/2014/11/15503982-e1461961171470.jpg?quality=85&w=280',
  # 'https://api.time.com/wp-content/uploads/2014/11/15503969.jpg?quality=85&w=280',
  'https://api.time.com/wp-content/uploads/2016/09/time_20050704.jpg?quality=85&w=280',
  'https://api.time.com/wp-content/uploads/2015/05/final-pot-cover.jpg?quality=85&w=280',
  'https://api.time.com/wp-content/uploads/2014/11/15504245.jpg?quality=85&w=280',
  'https://api.time.com/wp-content/uploads/2014/11/15504256.jpg?quality=85&w=280',
  'https://api.time.com/wp-content/uploads/2014/11/15504259.jpg?quality=85&w=280'
]

# Create 8 magazine issues with placeholder data
cover_image_urls.each_with_index do |url, index|
  # Download the image
  io = URI.open(url)
  filename = File.basename(URI.parse(url).path)

  # Create an Active Storage blob from the downloaded image
  blob = ActiveStorage::Blob.create_and_upload!(
    io: io,
    filename: filename,
    content_type: io.content_type
  )

  # Create issue with attached image
  issue = Issue.create!(
    magazine: magazine,
    cover_image: blob,
    publication_date: Faker::Date.between(from: '2023-01-01', to: '2024-12-31'),
    subscribers_count: Faker::Number.between(from: 1000, to: 5000),
    number_of_pages: Faker::Number.between(from: 30, to: 150)
  )

  puts "Created issue #{issue.id}"
end

magazine = Magazine.create!(
  name: 'Sports Illustrated'
)

cover_image_urls = [
  'https://render.fineartamerica.com/images/rendered/search/print/10.5/14/break/images/artworkimages/medium/2/switzerland-roger-federer-2009-french-open-june-15-2009-sports-illustrated-cover.jpg',
  'https://render.fineartamerica.com/images/rendered/search/print/10.5/14/break/images/artworkimages/medium/2/the-championships-wimbledon-2010-day-twelve-july-12-2010-sports-illustrated-cover.jpg',
  'https://render.fineartamerica.com/images/images-profile-flow/400/images/artworkimages/mediumlarge/2/usa-andre-agassi-1992-wimbledon-july-13-1992-sports-illustrated-cover.jpg',
  'https://render.fineartamerica.com/images/images-profile-flow/400/images/artworkimages/mediumlarge/2/usa-pete-sampras-1994-wimbledon-july-11-1994-sports-illustrated-cover.jpg',
  'https://render.fineartamerica.com/images/images-profile-flow/400/images/artworkimages/mediumlarge/2/germany-boris-becker-1989-us-open-september-18-1989-sports-illustrated-cover.jpg',

]

# Create 8 magazine issues with placeholder data
cover_image_urls.each_with_index do |url, index|
  # Download the image
  io = URI.open(url)
  filename = File.basename(URI.parse(url).path)

  # Create an Active Storage blob from the downloaded image
  blob = ActiveStorage::Blob.create_and_upload!(
    io: io,
    filename: filename,
    content_type: io.content_type
  )

  # Create issue with attached image
  issue = Issue.create!(
    magazine: magazine,
    cover_image: blob,
    publication_date: Faker::Date.between(from: '2023-01-01', to: '2024-12-31'),
    subscribers_count: Faker::Number.between(from: 1000, to: 5000),
    number_of_pages: Faker::Number.between(from: 30, to: 150)
  )

  puts "Created issue #{issue.id}"
end