import { CloneType } from "../../utils/constant";

export interface BufferRichObject {
  id: number;
  fileData: Buffer;
  imageBuffer: Buffer;
  audioBuffer: Buffer;
  metadata: {
    fileName: string;
    fileSize: number;
    imageWidth: number;
    imageHeight: number;
    audioSampleRate: number;
    audioChannels: number;
  };
  createdAt: Date;
}

export const bufferObject: BufferRichObject = {
  id: 5001,
  fileData: Buffer.alloc(1024),
  imageBuffer: Buffer.alloc(3072),
  audioBuffer: Buffer.alloc(44100 * 2),
  metadata: {
    fileName: "sample.txt",
    fileSize: 1024,
    imageWidth: 32,
    imageHeight: 32,
    audioSampleRate: 44100,
    audioChannels: 2,
  },
  createdAt: new Date("2025-01-01T00:00:00Z"),
};

(() => {
  // Fill fileData with sequential bytes
  for (let i = 0; i < bufferObject.fileData.length; i++) {
    bufferObject.fileData[i] = i % 256;
  }

  // Fill imageBuffer with random bytes
  for (let i = 0; i < bufferObject.imageBuffer.length; i++) {
    bufferObject.imageBuffer[i] = Math.floor(Math.random() * 256);
  }

  // Fill audioBuffer with random bytes
  for (let i = 0; i < bufferObject.audioBuffer.length; i++) {
    bufferObject.audioBuffer[i] = Math.floor(Math.random() * 256);
  }
})();

export function buildLargeBufferObject(multiplier = 50) {
  const largeFileData = Buffer.alloc(multiplier * 1024 * 1024);
  const largeImageBuffer = Buffer.alloc(multiplier * 1024 * 1024);
  const largeAudioBuffer = Buffer.alloc(multiplier * 44100 * 2);

  // Fill with data
  for (let i = 0; i < largeFileData.length; i++) {
    largeFileData[i] = i % 256;
  }

  for (let i = 0; i < largeImageBuffer.length; i++) {
    largeImageBuffer[i] = Math.floor(Math.random() * 256);
  }

  for (let i = 0; i < largeAudioBuffer.length; i++) {
    largeAudioBuffer[i] = Math.floor(Math.random() * 256);
  }

  return {
    id: 5002,
    fileData: largeFileData,
    imageBuffer: largeImageBuffer,
    audioBuffer: largeAudioBuffer,
    metadata: {
      fileName: `large_file_${multiplier}.bin`,
      fileSize: multiplier * 1024 * 1024,
      imageWidth: Math.sqrt((multiplier * 1024) / 4),
      imageHeight: Math.sqrt((multiplier * 1024) / 4),
      audioSampleRate: 44100,
      audioChannels: 2,
    },
    createdAt: new Date(),
  };
}

export const successCloneType = [
  CloneType.Clone,
  CloneType.CloneCircular,
  CloneType.Deepcopy,
  CloneType.Rfdc,
  CloneType.RfdcCircles,
  CloneType.Klona,
  CloneType.NanoCopy,
];

export const zeroCopyCloneType = [
  CloneType.EsCloneDeep,
  CloneType.Lodash,
];