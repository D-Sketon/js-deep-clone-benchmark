# JS Deep Clone Benchmark

This is a benchmark for JS deep clone libraries.

## Clone Support Matrix

| Library | json | json-circular | regexp | date | custom-class | array-buffer | buffer | map-set |
| -- | -- | -- | -- | -- | -- | -- | -- | -- |
| @ungap/structured-clone | ✅ | ✅ | ✅ | ✅ | ❌ | ✅ | ❌ | ✅ |
| clone | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ✅ | ✅ |
| clone-deep | ✅ | ❌ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| copy-anything | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| core-js/structured-clone | ✅ | ✅ | ✅ | ✅ | ❌ | ✅ | ❌ | ✅ |
| deepcopy | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ✅ | ✅ |
| es-toolkit.cloneDeep | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ✅ |
| fast-copy | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ✅ |
| fastest-json-copy | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| JSON.stringify/parse | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| just-clone | ✅ | ❌ | ✅ | ✅ | ❌ | ❌ | ❌ | ✅ |
| klona | ✅ | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| klona/json | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| klona/lite | ✅ | ❌ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ |
| lodash.cloneDeep | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ✅ |
| nano-copy | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| nanoclone | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ✅ |
| plain-object-clone | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| ramda.clone | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ |
| rfdc | ✅ | ✅ | ⚠️ | ✅ | ⚠️ | ⚠️ | ✅ | ✅ |
| structuredClone | ✅ | ✅ | ✅ | ✅ | ❌ | ✅ | ❌ | ✅ |

> ⚠️: need customize manually to support

## Benchmark Results

for Bun please refer to [Bun](README.bun.md)

cpu: 13th Gen Intel(R) Core(TM) i5-13400F

runtime: node 24.10.0 (x64-win32)

### json

| Library | small (ops/s) | large (ops/s) |
| -- | --: | --: |
| @ungap/structured-clone | 39,146 | 4,619 |
| clone | 18,956 | 358 |
| clone-deep | 90,792 | 1,695 |
| clone(circular) | 17,471 | 1,845 |
| copy-anything | 31,750 | 510 |
| core-js/structured-clone | 14,920 | 1,698 |
| deepcopy | 17,276 | 2,111 |
| es-toolkit.cloneDeep | 59,767 | 5,857 |
| fast-copy | 112,189 | 10,655 |
| fastest-json-copy | 221,574 | 3,940 |
| JSON.stringify/parse | 71,869 | 1,350 |
| jsondiffpatch.clone | 297,282 | 5,104 |
| just-clone | 23,918 | 407 |
| klona | 250,918 | 4,308 |
| klona/json | 301,966 | 5,415 |
| klona/lite | 287,537 | 4,556 |
| lodash.cloneDeep | 31,099 | 3,479 |
| nano-copy | 104,451 | 10,528 |
| nanoclone | 129,727 | 13,840 |
| plain-object-clone | 50,378 | 890 |
| ramda.clone | 9,571 | 534 |
| rfdc | 149,211 | 2,742 |
| rfdc(circles) | 144,613 | 2,264 |
| structuredClone | 38,577 | 4,438 |

![json small](assets\node/json-small.svg)
![json large](assets\node/json-large.svg)

### json-circular

| Library | small (ops/s) | large (ops/s) |
| -- | --: | --: |
| @ungap/structured-clone | 510,675 | 747 |
| clone(circular) | 374,966 | 191 |
| core-js/structured-clone | 303,533 | 254 |
| deepcopy | 587,875 | 349 |
| es-toolkit.cloneDeep | 1,602,041 | 1,156 |
| fast-copy | 3,078,861 | 1,794 |
| lodash.cloneDeep | 960,303 | 640 |
| nano-copy | 2,636,515 | 1,759 |
| nanoclone | 3,701,006 | 2,320 |
| ramda.clone | 267,937 | 63 |
| rfdc(circles) | 3,533,938 | 2,430 |
| structuredClone | 532,835 | 756 |

![json-circular small](assets\node/json-circular-small.svg)
![json-circular large](assets\node/json-circular-large.svg)

### regexp

| Library | small (ops/s) | large (ops/s) |
| -- | --: | --: |
| @ungap/structured-clone | 90,743 | 10,596 |
| clone | 54,655 | 786 |
| clone-deep | 136,406 | 2,059 |
| clone(circular) | 46,562 | 4,494 |
| core-js/structured-clone | 50,582 | 5,854 |
| deepcopy | 59,779 | 6,367 |
| es-toolkit.cloneDeep | 156,558 | 15,706 |
| fast-copy | 166,801 | 18,073 |
| jsondiffpatch.clone | 108,325 | 1,461 |
| just-clone | 100,768 | 2,780 |
| klona | 370,200 | 5,306 |
| klona/lite | 393,654 | 5,960 |
| lodash.cloneDeep | 38,533 | 3,615 |
| nano-copy | 178,303 | 17,763 |
| nanoclone | 227,125 | 22,859 |
| ramda.clone | 39,888 | 4,082 |
| rfdc(with RegExp) | 323,267 | 4,361 |
| structuredClone | 87,207 | 10,907 |

