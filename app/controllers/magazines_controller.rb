class MagazinesController < ApplicationController
  def index
    @magazines = Magazine.includes(:issues).all

    # Map the magazines and their issues, adding cover_image_url to each issue
    render json: @magazines.map { |magazine|
      magazine.as_json(include: {
        issues: {
          only: [:id, :title, :publication_date, :copies_sold, :number_of_pages]
        }
      }).merge({
        issues: magazine.issues.map { |issue|
          issue.as_json.merge({
            cover_image_url: issue.cover_image.attached? ? url_for(issue.cover_image) : nil
          })
        }
      })
    }
  end
end