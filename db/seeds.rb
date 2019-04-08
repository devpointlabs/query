User.create(name: "Teacher User", email: "teacher@user.com", password: "password", teacher: true)
User.create(name: "Student User", email: "student@user.com", password: "password", teacher: false)



counter = 1
3.times do
  quiz = Quiz.create(name: "Week 1, Day #{counter}")
  q1 = Question.create(quiz_id: quiz.id, name: Faker::Quote.matz , qType: "TorF", explanation: Faker::Quote.most_interesting_man_in_the_world)
    Choice.create(answer: "True", correct_answer: true, question_id: q1.id)
    Choice.create(answer: "False", correct_answer: false, question_id: q1.id)
  q2 = Question.create(quiz_id: quiz.id, name: Faker::Quote.matz , qType: "MC", explanation: Faker::TvShows::MichaelScott.quote)
    Choice.create(question_id: q2.id, answer: Faker::ProgrammingLanguage.name, correct_answer: [true, false, false, false].sample)
    Choice.create(question_id: q2.id, answer: Faker::ProgrammingLanguage.name, correct_answer: [true, false, false, false].sample)
    Choice.create(question_id: q2.id, answer: Faker::ProgrammingLanguage.name, correct_answer: [true, false, false, false].sample)
    Choice.create(question_id: q2.id, answer: Faker::ProgrammingLanguage.name, correct_answer: [true, false, false, false].sample)
  Question.create(quiz_id: quiz.id, name: Faker::Quote.matz, qType: "open", explanation: Faker::Quote.yoda )
  counter += 1
end
puts "created three quizzes, with three questions each"
