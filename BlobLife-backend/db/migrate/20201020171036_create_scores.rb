class CreateScores < ActiveRecord::Migration[6.0]
  def change
    create_table :scores do |t|
      t.string :time
      t.references :user, null: false, foreign_key: true
      t.references :leaderboard, null: false, foreign_key: true

      t.timestamps
    end
  end
end
