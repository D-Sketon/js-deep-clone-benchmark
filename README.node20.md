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

runtime: node 20.19.5 (x64-win32)

### json

| Library | small (ops/s) | large (ops/s) |
| -- | --: | --: |
| @ungap/structured-clone | 30,412 | 3,368 |
| clone | 28,831 | 482 |
| clone-deep | 86,630 | 1,529 |
| clone(circular) | 27,469 | 3,052 |
| copy-anything | 20,877 | 355 |
| core-js/structured-clone | 11,431 | 1,430 |
| deepcopy | 16,126 | 1,935 |
| es-toolkit.cloneDeep | 49,995 | 4,651 |
| fast-copy | 90,615 | 8,591 |
| fastest-json-copy | 187,835 | 3,175 |
| JSON.stringify/parse | 39,320 | 680 |
| just-clone | 53,617 | 933 |
| klona | 219,168 | 3,931 |
| klona/json | 284,728 | 4,489 |
| klona/lite | 244,101 | 4,395 |
| lodash.cloneDeep | 32,358 | 3,058 |
| nano-copy | 95,476 | 9,933 |
| nanoclone | 112,844 | 12,335 |
| plain-object-clone | 68,190 | 1,060 |
| ramda.clone | 13,676 | 1,123 |
| rfdc | 127,448 | 2,098 |
| rfdc(circles) | 113,832 | 2,023 |
| structuredClone | 30,180 | 3,609 |

![json small](assets\node20/json-small.svg)
![json large](assets\node20/json-large.svg)

### json-circular

| Library | small (ops/s) | large (ops/s) |
| -- | --: | --: |
| @ungap/structured-clone | 472,854 | 566 |
| clone(circular) | 618,638 | 241 |
| core-js/structured-clone | 262,194 | 199 |
| deepcopy | 539,039 | 307 |
| es-toolkit.cloneDeep | 1,426,976 | 1,021 |
| fast-copy | 2,332,042 | 1,426 |
| lodash.cloneDeep | 860,416 | 634 |
| nano-copy | 2,327,938 | 1,563 |
| nanoclone | 3,302,356 | 2,185 |
| ramda.clone | 389,786 | 104 |
| rfdc(circles) | 2,981,660 | 2,056 |
| structuredClone | 488,362 | 552 |

![json-circular small](assets\node20/json-circular-small.svg)
![json-circular large](assets\node20/json-circular-large.svg)

### regexp

| Library | small (ops/s) | large (ops/s) |
| -- | --: | --: |
| @ungap/structured-clone | 71,437 | 9,087 |
| clone | 80,472 | 1,073 |
| clone-deep | 130,781 | 1,835 |
| clone(circular) | 69,251 | 7,171 |
| core-js/structured-clone | 40,534 | 4,253 |
| deepcopy | 50,347 | 5,877 |
| es-toolkit.cloneDeep | 126,226 | 12,942 |
| fast-copy | 133,895 | 13,869 |
| just-clone | 158,151 | 2,558 |
| klona | 292,567 | 4,051 |
| klona/lite | 296,612 | 4,594 |
| lodash.cloneDeep | 33,934 | 2,910 |
| nano-copy | 145,606 | 14,652 |
| nanoclone | 171,624 | 17,130 |
| ramda.clone | 59,029 | 5,191 |
| rfdc(with RegExp) | 256,687 | 3,495 |
| structuredClone | 77,142 | 8,759 |

![regexp small](assets\node20/regexp-small.svg)
![regexp large](assets\node20/regexp-large.svg)

### date

