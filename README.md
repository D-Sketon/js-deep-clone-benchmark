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
| @ungap/structured-clone | 27,567 | 4,197 |
| clone | 20,001 | 376 |
| clone-deep | 89,609 | 1,647 |
| clone(circular) | 17,819 | 1,924 |
| copy-anything | 29,582 | 524 |
| core-js/structured-clone | 15,000 | 1,687 |
| deepcopy | 19,002 | 2,009 |
| es-toolkit.cloneDeep | 55,113 | 6,015 |
| fast-copy | 114,253 | 10,827 |
| fastest-json-copy | 222,137 | 3,922 |
| JSON.stringify/parse | 70,361 | 1,339 |
| just-clone | 23,224 | 412 |
| klona | 254,926 | 4,099 |
| klona/json | 301,168 | 5,566 |
| klona/lite | 283,286 | 4,699 |
| lodash.cloneDeep | 32,171 | 3,361 |
| nano-copy | 100,307 | 10,627 |
| nanoclone | 136,250 | 13,577 |
| plain-object-clone | 49,973 | 930 |
| ramda.clone | 9,650 | 611 |
| rfdc | 145,798 | 2,701 |
| rfdc(circles) | 140,423 | 2,348 |
| structuredClone | 32,891 | 4,407 |

![json small](assets\node/json-small.svg)
![json large](assets\node/json-large.svg)

### json-circular

| Library | small (ops/s) | large (ops/s) |
| -- | --: | --: |
| @ungap/structured-clone | 521,172 | 733 |
| clone(circular) | 389,954 | 184 |
| core-js/structured-clone | 305,551 | 262 |
| deepcopy | 597,322 | 359 |
| es-toolkit.cloneDeep | 1,525,014 | 1,132 |
| fast-copy | 2,845,266 | 1,648 |
| lodash.cloneDeep | 1,027,456 | 610 |
| nano-copy | 2,599,609 | 1,902 |
| nanoclone | 3,444,622 | 2,163 |
| ramda.clone | 273,807 | 71 |
| rfdc(circles) | 3,877,734 | 2,636 |
| structuredClone | 494,774 | 693 |

![json-circular small](assets\node/json-circular-small.svg)
![json-circular large](assets\node/json-circular-large.svg)

### regexp

| Library | small (ops/s) | large (ops/s) |
| -- | --: | --: |
| @ungap/structured-clone | 92,299 | 9,960 |
| clone | 54,541 | 804 |
| clone-deep | 137,272 | 1,963 |
| clone(circular) | 47,695 | 4,833 |
| core-js/structured-clone | 50,126 | 5,959 |
| deepcopy | 62,495 | 6,527 |
| es-toolkit.cloneDeep | 145,145 | 15,411 |
| fast-copy | 177,690 | 18,558 |
| just-clone | 96,464 | 1,399 |
| klona | 387,581 | 5,581 |
| klona/lite | 397,978 | 5,738 |
| lodash.cloneDeep | 40,360 | 3,722 |
| nano-copy | 175,962 | 17,718 |
| nanoclone | 242,129 | 23,879 |
| ramda.clone | 39,696 | 4,089 |
| rfdc(with RegExp) | 306,489 | 4,495 |
| structuredClone | 95,409 | 10,275 |

![regexp small](assets\node/regexp-small.svg)
![regexp large](assets\node/regexp-large.svg)

### date

| Library | small (ops/s) | large (ops/s) |
| -- | --: | --: |
| @ungap/structured-clone | 48,774 | 14,384 |
| clone | 27,090 | 482 |
| clone-deep | 70,889 | 1,202 |
| clone(circular) | 22,294 | 3,346 |
| core-js/structured-clone | 13,247 | 1,974 |
| deepcopy | 29,059 | 6,421 |
| es-toolkit.cloneDeep | 69,300 | 20,530 |
| fast-copy | 85,049 | 14,922 |
| just-clone | 51,071 | 950 |
| klona | 151,723 | 2,553 |
| klona/lite | 152,508 | 2,767 |
| lodash.cloneDeep | 30,247 | 4,706 |
| nano-copy | 105,414 | 17,279 |
| nanoclone | 134,788 | 25,220 |
| ramda.clone | 18,358 | 3,095 |
| rfdc | 208,111 | 3,462 |
| rfdc(circles) | 201,353 | 3,523 |
| structuredClone | 48,395 | 13,550 |

