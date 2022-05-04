import BugImage from '../assets/bug.svg';
import IdeaImage from '../assets/idea.svg';
import ThoughtImage from '../assets/thought.svg';

export const feedbackTypes = Object.seal({
  BUG: {
    title: 'Problema',
    placeholderText:
      'Algo não está funcionando bem? Queremos corrigir. Conte com detalhes o que está acontecendo...',
    image: {
      source: BugImage,
      alt: 'Imagem de um inseto',
    },
  },
  IDEA: {
    title: 'Ideia',
    placeholderText:
      'Teve uma ideia de melhoria ou de nova funcionalidade? Conta pra gente!',
    image: {
      source: IdeaImage,
      alt: 'Imagem de uma lampada',
    },
  },
  OTHER: {
    title: 'Outro',
    placeholderText: 'Queremos te ouvir. O que você gostaria de nos dizer?',
    image: {
      source: ThoughtImage,
      alt: 'Imagem de um balão de pensamento',
    },
  },
});

export type FeedbackKey = keyof typeof feedbackTypes;
