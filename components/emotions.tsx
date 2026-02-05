export type EmotionNode = {
  name: string;
  color: string;
  sub?: EmotionNode[];
};

export const emotions: EmotionNode[] = [
  { name: 'Fearful', color: 'rgb(193, 57, 135)', sub: [
    { name: 'Scared', color: 'rgb(155, 45, 110)', sub: [
      { name: 'Helpless', color: 'rgb(193, 57, 135)', sub: [] },
      { name: 'Frightened', color: 'rgb(193, 57, 135)', sub: [] },
    ] }, 
    { name: 'Anxious', color: 'rgb(155, 45, 110)', sub: [
      { name: 'Overwhelmed', color: 'rgb(193, 57, 135)', sub: [] },
      { name: 'Worried', color: 'rgb(193, 57, 135)', sub: [] },
    ] },
    { name: 'Insecure', color: 'rgb(155, 45, 110)', sub: [
      { name: 'Inadequate', color: 'rgb(193, 57, 135)', sub: [] },
      { name: 'Inferior', color: 'rgb(193, 57, 135)', sub: [] },
    ] }, 
    { name: 'Weak', color: 'rgb(155, 45, 110)', sub: [
      { name: 'Worthless', color: 'rgb(193, 57, 135)', sub: [] },
      { name: 'Insignificant', color: 'rgb(193, 57, 135)', sub: [] },
    ] }, 
    { name: 'Rejected', color: 'rgb(155, 45, 110)', sub: [
      { name: 'Excluded', color: 'rgb(193, 57, 135)', sub: [] },
      { name: 'Persecuted', color: 'rgb(193, 57, 135)', sub: [] },
    ] }, 
    { name: 'Threatened', color: 'rgb(155, 45, 110)', sub: [
      { name: 'Nervous', color: 'rgb(193, 57, 135)', sub: [] },
      { name: 'Exposed', color: 'rgb(193, 57, 135)', sub: [] },
    ] }, 
  ]},
  { name: 'Bad', color: 'rgb(76, 48, 118)', sub: [
    { name: 'Tired', color: 'rgb(63, 36, 95)', sub: [
      { name: 'Unfocused', color: 'rgb(76, 48, 118)', sub: [] },
      { name: 'Sleepy', color: 'rgb(76, 48, 118)', sub: [] },
    ] }, 
    { name: 'Stressed', color: 'rgb(63, 36, 95)', sub: [
      { name: 'Out of Control', color: 'rgb(76, 48, 118)', sub: [] },
      { name: 'Overwhelmed', color: 'rgb(76, 48, 118)', sub: [] },
    ] }, 
    { name: 'Busy', color: 'rgb(63, 36, 95)', sub: [
      { name: 'Rushed', color: 'rgb(76, 48, 118)', sub: [] },
      { name: 'Pressured', color: 'rgb(76, 48, 118)', sub: [] },
    ] }, 
    { name: 'Bored', color: 'rgb(63, 36, 95)', sub: [
      { name: 'Apathetic', color: 'rgb(76, 48, 118)', sub: [] },
      { name: 'Indifferent', color: 'rgb(76, 48, 118)', sub: [] },
    ] }, 
  ]},
  { name: 'Surprised', color: 'rgb(83, 115, 96)', sub: [
    { name: 'Excited', color: 'rgb(43, 79, 56)', sub: [
      { name: 'Energetic', color: 'rgb(83, 115, 96)', sub: [] },
      { name: 'Eager', color: 'rgb(83, 115, 96)', sub: [] },
    ] }, 
    { name: 'Amazed', color: 'rgb(43, 79, 56)', sub: [
      { name: 'Awe', color: 'rgb(83, 115, 96)', sub: [] },
      { name: 'Astonished', color: 'rgb(83, 115, 96)', sub: [] },
    ] },
    { name: 'Confused', color: 'rgb(43, 79, 56)', sub: [
      { name: 'Perplexed', color: 'rgb(83, 115, 96)', sub: [] },
      { name: 'Disillusioned', color: 'rgb(83, 115, 96)', sub: [] },
    ] },
    { name: 'Startled', color: 'rgb(43, 79, 56)', sub: [
      { name: 'Dismayed', color: 'rgb(83, 115, 96)', sub: [] },
      { name: 'Shocked', color: 'rgb(83, 115, 96)', sub: [] },
    ] },
  ]},
  { name: 'Happy', color: 'rgb(219, 138, 49)', sub: [
    { name: 'Playful', color: 'rgb(207, 105, 40)', sub: [
      { name: 'Mischevious', color: 'rgb(219, 138, 49)', sub: [] },
      { name: 'Aroused', color: 'rgb(219, 138, 49)', sub: [] },
    ] }, 
    { name: 'Content', color: 'rgb(207, 105, 40)', sub: [
      { name: 'Joyful', color: 'rgb(219, 138, 49)', sub: [] },
      { name: 'Free', color: 'rgb(219, 138, 49)', sub: [] },
    ]},
    { name: 'Interested', color: 'rgb(207, 105, 40)', sub: [
      { name: 'Inquisitive', color: 'rgb(219, 138, 49)', sub: [] },
      { name: 'Curious', color: 'rgb(219, 138, 49)', sub: [] },
    ] },
    { name: 'Proud', color: 'rgb(207, 105, 40)', sub: [
      { name: 'Confident', color: 'rgb(219, 138, 49)', sub: [] },
      { name: 'Successful', color: 'rgb(219, 138, 49)', sub: [] },
    ] },
    { name: 'Accepted', color: 'rgb(207, 105, 40)', sub: [
      { name: 'Valued', color: 'rgb(219, 138, 49)', sub: [] },
      { name: 'Respected', color: 'rgb(219, 138, 49)', sub: [] },
    ] },
    { name: 'Powerful', color: 'rgb(207, 105, 40)', sub: [
      { name: 'Creative', color: 'rgb(219, 138, 49)', sub: [] },
      { name: 'Courageous', color: 'rgb(219, 138, 49)', sub: [] },
    ] },
    { name: 'Peaceful', color: 'rgb(207, 105, 40)', sub: [
      { name: 'Thankful', color: 'rgb(219, 138, 49)', sub: [] },
      { name: 'Loving', color: 'rgb(219, 138, 49)', sub: [] },
    ] },
    { name: 'Trusting', color: 'rgb(207, 105, 40)', sub: [
      { name: 'Intimate', color: 'rgb(219, 138, 49)', sub: [] },
      { name: 'Sensitive', color: 'rgb(219, 138, 49)', sub: [] },
    ] },
    { name: 'Optimistic', color: 'rgb(207, 105, 40)', sub: [
      { name: 'Inspired', color: 'rgb(219, 138, 49)', sub: [] },
      { name: 'Hopeful', color: 'rgb(219, 138, 49)', sub: [] },
    ] },
  ] },
  { name: 'Sad', color: 'rgb(49, 43, 81)', sub: [
    { name: 'Hurt', color: 'rgb(33, 10, 65)', sub: [
      { name: 'Embarrassed', color: 'rgb(47, 41, 77)' }, 
      { name: 'Disappointed', color: 'rgb(47, 41, 77)' }, 
    ] }, 
    { name: 'Depressed', color: 'rgb(33, 10, 65)', sub: [
      { name: 'Inferior', color: 'rgb(47, 41, 77)' }, 
      { name: 'Empty', color: 'rgb(47, 41, 77)' }, 
    ] }, 
    { name: 'Guilty', color: 'rgb(33, 10, 65)', sub: [
      { name: 'Remorseful', color: 'rgb(47, 41, 77)' }, 
      { name: 'Ashamed', color: 'rgb(47, 41, 77)' }, 
    ] }, 
    { name: 'Despair', color: 'rgb(33, 10, 65)', sub: [
      { name: 'Powerless', color: 'rgb(47, 41, 77)' }, 
      { name: 'Grief', color: 'rgb(47, 41, 77)' }, 
    ] }, 
    { name: 'Vulnerable', color: 'rgb(33, 10, 65)', sub: [
      { name: 'Fragile', color: 'rgb(47, 41, 77)' }, 
      { name: 'Victimized', color: 'rgb(47, 41, 77)' }, 
    ] }, 
    { name: 'Lonely', color: 'rgb(33, 10, 65)', sub: [
      { name: 'Abandoned', color: 'rgb(47, 41, 77)' }, 
      { name: 'Isolated', color: 'rgb(47, 41, 77)' }, 
    ] }, 
  ] },
  { name: 'Disgusted', color: 'rgb(167, 96, 58)', sub: [
    { name: 'Disapproving', color: 'rgb(116, 63, 24)', sub: [
      { name: 'Judgemental', color: 'rgb(167, 96, 58)' }, 
      { name: 'Embarrassed', color: 'rgb(167, 96, 58)' }, 
    ] }, 
    { name: 'Disappointed', color: 'rgb(116, 63, 24)', sub: [
      { name: 'Appalled', color: 'rgb(167, 96, 58)' }, 
      { name: 'Revolted', color: 'rgb(167, 96, 58)' }, 
    ] }, 
    { name: 'Awful', color: 'rgb(116, 63, 24)', sub: [
      { name: 'Nauseated', color: 'rgb(167, 96, 58)' }, 
      { name: 'Detestable', color: 'rgb(167, 96, 58)' }, 
    ] }, 
    { name: 'Repelled', color: 'rgb(116, 63, 24)', sub: [
      { name: 'Horrified', color: 'rgb(167, 96, 58)' }, 
      { name: 'Hesitant', color: 'rgb(167, 96, 58)' }, 
    ] }, 
  ] },
  { name: 'Angry', color: 'rgb(190, 60, 65)', sub: [
    { name: 'Let Down', color: 'rgb(134, 38, 45)', sub: [
      { name: 'Betrayed', color: 'rgb(190, 60, 65)' }, 
      { name: 'Resentful', color: 'rgb(190, 60, 65)' }, 
    ] }, 
    { name: 'Humiliated', color: 'rgb(134, 38, 45)', sub: [
      { name: 'Disrespected', color: 'rgb(190, 60, 65)' }, 
      { name: 'Ridiculed', color: 'rgb(190, 60, 65)' }, 
    ] }, 
    { name: 'Bitter', color: 'rgb(134, 38, 45)', sub: [
      { name: 'Indignant', color: 'rgb(190, 60, 65)' }, 
      { name: 'Violated', color: 'rgb(190, 60, 65)' }, 
    ] }, 
    { name: 'Mad', color: 'rgb(134, 38, 45)', sub: [
      { name: 'Furious', color: 'rgb(190, 60, 65)' }, 
      { name: 'Jealous', color: 'rgb(190, 60, 65)' }, 
    ] }, 
    { name: 'Aggressive', color: 'rgb(134, 38, 45)', sub: [
      { name: 'Provoked', color: 'rgb(190, 60, 65)' }, 
      { name: 'Hostile', color: 'rgb(190, 60, 65)' }, 
    ] }, 
    { name: 'Frustrated', color: 'rgb(134, 38, 45)', sub: [
      { name: 'Infuriated', color: 'rgb(190, 60, 65)' }, 
      { name: 'Annoyed', color: 'rgb(190, 60, 65)' }, 
    ] }, 
    { name: 'Distant', color: 'rgb(134, 38, 45)', sub: [
      { name: 'Withdrawn', color: 'rgb(190, 60, 65)' }, 
      { name: 'Numb', color: 'rgb(190, 60, 65)' }, 
    ] }, 
    { name: 'Critical', color: 'rgb(134, 38, 45)', sub: [
      { name: 'Skeptical', color: 'rgb(190, 60, 65)' }, 
      { name: 'Dismissive', color: 'rgb(190, 60, 65)' }, 
    ] }, 
  ] },
];