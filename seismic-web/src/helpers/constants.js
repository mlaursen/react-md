import { nameGenerator } from './nameGenerator';
import { randomAvatarGenerator } from './avatarGenerator';
import { v4 as uuidv4 } from 'uuid';

const MAX_CHAT_CAR_COUNT = 100;

const AVATARS = [
  'https://firebasestorage.googleapis.com/v0/b/seismic-labs.appspot.com/o/avatars%2F1.png?alt=media&token=832c587b-0a9f-4965-a3ba-eef112e7147f',
  'https://firebasestorage.googleapis.com/v0/b/seismic-labs.appspot.com/o/avatars%2F2.png?alt=media&token=af683875-4b87-4f6e-b5ba-98bedeb24ccf',
  'https://firebasestorage.googleapis.com/v0/b/seismic-labs.appspot.com/o/avatars%2F3.png?alt=media&token=51fad0e1-d197-4288-841e-0389cf65b374',
  'https://firebasestorage.googleapis.com/v0/b/seismic-labs.appspot.com/o/avatars%2F4.png?alt=media&token=f3285d06-1895-42c4-88ae-20c1458975f6',
  'https://firebasestorage.googleapis.com/v0/b/seismic-labs.appspot.com/o/avatars%2F5.png?alt=media&token=ead3b5da-0504-40bc-ad7a-2ad811de2218',
  'https://firebasestorage.googleapis.com/v0/b/seismic-labs.appspot.com/o/avatars%2F6.png?alt=media&token=1db44c95-6e3d-443f-942f-fc5654e11b64',
  'https://firebasestorage.googleapis.com/v0/b/seismic-labs.appspot.com/o/avatars%2F7.png?alt=media&token=19e0210a-d798-4509-b9b1-8866b3d5712f',
  'https://firebasestorage.googleapis.com/v0/b/seismic-labs.appspot.com/o/avatars%2F8.png?alt=media&token=3c8afc16-c211-48a1-95c9-9c3d3835880f',
  'https://firebasestorage.googleapis.com/v0/b/seismic-labs.appspot.com/o/avatars%2F9.png?alt=media&token=a1a19149-c534-48c4-b566-49089b88c679',
  'https://firebasestorage.googleapis.com/v0/b/seismic-labs.appspot.com/o/avatars%2F10.png?alt=media&token=7a9d7963-f0f7-4628-b3f1-fef8f996e406',
  'https://firebasestorage.googleapis.com/v0/b/seismic-labs.appspot.com/o/avatars%2F11.png?alt=media&token=28caee6d-c126-4ab9-af51-145b7ae6fded',
  'https://firebasestorage.googleapis.com/v0/b/seismic-labs.appspot.com/o/avatars%2F12.png?alt=media&token=4bcf4aab-1841-47a2-a0cd-18eb9771bd3b',
  'https://firebasestorage.googleapis.com/v0/b/seismic-labs.appspot.com/o/avatars%2F13.png?alt=media&token=d2a9d545-d607-4f79-b6ac-f5d534f1b724',
  'https://firebasestorage.googleapis.com/v0/b/seismic-labs.appspot.com/o/avatars%2F14.png?alt=media&token=02ec19e3-c335-42aa-aa40-d6810ba3e879',
  'https://firebasestorage.googleapis.com/v0/b/seismic-labs.appspot.com/o/avatars%2F15.png?alt=media&token=f817a6af-9e9c-4750-8965-a183adacd754',
];

const DUMMY_USER = {
  avatarUrl: randomAvatarGenerator(AVATARS),
  chatName: nameGenerator(),
  chatUserId: uuidv4(),
  devices: ['Web'],
  role: 'NORMAL',
  preferences: {
    chatEnabled: true,
  },
};

export { MAX_CHAT_CAR_COUNT, DUMMY_USER, AVATARS };

export const roles = {
  ADMIN: 'MODERATOR',
  CREATOR: 'CREATOR',
  NORMAL: 'NORMAL',
};
