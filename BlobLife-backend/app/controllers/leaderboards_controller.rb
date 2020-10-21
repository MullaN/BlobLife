class LeaderboardsController < ApplicationController

    def index
        leaderboards = Leaderboard.all
        render json: leaderboards
    end

    def create
        leaderboard = Leaderboard.create(date: params[:date])
        render json: leaderboard, include: [:scores]
    end

end
