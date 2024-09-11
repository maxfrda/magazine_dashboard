class IssuesController < ApplicationController
  before_action :set_issue, only: [:update, :destroy]

  def index
    @issues = Issue.all
    render json: @issues.map { |issue|
      issue.as_json.merge({
        cover_image_url: issue.cover_image.attached? ? url_for(issue.cover_image) : nil
      })
    }
  end

  def create
    @issue = Issue.new(issue_params)
    if @issue.save
      render json: @issue, status: :created
    else
      render json: @issue.errors, status: :unprocessable_entity
    end
  end

  def update
    if @issue.update(issue_params)
      render json: @issue
    else
      render json: @issue.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @issue.destroy
    head :no_content
  end

  private

  def set_issue
    @issue = Issue.find(params[:id])
  end

  def issue_params
    params.require(:issue).permit(:cover_image_url, :publication_date, :subscribers_count, :number_of_pages)
  end
end