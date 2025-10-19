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
| @ungap/structured-clone | 37,923 | 4,118 |
| clone | 20,799 | 354 |
| clone-deep | 101,529 | 1,694 |
| clone(circular) | 17,851 | 2,007 |
| copy-anything | 29,758 | 533 |
| core-js/structured-clone | 14,771 | 1,887 |
| deepcopy | 18,251 | 2,126 |
| es-toolkit.cloneDeep | 57,914 | 5,482 |
| fast-copy | 117,482 | 12,164 |
| fastest-json-copy | 229,554 | 3,694 |
| JSON.stringify/parse | 76,876 | 1,321 |
| jsondiffpatch.clone | 355,022 | 5,989 |
| just-clone | 24,539 | 427 |
| klona | 255,911 | 4,524 |
| klona/json | 327,473 | 5,237 |
| klona/lite | 284,088 | 5,215 |
| lodash.cloneDeep | 32,891 | 3,273 |
| nano-copy | 104,762 | 10,945 |
| nanoclone | 136,978 | 14,468 |
| plain-object-clone | 55,157 | 939 |
| ramda.clone | 9,803 | 712 |
| rfdc | 180,351 | 2,772 |
| rfdc(circles) | 148,719 | 2,547 |
| structuredClone | 39,027 | 4,486 |

![json small](assets\node25/json-small.svg)
![json large](assets\node25/json-large.svg)

### json-circular

| Library | small (ops/s) | large (ops/s) |
| -- | --: | --: |
| @ungap/structured-clone | 505,000 | 714 |
| clone(circular) | 368,929 | 181 |
| core-js/structured-clone | 310,766 | 280 |
| deepcopy | 601,764 | 354 |
| es-toolkit.cloneDeep | 1,585,827 | 1,203 |
| fast-copy | 2,951,078 | 1,738 |
| lodash.cloneDeep | 976,892 | 589 |
| nano-copy | 2,772,568 | 1,909 |
| nanoclone | 3,666,125 | 2,276 |
| ramda.clone | 279,196 | 74 |
| rfdc(circles) | 3,938,745 | 2,585 |
| structuredClone | 483,655 | 744 |

![json-circular small](assets\node25/json-circular-small.svg)
![json-circular large](assets\node25/json-circular-large.svg)

### regexp

| Library | small (ops/s) | large (ops/s) |
| -- | --: | --: |
| @ungap/structured-clone | 93,990 | 10,874 |
| clone | 52,670 | 800 |
| clone-deep | 154,602 | 2,154 |
| clone(circular) | 49,484 | 4,782 |
| core-js/structured-clone | 49,479 | 6,022 |
| deepcopy | 61,724 | 6,945 |
| es-toolkit.cloneDeep | 150,062 | 16,123 |
| fast-copy | 178,151 | 18,287 |
| jsondiffpatch.clone | 105,171 | 1,635 |
| just-clone | 98,926 | 1,387 |
| klona | 381,071 | 5,870 |
| klona/lite | 418,102 | 5,743 |
| lodash.cloneDeep | 39,966 | 3,566 |
| nano-copy | 176,510 | 18,013 |
| nanoclone | 245,210 | 23,992 |
| ramda.clone | 40,447 | 4,104 |
| rfdc(with RegExp) | 319,697 | 4,721 |
| structuredClone | 94,621 | 10,231 |

![regexp small](assets\node25/regexp-small.svg)
![regexp large](assets\node25/regexp-large.svg)

### date

| Library | small (ops/s) | large (ops/s) |
| -- | --: | --: |
| @ungap/structured-clone | 48,463 | 13,107 |
| clone | 25,936 | 473 |
| clone-deep | 73,102 | 1,463 |
| clone(circular) | 21,545 | 3,148 |
| core-js/structured-clone | 13,008 | 1,906 |
| deepcopy | 27,881 | 5,358 |
| es-toolkit.cloneDeep | 75,370 | 19,249 |
| fast-copy | 75,443 | 14,314 |
| jsondiffpatch.clone | 259,297 | 5,020 |
| just-clone | 51,995 | 950 |
| klona | 130,943 | 2,387 |
| klona/lite | 144,353 | 2,655 |
| lodash.cloneDeep | 30,466 | 4,527 |
| nano-copy | 101,025 | 16,976 |
| nanoclone | 122,845 | 22,795 |
| ramda.clone | 18,391 | 3,033 |
| rfdc | 183,438 | 3,592 |
| rfdc(circles) | 183,092 | 3,081 |
| structuredClone | 45,815 | 13,416 |

