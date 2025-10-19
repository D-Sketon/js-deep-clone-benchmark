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

runtime: node 25.0.0 (x64-win32)

### json

| Library | small (ops/s) | large (ops/s) |
| -- | --: | --: |
| @ungap/structured-clone | 38,914 | 4,111 |
| clone | 20,076 | 346 |
| clone-deep | 92,375 | 1,687 |
| clone(circular) | 17,803 | 2,018 |
| copy-anything | 32,720 | 539 |
| core-js/structured-clone | 14,735 | 1,893 |
| deepcopy | 17,543 | 2,137 |
| es-toolkit.cloneDeep | 53,213 | 5,561 |
| fast-copy | 124,693 | 11,819 |
| fastest-json-copy | 218,093 | 3,767 |
| JSON.stringify/parse | 81,621 | 1,350 |
| just-clone | 24,370 | 420 |
| klona | 266,853 | 4,475 |
| klona/json | 306,799 | 5,142 |
| klona/lite | 297,060 | 5,052 |
| lodash.cloneDeep | 32,596 | 3,213 |
| nano-copy | 101,021 | 11,074 |
| nanoclone | 139,948 | 14,468 |
| plain-object-clone | 53,273 | 910 |
| ramda.clone | 10,153 | 601 |
| rfdc | 166,236 | 2,629 |
| rfdc(circles) | 155,219 | 2,527 |
| structuredClone | 38,236 | 4,428 |

![json small](assets\node25/json-small.svg)
![json large](assets\node25/json-large.svg)

### json-circular

| Library | small (ops/s) | large (ops/s) |
| -- | --: | --: |
| @ungap/structured-clone | 511,910 | 764 |
| clone(circular) | 370,572 | 191 |
| core-js/structured-clone | 292,200 | 258 |
| deepcopy | 570,900 | 320 |
| es-toolkit.cloneDeep | 1,627,274 | 1,127 |
| fast-copy | 3,191,023 | 1,827 |
| lodash.cloneDeep | 980,195 | 631 |
| nano-copy | 2,657,524 | 1,790 |
| nanoclone | 4,089,676 | 2,400 |
| ramda.clone | 267,790 | 71 |
| rfdc(circles) | 3,762,311 | 2,510 |
| structuredClone | 523,536 | 716 |

![json-circular small](assets\node25/json-circular-small.svg)
![json-circular large](assets\node25/json-circular-large.svg)

### regexp

| Library | small (ops/s) | large (ops/s) |
| -- | --: | --: |
| @ungap/structured-clone | 89,554 | 11,359 |
| clone | 53,906 | 843 |
| clone-deep | 151,104 | 2,283 |
| clone(circular) | 46,229 | 4,429 |
| core-js/structured-clone | 50,647 | 5,422 |
| deepcopy | 57,517 | 6,641 |
| es-toolkit.cloneDeep | 160,697 | 16,080 |
| fast-copy | 167,974 | 18,223 |
| just-clone | 100,527 | 2,981 |
| klona | 364,836 | 5,304 |
| klona/lite | 397,408 | 5,599 |
| lodash.cloneDeep | 38,602 | 3,343 |
| nano-copy | 181,288 | 18,422 |
| nanoclone | 227,985 | 22,996 |
| ramda.clone | 41,006 | 4,010 |
| rfdc(with RegExp) | 329,153 | 4,850 |
| structuredClone | 87,947 | 11,008 |

![regexp small](assets\node25/regexp-small.svg)
![regexp large](assets\node25/regexp-large.svg)

### date

