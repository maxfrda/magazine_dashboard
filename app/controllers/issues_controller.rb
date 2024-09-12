class IssuesController < ApplicationController
  def create
    @magazine = Magazine.find(params[:magazine_id])
    @issue = @magazine.issues.create(issue_params)
    if @issue.save
      render json: @issue, status: :created
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

  private

  def issue_params
    params.require(:issue).permit(:title, :publication_date, :subscribers_count, :number_of_pages, :cover_image_url)
  end
end
