class JobsController < ApplicationController
  before_action :set_job, only: [:show, :update, :destroy]

  # GET /jobs
  def index
   @business = Business.find(params[:business_id])
   @jobs = @business.jobs
   render json: @jobs
  end

  # GET /jobs/1
  def show
    render json: @job
  end

  # POST /jobs
  def create
    @business = Business.find(params[:business_id])
    @job = @business.jobs.new(job_params)

    if @job.save
      render json: @job, status: :created, location: [@business, @job]
    else
      render json: @job.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /jobs/1
  def update
    if @job.update(job_params)
      render json: @job
    else
      render json: @job.errors, status: :unprocessable_entity
    end
  end

  # DELETE /jobs/1
  def destroy
    @job.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_job
      @business = Business.find(params[:business_id])
      @job = @business.jobs.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def job_params
      params.require(:job).permit(:title, :schedule_type, :posted_date, :requirements, :pay_range, :description, :how_to_apply, :business_id)
    end
end
