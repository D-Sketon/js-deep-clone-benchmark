import clone from "clone";
import cloneDeep from "clone-deep";
import deepcopy from "deepcopy";
import { cloneDeep as esCloneDeep } from "es-toolkit";
import fastCopy from "fast-copy";
import { copy } from "fastest-json-copy";
import justClone from 'just-clone';
import { klona } from "klona";
import { klona as klonaJson } from "klona/json";
import { klona as klonaLite } from "klona/lite";
import nanoCopy from "nano-copy";
import nanoclone from "nanoclone";
import plainObjectClone from "plain-object-clone";
import { copy as copyAnything } from 'copy-anything'
import * as R from "ramda";
import rfdcFactory from "rfdc";
import structuredClonePolyfill from "@ungap/structured-clone";
import structuredCloneCoreJs from "core-js-pure/actual/structured-clone";
const _ = require('lodash');

export class CustomClass {
  public id: number;
  public name: string;
  public data: { key: string; value: any };
  public items: number[];
  public createdAt: Date;
  public symbolProp: symbol;

  static staticProp = "static value";
  static staticMethod() {
    return "static result";
  }

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
    this.data = { key: "default", value: { nested: true } };
    this.items = [1, 2, 3];
    this.createdAt = new Date();
    this.symbolProp = Symbol("test");
  }

  get fullName() {
    return `${this.name} (${this.id})`;
  }

  set fullName(value: string) {
    const parts = value.split(" (");
    this.name = parts[0];
    this.id = parseInt(parts[1].replace(")", ""));
  }

  instanceMethod() {
    return `Method called on ${this.name}`;
  }

  toString() {
    return `CustomClass: ${this.name} (${this.id})`;
  }
}


export enum CloneType {
  Clone = "clone",
  CloneCircular = "clone(circular)",
  CloneDeep = "clone-deep",
  CopyAnything = "copy-anything",
  Deepcopy = "deepcopy",
  EsCloneDeep = "es-toolkit.cloneDeep",
  FastCopy = "fast-copy",
  FastestJsonCopy = "fastest-json-copy",
  JustClone = "just-clone",
  Klona = "klona",
  KlonaJson = "klona/json",
  KlonaLite = "klona/lite",
  Lodash = "lodash.cloneDeep",
  NanoCopy = "nano-copy",
  Nanoclone = "nanoclone",
  PlainObjectClone = "plain-object-clone",
  RamdaClone = "ramda.clone",
  Rfdc = "rfdc",
  RfdcCircles = "rfdc(circles)",
  RfdcWithArrayBuffer = "rfdc(with ArrayBuffer)",
  RfdcWithRegExp = "rfdc(with RegExp)",
  RfdcWithCustomClasses = "rfdc(with Custom Classes)",
  StructuredClone = "structuredClone",
  StructuredClonePolyfill = "@ungap/structured-clone",
  StructuredCloneCoreJs = "core-js/structured-clone",
  JSON = "JSON.stringify/parse",
}

const rfdc = rfdcFactory();
const rfdcCircles = rfdcFactory({ circles: true });
const rfdcWithArrayBuffer = rfdcFactory({
  constructorHandlers: [[ArrayBuffer, (v: ArrayBuffer) => v.slice(0)]],
});
const rfdcWithRegExp = rfdcFactory({
  constructorHandlers: [[RegExp, (v: RegExp) => new RegExp(v.source, v.flags)]],
});
const rfdcWithCustomClasses = rfdcFactory({
  constructorHandlers: [
    [
      CustomClass,
      (v: CustomClass) => {
        const copy = new CustomClass(v.id, v.name);
        copy.createdAt = new Date(v.createdAt.getTime());
        copy.data = rfdc(v.data);
        copy.items = v.items.slice();
        copy.symbolProp = v.symbolProp; // Symbols are copied by reference
        return copy;
      },
    ],
  ],
});

export const CloneFn: Record<CloneType, (v: any) => any> = {
  [CloneType.Clone]: (v) => clone(v, false),
  [CloneType.CloneCircular]: (v) => clone(v, true),
  [CloneType.CloneDeep]: cloneDeep,
  [CloneType.CopyAnything]: copyAnything,
  [CloneType.Deepcopy]: deepcopy,
  [CloneType.EsCloneDeep]: esCloneDeep,
  [CloneType.FastCopy]: fastCopy,
  [CloneType.FastestJsonCopy]: copy,
  [CloneType.JustClone]: justClone,
  [CloneType.Klona]: klona,
  [CloneType.KlonaJson]: klonaJson,
  [CloneType.KlonaLite]: klonaLite,
  [CloneType.Lodash]: _.cloneDeep,
  [CloneType.NanoCopy]: nanoCopy,
  [CloneType.Nanoclone]: nanoclone,
  [CloneType.PlainObjectClone]: plainObjectClone,
  [CloneType.RamdaClone]: R.clone,
  [CloneType.Rfdc]: rfdc,
  [CloneType.RfdcCircles]: rfdcCircles,
  [CloneType.RfdcWithArrayBuffer]: rfdcWithArrayBuffer,
  [CloneType.RfdcWithRegExp]: rfdcWithRegExp,
  [CloneType.RfdcWithCustomClasses]: rfdcWithCustomClasses,
  [CloneType.StructuredClone]: structuredClone,
  [CloneType.StructuredClonePolyfill]: structuredClonePolyfill,
  [CloneType.StructuredCloneCoreJs]: structuredCloneCoreJs,
  [CloneType.JSON]: (v) => JSON.parse(JSON.stringify(v)),
} as const;
