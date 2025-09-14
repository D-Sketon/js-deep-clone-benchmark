import { CloneType } from "../../utils/constant";

export interface ArrayBufferRichObject {
  id: number;
  fileData: ArrayBuffer;
  imageBuffer: ArrayBuffer;
  audioBuffer: ArrayBuffer;
  dataView: DataView;
  imageData: Uint8Array;
  audioSamples: Float32Array;
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

export const arrayBufferObject: ArrayBufferRichObject = {
  id: 4001,
  fileData: new ArrayBuffer(1024),
  imageBuffer: new ArrayBuffer(3072),
  audioBuffer: new ArrayBuffer(44100 * 2),
  dataView: new DataView(new ArrayBuffer(16)),
  imageData: new Uint8Array(12),
  audioSamples: new Float32Array(5),
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
  const fileView = new Uint8Array(arrayBufferObject.fileData);
  for (let i = 0; i < fileView.length; i++) {
    fileView[i] = i % 256;
  }

  const imageView = new Uint8Array(arrayBufferObject.imageBuffer);
  for (let i = 0; i < imageView.length; i++) {
    imageView[i] = Math.floor(Math.random() * 256);
  }

  const audioView = new Uint8Array(arrayBufferObject.audioBuffer);
  for (let i = 0; i < audioView.length; i++) {
    audioView[i] = Math.floor(Math.random() * 256);
  }

  const dv = arrayBufferObject.dataView;
  dv.setUint32(0, 123456789);
  dv.setFloat64(4, 3.141592653589793);
  dv.setInt16(12, -32768);
  dv.setUint8(14, 255);
  dv.setUint8(15, 0);

  arrayBufferObject.imageData.set([
    255, 0, 0, 255, 0, 255, 0, 255, 0, 0, 255, 255,
  ]);
  arrayBufferObject.audioSamples.set([-0.5, 0.0, 0.5, -0.25, 0.75]);
})();

export function buildLargeArrayBufferObject(multiplier = 50) {
  const largeFileData = new ArrayBuffer(multiplier * 1024 * 1024);
  const largeImageBuffer = new ArrayBuffer(multiplier * 1024 * 1024);
  const largeAudioBuffer = new ArrayBuffer(multiplier * 44100 * 2);
  const largeDataView = new DataView(new ArrayBuffer(multiplier * 16));
  const largeImageData = new Uint8Array(multiplier * 1024);
  const largeAudioSamples = new Float32Array(multiplier * 44100);

  const fileView = new Uint8Array(largeFileData);
  for (let i = 0; i < fileView.length; i++) {
    fileView[i] = i % 256;
  }

  const imageView = new Uint8Array(largeImageBuffer);
  for (let i = 0; i < imageView.length; i++) {
    imageView[i] = Math.floor(Math.random() * 256);
  }

  const audioView = new Uint8Array(largeAudioBuffer);
  for (let i = 0; i < audioView.length; i++) {
    audioView[i] = Math.floor(Math.random() * 256);
  }

  for (let i = 0; i < largeDataView.byteLength; i += 4) {
    largeDataView.setUint32(i, Math.floor(Math.random() * 4294967296));
  }

  for (let i = 0; i < largeImageData.length; i++) {
    largeImageData[i] = Math.floor(Math.random() * 256);
  }
  for (let i = 0; i < largeAudioSamples.length; i++) {
    largeAudioSamples[i] = (Math.random() - 0.5) * 2;
  }

  return {
    id: 4002,
    fileData: largeFileData,
    imageBuffer: largeImageBuffer,
    audioBuffer: largeAudioBuffer,
    dataView: largeDataView,
    imageData: largeImageData,
    audioSamples: largeAudioSamples,
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
  CloneType.EsCloneDeep,
  CloneType.FastCopy,
  CloneType.Klona,
  CloneType.NanoCopy,
  CloneType.RfdcWithArrayBuffer,
  CloneType.StructuredClone,
  CloneType.StructuredClonePolyfill,
  CloneType.StructuredCloneCoreJs,
];
