"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async score(ctx) {
    const { id } = ctx.params;
    let userAnswers = ctx.request.body;

    const quiz = await strapi.services.quiz.findOne({ id }, ["questions"]);

    let score = 0;

    if (quiz) {
      userAnswers = userAnswers.map((userAnsw) => {
        const question = quiz.questions.find(
          (qst) => qst.id === userAnsw.questionId
        );
        if (question) {
          if (question.answer === userAnsw.value) {
            userAnsw.correct = true;
            score += 1;
          } else {
            userAnsw.correct = false;
          }

          userAnsw.correctValue = question.answer;
        }

        return userAnsw;
      });
    }

    const questionCount = quiz.questions.length;

    delete quiz.questions;

    const data = await strapi.services.score.create({
      quiz,
      score,
      scoredAnswers: JSON.stringify(userAnswers),
      questionCount,
    });

    return {
      id: data.id,
      quiz,
      score,
      scoredAnswers: userAnswers,
      questionCount,
    };
  },
};