| Library | small (ops/s) | large (ops/s) |
| -- | --: | --: |
| @ungap/structured-clone | 38,298 | 10,026 |
| clone | 39,474 | 697 |
| clone-deep | 65,760 | 1,123 |
| clone(circular) | 36,241 | 5,190 |
| core-js/structured-clone | 12,705 | 1,966 |
| deepcopy | 24,980 | 5,163 |
| es-toolkit.cloneDeep | 60,987 | 16,035 |
| fast-copy | 66,895 | 13,654 |
| just-clone | 118,068 | 1,983 |
| klona | 128,607 | 2,383 |
| klona/lite | 144,102 | 2,433 |
| lodash.cloneDeep | 26,600 | 4,386 |
| nano-copy | 84,201 | 14,833 |
| nanoclone | 104,273 | 19,239 |
| ramda.clone | 26,985 | 4,533 |
| rfdc | 160,118 | 2,709 |
| rfdc(circles) | 142,142 | 2,599 |
| structuredClone | 39,152 | 10,684 |

![date small](assets\node20/date-small.svg)
![date large](assets\node20/date-large.svg)

### custom-class

| Library | small (ops/s) | large (ops/s) |
| -- | --: | --: |
| clone | 517,610 | 1,546 |
| clone(circular) | 543,926 | 1,065 |
| es-toolkit.cloneDeep | 933,912 | 2,676 |
| fast-copy | 909,469 | 2,962 |
| klona | 1,565,855 | 5,349 |
| klona/lite | 1,497,245 | 4,956 |
| lodash.cloneDeep | 635,621 | 1,594 |
| nano-copy | 1,344,444 | 4,274 |
| ramda.clone | 338,453 | 587 |
| rfdc(with Custom Classes) | 2,709,444 | 7,985 |

![custom-class small](assets\node20/custom-class-small.svg)
![custom-class large](assets\node20/custom-class-large.svg)

### array-buffer

| Library | small (ops/s) | large (ops/s) |
| -- | --: | --: |
| @ungap/structured-clone | 37,866 | 14 |
| core-js/structured-clone | 24,368 | 46 |
| es-toolkit.cloneDeep | 44,587 | 26 |
| fast-copy | 45,640 | 47 |
| klona | 46,217 | 47 |
| nano-copy | 43,826 | 47 |
| rfdc(with ArrayBuffer) | 55,929 | 47 |
| structuredClone | 39,761 | 13 |

![array-buffer small](assets\node20/array-buffer-small.svg)
![array-buffer large](assets\node20/array-buffer-large.svg)

### buffer

| Library | small (ops/s) | large (ops/s) |
| -- | --: | --: |
| clone | 59,648 | 51 |
| clone(circular) | 67,224 | 50 |
| deepcopy | 34,588 | 25 |
| klona | 58,964 | 50 |
| nano-copy | 92,015 | 50 |
| rfdc | 79,593 | 50 |
| rfdc(circles) | 70,267 | 51 |

![buffer small](assets\node20/buffer-small.svg)
![buffer large](assets\node20/buffer-large.svg)

### buffer-zero-copy

| Library | small (ops/s) | large (ops/s) |
| -- | --: | --: |
| es-toolkit.cloneDeep | 750,676 | 785,604 |
| lodash.cloneDeep | 292,491 | 283,433 |

![buffer-zero-copy small](assets\node20/buffer-zero-copy-small.svg)
![buffer-zero-copy large](assets\node20/buffer-zero-copy-large.svg)

### map-set

| Library | small (ops/s) | large (ops/s) |
| -- | --: | --: |
| @ungap/structured-clone | 87,300 | 8,698 |
| clone | 157,181 | 14,540 |
| clone(circular) | 139,814 | 11,980 |
| core-js/structured-clone | 35,349 | 3,805 |
| deepcopy | 84,195 | 7,980 |
| es-toolkit.cloneDeep | 239,367 | 22,372 |
| fast-copy | 244,551 | 20,861 |
| just-clone | 220,777 | 23,180 |
| klona | 351,711 | 33,238 |
| lodash.cloneDeep | 59,394 | 4,942 |
| nano-copy | 120,596 | 11,685 |
| nanoclone | 369,044 | 32,977 |
| rfdc | 129,856 | 16,636 |
| rfdc(circles) | 125,009 | 16,131 |
| structuredClone | 88,441 | 9,419 |

![map-set small](assets\node20/map-set-small.svg)
![map-set large](assets\node20/map-set-large.svg)
