import { CloneType } from "../utils/constant";

export interface EventLog {
  id: number;
  type: string;
  ts: Date;
  meta?: any;
}

export interface SessionPeriod {
  start: Date;
  end: Date;
}

export interface SessionInfo {
  sid: string;
  period: SessionPeriod;
  hints: { firstByte: Date; lastByte: Date };
}

export interface DateRichObject {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  user: {
    id: string;
    name: string;
    profile: {
      birthDate: Date;
      vipUntil?: Date;
    };
  };
  events: EventLog[];
  lastLoginByEnv: Record<string, Date>;
  sessions: SessionInfo[];
}

export const dateObject: DateRichObject = {
  id: 1001,
  createdAt: new Date("2024-12-31T23:59:59.500Z"),
  updatedAt: new Date("2025-01-15T08:30:10.250Z"),
  user: {
    id: "u-42",
    name: "Alice",
    profile: {
      birthDate: new Date("1995-05-20T10:15:20Z"),
      vipUntil: new Date("2025-12-31T23:59:59Z"),
    },
  },
  events: Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    type: i % 2 === 0 ? "login" : "action",
    ts: new Date(Date.UTC(2025, 0, 1, 0, 0, i)),
    meta: { idx: i },
  })),
  lastLoginByEnv: {
    prod: new Date("2025-02-01T09:00:00Z"),
    staging: new Date("2025-02-01T07:55:00Z"),
    dev: new Date("2025-02-01T06:40:00Z"),
  },
  sessions: Array.from({ length: 6 }, (_, s) => ({
    sid: `S-${s}`,
    period: {
      start: new Date(Date.UTC(2025, 1, 1, 8, s, 0)),
      end: new Date(Date.UTC(2025, 1, 1, 9, s, 30)),
    },
    hints: {
      firstByte: new Date(Date.UTC(2025, 1, 1, 8, s, 5)),
      lastByte: new Date(Date.UTC(2025, 1, 1, 8, s, 50)),
    },
  })),
};

export function buildLargeDateObject(multiplier = 50) {
  return {
    list: Array.from({ length: multiplier }, (_, i) => ({
      ref: i,
      payload: dateObject,
      at: new Date(dateObject.createdAt.getTime() + i * 86400_000),
      events: Array.from(
        { length: 5 },
        (__, j) => new Date(Date.UTC(2025, 2, j + 1, i % 24, j * 5, 0))
      ),
    })),
  };
}

export const successCloneType = [
  CloneType.Clone,
  CloneType.CloneCircular,
  CloneType.CloneDeep,
  CloneType.Deepcopy,
  CloneType.EsCloneDeep,
  CloneType.FastCopy,
  CloneType.JustClone,
  CloneType.Klona,
  CloneType.KlonaLite,
  CloneType.Lodash,
  CloneType.NanoCopy,
  CloneType.Nanoclone,
  CloneType.RamdaClone,
  CloneType.Rfdc,
  CloneType.RfdcCircles,
  CloneType.StructuredClone,
  CloneType.StructuredClonePolyfill,
  CloneType.StructuredCloneCoreJs,
];
