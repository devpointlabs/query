teacher = User.create(name: "Teacher User", email: "teacher@user.com", password: "password", teacher: true)
student = User.create(name: "Student User", email: "student@user.com", password: "password", teacher: false)



counter = 1
3.times do
  quiz = Quiz.create(name: "Week 1, Day #{counter}")
  q1 = Question.create(quiz_id: quiz.id, name: Faker::Quote.matz , qType: "TorF", explanation: Faker::Quote.most_interesting_man_in_the_world)
    c1 = Choice.create(answer: "True", correct_answer: true, question_id: q1.id)
    c2 = Choice.create(answer: "False", correct_answer: false, question_id: q1.id)
  q2 = Question.create(quiz_id: quiz.id, name: Faker::Quote.matz , qType: "MC", explanation: Faker::TvShows::MichaelScott.quote)
    c3 = Choice.create(question_id: q2.id, answer: Faker::ProgrammingLanguage.name, correct_answer: [true, false, false, false].sample)
    c4 = Choice.create(question_id: q2.id, answer: Faker::ProgrammingLanguage.name, correct_answer: [true, false, false, false].sample)
    c5 = Choice.create(question_id: q2.id, answer: Faker::ProgrammingLanguage.name, correct_answer: [true, false, false, false].sample)
    c6 = Choice.create(question_id: q2.id, answer: Faker::ProgrammingLanguage.name, correct_answer: [true, false, false, false].sample)
  Question.create(quiz_id: quiz.id, name: Faker::Quote.matz, qType: "open", explanation: Faker::Quote.yoda)
  s1 = Submission.create( quiz_id: quiz.id, user_id: student.id, going: false )
  s1.submission_choices.create( choice_id: [c1.id, c2.id].sample)
  s1.submission_choices.create( choice_id: [c3.id, c4.id, c5.id, c6.id].sample)
  counter += 1
end


puts "created three quizzes, with three questions each"
