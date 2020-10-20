# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
User.delete_all
Leaderboard.delete_all
Score.delete_all


u1 = User.create(name: "Jackson")
u2 = User.create(name:"Andrew")

l1 = Leaderboard.create

s1 =Score.create(time: ".01 seconds", user_id: u1.id, leaderboard_id: l1.id)
s2 =Score.create(time: "3 hours 1 second", user_id: u2.id, leaderboard_id: l1.id)