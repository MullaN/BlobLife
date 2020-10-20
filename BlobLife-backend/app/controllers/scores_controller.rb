class ScoresController < ApplicationController
    def index
        scores = Score.all
        render json: scores
    end

    def create
        score = Score.create(time: params[:time], user_id: params[:user_id], leaderboard_id: params[:leaderboard_id])
        render json: score
    end
end
# (name: params[:name])