![date small](assets\node25/date-small.svg)
![date large](assets\node25/date-large.svg)

### custom-class

| Library | small (ops/s) | large (ops/s) |
| -- | --: | --: |
| clone | 367,444 | 1,085 |
| clone(circular) | 339,997 | 751 |
| es-toolkit.cloneDeep | 1,084,337 | 2,999 |
| fast-copy | 1,135,313 | 3,521 |
| klona | 1,907,323 | 6,287 |
| klona/lite | 1,853,969 | 6,384 |
| lodash.cloneDeep | 677,393 | 1,690 |
| nano-copy | 1,524,590 | 4,861 |
| ramda.clone | 220,582 | 375 |
| rfdc(with Custom Classes) | 3,419,542 | 10,418 |

![custom-class small](assets\node25/custom-class-small.svg)
![custom-class large](assets\node25/custom-class-large.svg)

### array-buffer

| Library | small (ops/s) | large (ops/s) |
| -- | --: | --: |
| @ungap/structured-clone | 38,680 | 14 |
| core-js/structured-clone | 32,078 | 47 |
| es-toolkit.cloneDeep | 29,249 | 25 |
| fast-copy | 37,603 | 48 |
| klona | 40,890 | 48 |
| nano-copy | 46,492 | 48 |
| rfdc(with ArrayBuffer) | 47,525 | 48 |
| structuredClone | 37,397 | 14 |

![array-buffer small](assets\node25/array-buffer-small.svg)
![array-buffer large](assets\node25/array-buffer-large.svg)

### buffer

| Library | small (ops/s) | large (ops/s) |
| -- | --: | --: |
| clone | 49,800 | 51 |
| clone(circular) | 50,660 | 52 |
| deepcopy | 30,854 | 27 |
| klona | 47,146 | 52 |
| nano-copy | 61,228 | 52 |
| rfdc | 64,263 | 51 |
| rfdc(circles) | 68,200 | 51 |

![buffer small](assets\node25/buffer-small.svg)
![buffer large](assets\node25/buffer-large.svg)

### buffer-zero-copy

| Library | small (ops/s) | large (ops/s) |
| -- | --: | --: |
| es-toolkit.cloneDeep | 1,007,352 | 960,589 |
| lodash.cloneDeep | 366,642 | 379,969 |

![buffer-zero-copy small](assets\node25/buffer-zero-copy-small.svg)
![buffer-zero-copy large](assets\node25/buffer-zero-copy-large.svg)

### map-set

| Library | small (ops/s) | large (ops/s) |
| -- | --: | --: |
| @ungap/structured-clone | 109,791 | 12,196 |
| clone | 106,318 | 9,934 |
| clone(circular) | 91,033 | 8,082 |
| core-js/structured-clone | 35,543 | 3,727 |
| deepcopy | 85,247 | 8,192 |
| es-toolkit.cloneDeep | 280,206 | 25,035 |
| fast-copy | 252,408 | 22,847 |
| just-clone | 103,822 | 24,161 |
| klona | 401,981 | 33,758 |
| lodash.cloneDeep | 68,528 | 5,647 |
| nano-copy | 151,837 | 14,206 |
| nanoclone | 420,927 | 36,496 |
| rfdc | 151,000 | 19,817 |
| rfdc(circles) | 156,605 | 19,417 |
| structuredClone | 105,362 | 11,115 |

![map-set small](assets\node25/map-set-small.svg)
![map-set large](assets\node25/map-set-large.svg)
