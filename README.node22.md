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

runtime: node 22.20.0 (x64-win32)

### json

| Library | small (ops/s) | large (ops/s) |
| -- | --: | --: |
| @ungap/structured-clone | 29,259 | 3,501 |
| clone | 29,481 | 542 |
| clone-deep | 89,163 | 1,503 |
| clone(circular) | 25,103 | 2,842 |
| copy-anything | 20,181 | 362 |
| core-js/structured-clone | 12,854 | 1,368 |
| deepcopy | 17,235 | 1,853 |
| es-toolkit.cloneDeep | 53,727 | 5,574 |
| fast-copy | 90,766 | 8,628 |
| fastest-json-copy | 233,556 | 3,771 |
| JSON.stringify/parse | 49,121 | 981 |
| just-clone | 49,175 | 930 |
| klona | 253,250 | 3,971 |
| klona/json | 285,068 | 5,279 |
| klona/lite | 282,096 | 4,570 |
| lodash.cloneDeep | 33,034 | 3,321 |
| nano-copy | 92,483 | 10,885 |
| nanoclone | 132,355 | 12,860 |
| plain-object-clone | 64,626 | 1,250 |
| ramda.clone | 14,749 | 1,103 |
| rfdc | 138,052 | 2,422 |
| rfdc(circles) | 126,616 | 2,175 |
| structuredClone | 28,701 | 3,283 |

![json small](assets\node22/json-small.svg)
![json large](assets\node22/json-large.svg)

### json-circular

| Library | small (ops/s) | large (ops/s) |
| -- | --: | --: |
| @ungap/structured-clone | 451,197 | 570 |
| clone(circular) | 632,445 | 235 |
| core-js/structured-clone | 277,349 | 230 |
| deepcopy | 572,951 | 340 |
| es-toolkit.cloneDeep | 1,424,109 | 1,083 |
| fast-copy | 2,274,877 | 1,400 |
| lodash.cloneDeep | 930,561 | 630 |
| nano-copy | 2,482,274 | 1,814 |
| nanoclone | 3,435,098 | 2,168 |
| ramda.clone | 423,695 | 119 |
| rfdc(circles) | 3,502,143 | 2,317 |
| structuredClone | 421,542 | 564 |

![json-circular small](assets\node22/json-circular-small.svg)
![json-circular large](assets\node22/json-circular-large.svg)

### regexp

| Library | small (ops/s) | large (ops/s) |
| -- | --: | --: |
| @ungap/structured-clone | 68,540 | 8,759 |
| clone | 77,251 | 1,194 |
| clone-deep | 121,032 | 1,786 |
| clone(circular) | 74,472 | 6,991 |
| core-js/structured-clone | 44,032 | 4,691 |
| deepcopy | 55,330 | 6,188 |
| es-toolkit.cloneDeep | 127,586 | 13,021 |
| fast-copy | 139,751 | 14,441 |
| just-clone | 165,979 | 2,431 |
| klona | 306,367 | 4,465 |
| klona/lite | 331,537 | 4,786 |
| lodash.cloneDeep | 39,176 | 3,451 |
| nano-copy | 151,147 | 15,171 |
| nanoclone | 190,301 | 17,916 |
| ramda.clone | 57,406 | 5,313 |
| rfdc(with RegExp) | 244,669 | 3,569 |
| structuredClone | 67,499 | 8,400 |

![regexp small](assets\node22/regexp-small.svg)
![regexp large](assets\node22/regexp-large.svg)

### date

