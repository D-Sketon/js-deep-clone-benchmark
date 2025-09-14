import { CloneType } from "../../utils/constant";

export interface User {
  id: string;
  name: string;
  email: string;
  roles: Set<string>;
  lastLogin: Date;
}

export interface Group {
  id: string;
  name: string;
  members: Set<string>; // user IDs
  permissions: Map<string, boolean>; // permission -> allowed
}

export interface MapSetRichObject {
  id: number;
  users: Map<string, User>;
  groups: Map<string, Group>;
  activeUsers: Set<string>;
  userGroups: Map<string, Set<string>>; // user ID -> group IDs
  createdAt: Date;
}

export const mapSetObject: MapSetRichObject = {
  id: 2001,
  users: new Map([
    [
      "u-1",
      {
        id: "u-1",
        name: "Alice Johnson",
        email: "alice@example.com",
        roles: new Set(["admin", "editor"]),
        lastLogin: new Date("2025-01-10T09:00:00Z"),
      },
    ],
    [
      "u-2",
      {
        id: "u-2",
        name: "Bob Smith",
        email: "bob@example.com",
        roles: new Set(["viewer"]),
        lastLogin: new Date("2025-01-09T14:30:00Z"),
      },
    ],
    [
      "u-3",
      {
        id: "u-3",
        name: "Charlie Brown",
        email: "charlie@example.com",
        roles: new Set(["editor", "moderator"]),
        lastLogin: new Date("2025-01-08T16:45:00Z"),
      },
    ],
  ]),
  groups: new Map([
    [
      "g-1",
      {
        id: "g-1",
        name: "Admins",
        members: new Set(["u-1"]),
        permissions: new Map([
          ["read", true],
          ["write", true],
          ["delete", true],
        ]),
      },
    ],
    [
      "g-2",
      {
        id: "g-2",
        name: "Editors",
        members: new Set(["u-1", "u-3"]),
        permissions: new Map([
          ["read", true],
          ["write", true],
          ["delete", false],
        ]),
      },
    ],
  ]),
  activeUsers: new Set(["u-1", "u-2"]),
  userGroups: new Map([
    ["u-1", new Set(["g-1", "g-2"])],
    ["u-2", new Set(["g-2"])],
    ["u-3", new Set(["g-2"])],
  ]),
  createdAt: new Date("2025-01-01T00:00:00Z"),
};

export function buildLargeMapSetObject(multiplier = 50) {
  const largeUsers = new Map<string, User>();
  const largeGroups = new Map<string, Group>();
  const largeActiveUsers = new Set<string>();
  const largeUserGroups = new Map<string, Set<string>>();

  for (let i = 0; i < multiplier; i++) {
    const userId = `u-${i}`;
    largeUsers.set(userId, {
      id: userId,
      name: `User ${i}`,
      email: `user${i}@example.com`,
      roles: new Set(["viewer"]),
      lastLogin: new Date(Date.now() - i * 86400_000),
    });

    if (i % 2 === 0) {
      largeActiveUsers.add(userId);
    }

    const groupId = `g-${i % 10}`;
    if (!largeGroups.has(groupId)) {
      largeGroups.set(groupId, {
        id: groupId,
        name: `Group ${i % 10}`,
        members: new Set(),
        permissions: new Map([
          ["read", true],
          ["write", i % 10 < 5],
        ]),
      });
    }
    largeGroups.get(groupId)!.members.add(userId);

    if (!largeUserGroups.has(userId)) {
      largeUserGroups.set(userId, new Set());
    }
    largeUserGroups.get(userId)!.add(groupId);
  }

  return {
    id: 2002,
    users: largeUsers,
    groups: largeGroups,
    activeUsers: largeActiveUsers,
    userGroups: largeUserGroups,
    createdAt: new Date(),
  };
}

export const successCloneType = [
  CloneType.Clone,
  CloneType.CloneCircular,
  CloneType.Deepcopy,
  CloneType.EsCloneDeep,
  CloneType.FastCopy,
  CloneType.JustClone,
  CloneType.Klona,
  CloneType.Lodash,
  CloneType.NanoCopy,
  CloneType.Nanoclone,
  CloneType.Rfdc,
  CloneType.RfdcCircles,
  CloneType.StructuredClone,
  CloneType.StructuredClonePolyfill,
  CloneType.StructuredCloneCoreJs,
];