![regexp small](assets\node/regexp-small.svg)
![regexp large](assets\node/regexp-large.svg)

### date

| Library | small (ops/s) | large (ops/s) |
| -- | --: | --: |
| @ungap/structured-clone | 46,774 | 14,363 |
| clone | 26,039 | 475 |
| clone-deep | 65,133 | 1,212 |
| clone(circular) | 21,754 | 3,388 |
| core-js/structured-clone | 14,001 | 1,979 |
| deepcopy | 29,431 | 6,647 |
| es-toolkit.cloneDeep | 75,170 | 20,680 |
| fast-copy | 81,319 | 14,837 |
| jsondiffpatch.clone | 293,129 | 5,406 |
| just-clone | 122,193 | 2,335 |
| klona | 149,555 | 2,495 |
| klona/lite | 145,180 | 2,732 |
| lodash.cloneDeep | 31,826 | 4,869 |
| nano-copy | 102,602 | 18,065 |
| nanoclone | 141,449 | 26,211 |
| ramda.clone | 17,060 | 3,082 |
| rfdc | 215,954 | 3,624 |
| rfdc(circles) | 192,543 | 3,779 |
| structuredClone | 47,135 | 13,402 |

![date small](assets\node/date-small.svg)
![date large](assets\node/date-large.svg)

### custom-class

| Library | small (ops/s) | large (ops/s) |
| -- | --: | --: |
| clone | 385,338 | 1,125 |
| clone(circular) | 319,578 | 698 |
| es-toolkit.cloneDeep | 1,122,479 | 3,186 |
| fast-copy | 1,114,205 | 3,505 |
| klona | 1,920,760 | 6,347 |
| klona/lite | 2,089,102 | 7,043 |
| lodash.cloneDeep | 634,589 | 1,569 |
| nano-copy | 1,585,961 | 5,059 |
| ramda.clone | 210,471 | 361 |
| rfdc(with Custom Classes) | 3,391,639 | 10,575 |

![custom-class small](assets\node/custom-class-small.svg)
![custom-class large](assets\node/custom-class-large.svg)

### array-buffer

| Library | small (ops/s) | large (ops/s) |
| -- | --: | --: |
| @ungap/structured-clone | 38,923 | 14 |
| core-js/structured-clone | 32,086 | 45 |
| es-toolkit.cloneDeep | 31,614 | 26 |
| fast-copy | 38,008 | 47 |
| klona | 42,378 | 47 |
| nano-copy | 48,526 | 47 |
| rfdc(with ArrayBuffer) | 46,156 | 48 |
| structuredClone | 38,462 | 14 |

![array-buffer small](assets\node/array-buffer-small.svg)
![array-buffer large](assets\node/array-buffer-large.svg)

### buffer

| Library | small (ops/s) | large (ops/s) |
| -- | --: | --: |
| clone | 45,911 | 51 |
| clone(circular) | 49,370 | 51 |
| deepcopy | 29,843 | 27 |
| klona | 53,432 | 51 |
| nano-copy | 61,793 | 52 |
| rfdc | 65,631 | 51 |
| rfdc(circles) | 62,086 | 51 |

![buffer small](assets\node/buffer-small.svg)
![buffer large](assets\node/buffer-large.svg)

### buffer-zero-copy

| Library | small (ops/s) | large (ops/s) |
| -- | --: | --: |
| es-toolkit.cloneDeep | 1,013,393 | 941,999 |
| lodash.cloneDeep | 371,771 | 399,181 |

![buffer-zero-copy small](assets\node/buffer-zero-copy-small.svg)
![buffer-zero-copy large](assets\node/buffer-zero-copy-large.svg)

### map-set

| Library | small (ops/s) | large (ops/s) |
| -- | --: | --: |
| @ungap/structured-clone | 118,104 | 12,212 |
| clone | 103,997 | 10,083 |
| clone(circular) | 93,616 | 8,397 |
| core-js/structured-clone | 37,733 | 3,950 |
| deepcopy | 88,273 | 8,146 |
| es-toolkit.cloneDeep | 276,023 | 25,413 |
| fast-copy | 283,430 | 24,912 |
| just-clone | 214,348 | 23,357 |
| klona | 421,477 | 35,349 |
| lodash.cloneDeep | 70,379 | 5,983 |
| nano-copy | 151,014 | 14,690 |
| nanoclone | 409,133 | 35,007 |
| rfdc | 144,986 | 20,023 |
| rfdc(circles) | 155,536 | 18,734 |
| structuredClone | 111,217 | 12,833 |

![map-set small](assets\node/map-set-small.svg)
![map-set large](assets\node/map-set-large.svg)
