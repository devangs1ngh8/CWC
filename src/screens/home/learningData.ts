// learningData.ts

import { ImageSourcePropType } from 'react-native';
import { image } from '../../assets';

export type LearningItem = {
  id: string;
  title: string;
  description: string;
  image: ImageSourcePropType;
  videoUrl?: string;
};

export const learningData: LearningItem[] = [
  {
    id: '1',
    title: 'Cycle Basics',
    description: 'What is Basal Body Temperature and Why Track It?',
    image: image.cycleBasics,
    videoUrl: 'https://www.youtube.com/watch?v=034wCMLjaDM',
  },
  {
    id: '2',
    title: 'NFP Methods & Faith Context',
    description: 'Catholic Teaching on Fertility & Family Planning',
    image: image.nfpMethods,
    videoUrl: 'https://www.youtube.com/watch?v=034wCMLjaDM',
  },
  {
    id: '3',
    title: 'Cycle Basics',
    description: 'What is Basal Body Temperature and Why Track It?',
    image: image.cycleBasics2,
    videoUrl: 'https://www.youtube.com/watch?v=034wCMLjaDM',
  },
  {
    id: '4',
    title: 'Practical Guidance for Couples',
    description:
      "In this video, we'll cover 10 essential care tips for couples.",
    image: image.practicalGuidance,
    videoUrl: 'https://www.youtube.com/watch?v=034wCMLjaDM',
  },
  {
    id: '5',
    title: 'Cycle Basics',
    description:
      'Learn how temperature tracking can help you understand your cycle.',
    image: image.cycleBasics2,
    videoUrl: 'https://www.youtube.com/watch?v=034wCMLjaDM',
  },
  {
    id: '6',
    title: 'Practical Guidance for Couples',
    description:
      'Build healthy habits and communicate confidently with your partner.',
    image: image.practicalGuidance,
    videoUrl: 'https://www.youtube.com/watch?v=034wCMLjaDM',
  },
  {
    id: '7',
    title: 'Understanding Your Cycle',
    description: 'Discover the different phases of the menstrual cycle.',
    image: image.cycleBasics,
    videoUrl: 'https://www.youtube.com/watch?v=034wCMLjaDM',
  },
  {
    id: '8',
    title: 'Fertility Awareness',
    description: 'Understand fertility signs and how to observe them.',
    image: image.nfpMethods,
    videoUrl: 'https://www.youtube.com/watch?v=034wCMLjaDM',
  },
  {
    id: '9',
    title: 'Tracking Your Period',
    description: 'Learn how consistent cycle logging helps reveal patterns.',
    image: image.cycleBasics,
    videoUrl: 'https://www.youtube.com/watch?v=034wCMLjaDM',
  },
  {
    id: '10',
    title: 'Cervical Fluid Basics',
    description: 'Learn about cervical fluid changes throughout your cycle.',
    image: image.cycleBasics2,
    videoUrl: 'https://www.youtube.com/watch?v=034wCMLjaDM',
  },
  {
    id: '11',
    title: 'Healthy Daily Habits',
    description:
      'Explore how sleep, stress and routines can affect your cycle.',
    image: image.practicalGuidance,
    videoUrl: 'https://www.youtube.com/watch?v=034wCMLjaDM',
  },
  {
    id: '12',
    title: 'Preparing for Parenthood',
    description: 'Start conversations about fertility and family planning.',
    image: image.nfpMethods,
    videoUrl: 'https://www.youtube.com/watch?v=034wCMLjaDM',
  },
  {
    id: '13',
    title: 'NFP: Getting Started',
    description:
      'Explore natural family planning and the basics of cycle awareness.',
    image: image.cycleBasics,
    videoUrl: 'https://www.youtube.com/watch?v=034wCMLjaDM',
  },
];
