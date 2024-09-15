require 'faker'
require 'open-uri'

Magazine.destroy_all
Issue.destroy_all

def create_magazine_with_issues(name, cover_image_urls)
  magazine = Magazine.create!(name: name)

  cover_image_urls.each do |url|
    io = URI.open(url)
    filename = File.basename(URI.parse(url).path)

    blob = ActiveStorage::Blob.create_and_upload!(
      io: io,
      filename: filename,
      content_type: io.content_type
    )

    Issue.create!(
      magazine: magazine,
      cover_image: blob,
      publication_date: Faker::Date.between(from: '2023-01-01', to: '2024-12-31'),
      copies_sold: Faker::Number.between(from: 1000, to: 5000),
      number_of_pages: Faker::Number.between(from: 30, to: 150)
    )
  end

  puts "Created magazine #{magazine.name} with #{magazine.issues.count} issues"
end

time_cover_image_urls = [
  'https://api.time.com/wp-content/uploads/2014/11/15503962-e1519162349439.jpg?quality=85&w=280',
  'https://api.time.com/wp-content/uploads/2016/09/time_20050704.jpg?quality=85&w=280',
  'https://api.time.com/wp-content/uploads/2015/05/final-pot-cover.jpg?quality=85&w=280',
  'https://api.time.com/wp-content/uploads/2014/11/15504245.jpg?quality=85&w=280',
  'https://api.time.com/wp-content/uploads/2014/11/15504256.jpg?quality=85&w=280',
  'https://api.time.com/wp-content/uploads/2014/11/15504259.jpg?quality=85&w=280'
]

sports_illustrated_cover_image_urls = [
  'https://render.fineartamerica.com/images/rendered/search/print/10.5/14/break/images/artworkimages/medium/2/switzerland-roger-federer-2009-french-open-june-15-2009-sports-illustrated-cover.jpg',
  'https://render.fineartamerica.com/images/rendered/search/print/10.5/14/break/images/artworkimages/medium/2/the-championships-wimbledon-2010-day-twelve-july-12-2010-sports-illustrated-cover.jpg',
  'https://render.fineartamerica.com/images/images-profile-flow/400/images/artworkimages/mediumlarge/2/usa-andre-agassi-1992-wimbledon-july-13-1992-sports-illustrated-cover.jpg',
  'https://render.fineartamerica.com/images/images-profile-flow/400/images/artworkimages/mediumlarge/2/usa-pete-sampras-1994-wimbledon-july-11-1994-sports-illustrated-cover.jpg',
  'https://render.fineartamerica.com/images/images-profile-flow/400/images/artworkimages/mediumlarge/2/germany-boris-becker-1989-us-open-september-18-1989-sports-illustrated-cover.jpg'
]

create_magazine_with_issues('Time', time_cover_image_urls)
create_magazine_with_issues('Sports Illustrated', sports_illustrated_cover_image_urls)
