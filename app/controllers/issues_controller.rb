require 'open-uri'

class IssuesController < ApplicationController
  def create
    @magazine = Magazine.find(params[:magazine_id])
    @issue = @magazine.issues.new(issue_params.except(:cover_image_url))
  
    if params[:cover_image_url].present?
      downloaded_image = URI.open(params[:cover_image_url])
      @issue.cover_image.attach(io: downloaded_image, filename: "cover_image_#{Time.now.to_i}.jpg")
    end
  
    if @issue.save
      # Include the cover_image URL in the response
      render json: @issue.as_json.merge(cover_image_url: url_for(@issue.cover_image)), status: :created
    else
      render json: @issue.errors, status: :unprocessable_entity
    end
  end
  def update
    @issue = Issue.find(params[:id])
    if @issue.update(issue_params)
      render json: @issue
    else
      render json: @issue.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @issue = Issue.find(params[:id])

    if @issue.destroy
      render json: { message: 'Issue successfully deleted' }, status: :ok
    else
      render json: { error: 'Failed to delete issue' }, status: :unprocessable_entity
    end
  end

  private

  def issue_params
    params.require(:issue).permit(:title, :publication_date, :copies_sold, :number_of_pages, :cover_image_url)
  end
end
