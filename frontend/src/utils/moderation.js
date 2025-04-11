import leoProfanity from 'leo-profanity';

leoProfanity.add(leoProfanity.getDictionary('ru'));
leoProfanity.add(leoProfanity.getDictionary('en'));

export const clean = (text) => leoProfanity.clean(text);
export const hasProfanity = (text) => leoProfanity.check(text);
