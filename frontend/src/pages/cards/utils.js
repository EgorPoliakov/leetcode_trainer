export function computeCardImportance(card) {
    const question = card.question;
    const likesRatio = question.likes / (question.likes + question.dislikes);
    const acceptanceRate = question.accepted_submissions / question.total_submissions;
    const difficultyWeight = 3;
    const likesWeight = 3;
    const acceptanceWeight = 2;
    return difficultyWeight * (2 - question.difficulty) + likesWeight * likesRatio + acceptanceWeight * acceptanceRate;
}