![date small](assets\node/date-small.svg)
![date large](assets\node/date-large.svg)

### custom-class

| Library | small (ops/s) | large (ops/s) |
| -- | --: | --: |
| clone | 356,130 | 1,127 |
| clone(circular) | 327,785 | 724 |
| es-toolkit.cloneDeep | 1,033,580 | 3,024 |
| fast-copy | 1,143,783 | 3,565 |
| klona | 1,934,819 | 6,332 |
| klona/lite | 2,004,359 | 6,459 |
| lodash.cloneDeep | 675,239 | 1,659 |
| nano-copy | 1,403,298 | 4,625 |
| ramda.clone | 216,218 | 367 |
| rfdc(with Custom Classes) | 3,553,744 | 10,217 |

![custom-class small](assets\node/custom-class-small.svg)
![custom-class large](assets\node/custom-class-large.svg)

### array-buffer

| Library | small (ops/s) | large (ops/s) |
| -- | --: | --: |
| @ungap/structured-clone | 39,986 | 14 |
| core-js/structured-clone | 30,596 | 45 |
| es-toolkit.cloneDeep | 29,876 | 26 |
| fast-copy | 46,002 | 48 |
| klona | 46,220 | 47 |
| nano-copy | 48,957 | 47 |
| rfdc(with ArrayBuffer) | 50,429 | 48 |
| structuredClone | 38,652 | 14 |

![array-buffer small](assets\node/array-buffer-small.svg)
![array-buffer large](assets\node/array-buffer-large.svg)

### buffer

| Library | small (ops/s) | large (ops/s) |
| -- | --: | --: |
| clone | 48,352 | 51 |
| clone(circular) | 51,986 | 51 |
| deepcopy | 31,245 | 27 |
| klona | 51,568 | 52 |
| nano-copy | 62,226 | 52 |
| rfdc | 61,145 | 51 |
| rfdc(circles) | 66,052 | 51 |

![buffer small](assets\node/buffer-small.svg)
![buffer large](assets\node/buffer-large.svg)

### buffer-zero-copy

| Library | small (ops/s) | large (ops/s) |
| -- | --: | --: |
| es-toolkit.cloneDeep | 938,583 | 907,500 |
| lodash.cloneDeep | 380,531 | 393,724 |

![buffer-zero-copy small](assets\node/buffer-zero-copy-small.svg)
![buffer-zero-copy large](assets\node/buffer-zero-copy-large.svg)

### map-set

| Library | small (ops/s) | large (ops/s) |
| -- | --: | --: |
| @ungap/structured-clone | 115,840 | 12,316 |
| clone | 106,022 | 10,029 |
| clone(circular) | 89,762 | 8,330 |
| core-js/structured-clone | 38,970 | 3,850 |
| deepcopy | 88,430 | 8,323 |
| es-toolkit.cloneDeep | 276,227 | 25,662 |
| fast-copy | 285,988 | 24,771 |
| just-clone | 105,159 | 23,911 |
| klona | 405,173 | 35,265 |
| lodash.cloneDeep | 70,537 | 5,979 |
| nano-copy | 148,034 | 14,634 |
| nanoclone | 414,645 | 34,466 |
| rfdc | 144,180 | 19,463 |
| rfdc(circles) | 148,384 | 18,852 |
| structuredClone | 110,796 | 12,993 |

![map-set small](assets\node/map-set-small.svg)
![map-set large](assets\node/map-set-large.svg)