| Library | small (ops/s) | large (ops/s) |
| -- | --: | --: |
| @ungap/structured-clone | 47,267 | 13,460 |
| clone | 25,459 | 467 |
| clone-deep | 69,564 | 1,304 |
| clone(circular) | 21,346 | 3,274 |
| core-js/structured-clone | 13,098 | 1,877 |
| deepcopy | 27,800 | 5,699 |
| es-toolkit.cloneDeep | 74,376 | 18,791 |
| fast-copy | 74,559 | 13,910 |
| just-clone | 126,678 | 2,203 |
| klona | 131,178 | 2,337 |
| klona/lite | 135,677 | 2,669 |
| lodash.cloneDeep | 30,175 | 4,354 |
| nano-copy | 102,863 | 16,883 |
| nanoclone | 126,210 | 23,153 |
| ramda.clone | 18,245 | 2,996 |
| rfdc | 188,431 | 3,497 |
| rfdc(circles) | 176,611 | 2,947 |
| structuredClone | 47,246 | 12,888 |

![date small](assets\node25/date-small.svg)
![date large](assets\node25/date-large.svg)

### custom-class

| Library | small (ops/s) | large (ops/s) |
| -- | --: | --: |
| clone | 389,366 | 1,169 |
| clone(circular) | 304,117 | 683 |
| es-toolkit.cloneDeep | 1,101,783 | 3,154 |
| fast-copy | 1,134,999 | 3,472 |
| klona | 1,781,322 | 5,946 |
| klona/lite | 2,078,485 | 6,836 |
| lodash.cloneDeep | 632,832 | 1,559 |
| nano-copy | 1,649,568 | 5,061 |
| ramda.clone | 215,308 | 372 |
| rfdc(with Custom Classes) | 3,315,574 | 9,585 |

![custom-class small](assets\node25/custom-class-small.svg)
![custom-class large](assets\node25/custom-class-large.svg)

### array-buffer

| Library | small (ops/s) | large (ops/s) |
| -- | --: | --: |
| @ungap/structured-clone | 38,764 | 14 |
| core-js/structured-clone | 33,802 | 46 |
| es-toolkit.cloneDeep | 29,205 | 25 |
| fast-copy | 37,802 | 47 |
| klona | 42,196 | 48 |
| nano-copy | 44,427 | 48 |
| rfdc(with ArrayBuffer) | 44,389 | 48 |
| structuredClone | 37,000 | 14 |

![array-buffer small](assets\node25/array-buffer-small.svg)
![array-buffer large](assets\node25/array-buffer-large.svg)

### buffer

| Library | small (ops/s) | large (ops/s) |
| -- | --: | --: |
| clone | 49,094 | 51 |
| clone(circular) | 49,080 | 51 |
| deepcopy | 31,805 | 27 |
| klona | 51,314 | 51 |
| nano-copy | 63,450 | 51 |
| rfdc | 62,023 | 52 |
| rfdc(circles) | 68,787 | 52 |

![buffer small](assets\node25/buffer-small.svg)
![buffer large](assets\node25/buffer-large.svg)

### buffer-zero-copy

| Library | small (ops/s) | large (ops/s) |
| -- | --: | --: |
| es-toolkit.cloneDeep | 982,507 | 1,014,083 |
| lodash.cloneDeep | 369,536 | 365,921 |

![buffer-zero-copy small](assets\node25/buffer-zero-copy-small.svg)
![buffer-zero-copy large](assets\node25/buffer-zero-copy-large.svg)

### map-set

| Library | small (ops/s) | large (ops/s) |
| -- | --: | --: |
| @ungap/structured-clone | 109,031 | 12,031 |
| clone | 104,421 | 10,658 |
| clone(circular) | 87,545 | 7,578 |
| core-js/structured-clone | 35,557 | 3,804 |
| deepcopy | 89,212 | 8,741 |
| es-toolkit.cloneDeep | 282,629 | 25,351 |
| fast-copy | 272,431 | 24,894 |
| just-clone | 235,673 | 24,148 |
| klona | 388,687 | 35,996 |
| lodash.cloneDeep | 71,741 | 5,452 |
| nano-copy | 151,725 | 15,276 |
| nanoclone | 400,240 | 36,078 |
| rfdc | 164,404 | 20,609 |
| rfdc(circles) | 140,379 | 19,379 |
| structuredClone | 112,079 | 11,764 |

![map-set small](assets\node25/map-set-small.svg)
![map-set large](assets\node25/map-set-large.svg)