| Library | small (ops/s) | large (ops/s) |
| -- | --: | --: |
| @ungap/structured-clone | 37,003 | 11,035 |
| clone | 37,361 | 673 |
| clone-deep | 66,413 | 1,214 |
| clone(circular) | 34,009 | 4,723 |
| core-js/structured-clone | 12,621 | 1,741 |
| deepcopy | 26,564 | 5,374 |
| es-toolkit.cloneDeep | 64,904 | 17,833 |
| fast-copy | 63,299 | 11,451 |
| just-clone | 111,697 | 2,008 |
| klona | 125,206 | 2,261 |
| klona/lite | 137,852 | 2,392 |
| lodash.cloneDeep | 28,597 | 4,636 |
| nano-copy | 87,171 | 14,267 |
| nanoclone | 115,815 | 21,403 |
| ramda.clone | 26,684 | 4,044 |
| rfdc | 169,380 | 3,026 |
| rfdc(circles) | 164,877 | 2,900 |
| structuredClone | 37,165 | 9,829 |

![date small](assets\node22/date-small.svg)
![date large](assets\node22/date-large.svg)

### custom-class

| Library | small (ops/s) | large (ops/s) |
| -- | --: | --: |
| clone | 552,578 | 1,780 |
| clone(circular) | 482,176 | 972 |
| es-toolkit.cloneDeep | 1,006,702 | 2,847 |
| fast-copy | 976,406 | 2,985 |
| klona | 1,544,419 | 5,290 |
| klona/lite | 1,749,174 | 6,171 |
| lodash.cloneDeep | 584,697 | 1,509 |
| nano-copy | 1,399,600 | 4,676 |
| ramda.clone | 345,889 | 600 |
| rfdc(with Custom Classes) | 2,889,385 | 9,066 |

![custom-class small](assets\node22/custom-class-small.svg)
![custom-class large](assets\node22/custom-class-large.svg)

### array-buffer

| Library | small (ops/s) | large (ops/s) |
| -- | --: | --: |
| @ungap/structured-clone | 39,481 | 13 |
| core-js/structured-clone | 23,826 | 44 |
| es-toolkit.cloneDeep | 40,150 | 25 |
| fast-copy | 45,794 | 47 |
| klona | 44,937 | 47 |
| nano-copy | 45,904 | 46 |
| rfdc(with ArrayBuffer) | 54,692 | 46 |
| structuredClone | 37,795 | 14 |

![array-buffer small](assets\node22/array-buffer-small.svg)
![array-buffer large](assets\node22/array-buffer-large.svg)

### buffer

| Library | small (ops/s) | large (ops/s) |
| -- | --: | --: |
| clone | 94,361 | 51 |
| clone(circular) | 89,494 | 50 |
| deepcopy | 48,719 | 25 |
| klona | 101,776 | 50 |
| nano-copy | 94,458 | 50 |
| rfdc | 108,232 | 49 |
| rfdc(circles) | 104,089 | 50 |

![buffer small](assets\node22/buffer-small.svg)
![buffer large](assets\node22/buffer-large.svg)

### buffer-zero-copy

| Library | small (ops/s) | large (ops/s) |
| -- | --: | --: |
| es-toolkit.cloneDeep | 896,885 | 874,996 |
| lodash.cloneDeep | 334,347 | 345,565 |

![buffer-zero-copy small](assets\node22/buffer-zero-copy-small.svg)
![buffer-zero-copy large](assets\node22/buffer-zero-copy-large.svg)

### map-set

| Library | small (ops/s) | large (ops/s) |
| -- | --: | --: |
| @ungap/structured-clone | 87,425 | 8,871 |
| clone | 151,523 | 13,945 |
| clone(circular) | 139,313 | 12,184 |
| core-js/structured-clone | 35,769 | 3,887 |
| deepcopy | 84,241 | 7,687 |
| es-toolkit.cloneDeep | 250,302 | 23,132 |
| fast-copy | 246,174 | 21,147 |
| just-clone | 207,332 | 22,181 |
| klona | 387,734 | 33,509 |
| lodash.cloneDeep | 61,208 | 4,820 |
| nano-copy | 140,358 | 14,006 |
| nanoclone | 370,039 | 32,223 |
| rfdc | 131,935 | 17,592 |
| rfdc(circles) | 138,477 | 16,806 |
| structuredClone | 82,636 | 9,193 |

![map-set small](assets\node22/map-set-small.svg)
![map-set large](assets\node22/map-set-large.svg)
