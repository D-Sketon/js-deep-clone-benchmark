# JS Deep Clone Benchmark for Bun

This is a benchmark for JS deep clone libraries for Bun.

## Benchmark Results

for Node please refer to [Node](README.md)

cpu: 13th Gen Intel(R) Core(TM) i5-13400F

runtime: bun 1.3.0 (x64-win32)

### json

| Library | small (ops/s) | large (ops/s) |
| -- | --: | --: |
| @ungap/structured-clone | 28,446 | 2,662 |
| clone | 31,459 | 315 |
| clone-deep | 152,325 | 748 |
| clone(circular) | 27,003 | 1,941 |
| copy-anything | 44,126 | 394 |
| core-js/structured-clone | 12,276 | 1,557 |
| deepcopy | 10,809 | 1,030 |
| es-toolkit.cloneDeep | 53,510 | 2,696 |
| fast-copy | 152,944 | 4,257 |
| fastest-json-copy | 291,877 | 1,431 |
| JSON.stringify/parse | 39,963 | 650 |
| jsondiffpatch.clone | 80,054 | 1,136 |
| just-clone | 21,110 | 362 |
| klona | 62,821 | 1,162 |
| klona/json | 74,769 | 1,212 |
| klona/lite | 64,320 | 1,142 |
| lodash.cloneDeep | 19,764 | 1,855 |
| nano-copy | 57,404 | 4,714 |
| nanoclone | 68,896 | 8,474 |
| plain-object-clone | 28,147 | 448 |
| ramda.clone | 9,183 | 656 |
| rfdc | 34,713 | 583 |
| rfdc(circles) | 34,893 | 582 |
| structuredClone | 28,351 | 2,845 |

![json small](assets\bun/json-small.svg)
![json large](assets\bun/json-large.svg)

### json-circular

| Library | small (ops/s) | large (ops/s) |
| -- | --: | --: |
| @ungap/structured-clone | 343,981 | 568 |
| clone(circular) | 443,521 | 223 |
| core-js/structured-clone | 313,618 | 225 |
| deepcopy | 288,407 | 238 |
| es-toolkit.cloneDeep | 777,874 | 1,012 |
| fast-copy | 993,828 | 2,634 |
| lodash.cloneDeep | 504,219 | 523 |
| nano-copy | 1,071,845 | 2,206 |
| nanoclone | 2,038,458 | 1,768 |
| ramda.clone | 251,931 | 54 |
| rfdc(circles) | 1,109,894 | 1,001 |
| structuredClone | 354,779 | 581 |

![json-circular small](assets\bun/json-circular-small.svg)
![json-circular large](assets\bun/json-circular-large.svg)

### regexp

| Library | small (ops/s) | large (ops/s) |
| -- | --: | --: |
| @ungap/structured-clone | 56,682 | 8,747 |
| clone | 45,839 | 715 |
| clone-deep | 42,117 | 551 |
| clone(circular) | 42,739 | 4,162 |
| core-js/structured-clone | 28,151 | 3,080 |
| deepcopy | 19,186 | 2,122 |
| es-toolkit.cloneDeep | 50,929 | 5,089 |
| fast-copy | 50,655 | 5,802 |
| jsondiffpatch.clone | 46,880 | 704 |
| just-clone | 76,025 | 1,068 |
| klona | 66,768 | 1,018 |
| klona/lite | 72,375 | 1,017 |
| lodash.cloneDeep | 23,388 | 2,118 |
| nano-copy | 149,381 | 13,971 |
| nanoclone | 226,936 | 18,978 |
| ramda.clone | 25,819 | 2,431 |
| rfdc(with RegExp) | 60,883 | 909 |
| structuredClone | 56,989 | 8,402 |

![regexp small](assets\bun/regexp-small.svg)
![regexp large](assets\bun/regexp-large.svg)

### date

| Library | small (ops/s) | large (ops/s) |
| -- | --: | --: |
| @ungap/structured-clone | 42,232 | 14,944 |
| clone | 75,846 | 729 |
| clone-deep | 85,414 | 901 |
| clone(circular) | 55,919 | 6,027 |
| core-js/structured-clone | 13,949 | 2,154 |
| deepcopy | 13,748 | 3,198 |
| es-toolkit.cloneDeep | 59,975 | 17,460 |
| fast-copy | 102,151 | 17,975 |
| jsondiffpatch.clone | 84,202 | 1,702 |
| just-clone | 45,299 | 814 |
| klona | 61,451 | 1,212 |
| klona/lite | 63,032 | 1,179 |
| lodash.cloneDeep | 21,276 | 3,742 |
| nano-copy | 57,308 | 18,271 |
| nanoclone | 83,397 | 22,023 |
| ramda.clone | 15,810 | 3,296 |
| rfdc | 69,330 | 1,276 |
| rfdc(circles) | 67,398 | 1,266 |
| structuredClone | 43,741 | 14,736 |

![date small](assets\bun/date-small.svg)
![date large](assets\bun/date-large.svg)

### custom-class

| Library | small (ops/s) | large (ops/s) |
| -- | --: | --: |
| clone | 675,521 | 1,955 |
| clone(circular) | 578,667 | 1,053 |
| es-toolkit.cloneDeep | 829,771 | 2,214 |
| fast-copy | 1,284,009 | 4,613 |
| klona | 1,848,358 | 5,629 |
| klona/lite | 1,830,779 | 5,500 |
| lodash.cloneDeep | 549,680 | 1,392 |
| nano-copy | 1,790,039 | 6,916 |
| ramda.clone | 198,383 | 326 |
| rfdc(with Custom Classes) | 1,428,640 | 3,641 |

![custom-class small](assets\bun/custom-class-small.svg)
![custom-class large](assets\bun/custom-class-large.svg)

### array-buffer

| Library | small (ops/s) | large (ops/s) |
| -- | --: | --: |
| @ungap/structured-clone | 18,026 | 7 |
| core-js/structured-clone | 28,391 | 31 |
| es-toolkit.cloneDeep | 25,565 | 20 |
| fast-copy | 26,379 | 31 |
| klona | 26,200 | 31 |
| nano-copy | 28,443 | 31 |
| rfdc(with ArrayBuffer) | 26,452 | 31 |
| structuredClone | 18,537 | 7 |

![array-buffer small](assets\bun/array-buffer-small.svg)
![array-buffer large](assets\bun/array-buffer-large.svg)

### buffer

| Library | small (ops/s) | large (ops/s) |
| -- | --: | --: |
| clone | 116,282 | 32 |
| clone(circular) | 112,328 | 34 |
| deepcopy | 41,831 | 17 |
| klona | 118,636 | 33 |
| nano-copy | 120,294 | 34 |
| rfdc | 123,794 | 34 |
| rfdc(circles) | 128,879 | 34 |

![buffer small](assets\bun/buffer-small.svg)
![buffer large](assets\bun/buffer-large.svg)

### buffer-zero-copy

| Library | small (ops/s) | large (ops/s) |
| -- | --: | --: |
| es-toolkit.cloneDeep | 580,793 | 562,046 |
| lodash.cloneDeep | 477,589 | 478,323 |

![buffer-zero-copy small](assets\bun/buffer-zero-copy-small.svg)
![buffer-zero-copy large](assets\bun/buffer-zero-copy-large.svg)

### map-set

| Library | small (ops/s) | large (ops/s) |
| -- | --: | --: |
| @ungap/structured-clone | 64,061 | 7,101 |
| clone | 201,326 | 16,371 |
| clone(circular) | 135,527 | 19,386 |
| core-js/structured-clone | 25,739 | 2,849 |
| deepcopy | 37,610 | 4,016 |
| es-toolkit.cloneDeep | 73,760 | 11,108 |
| fast-copy | 171,097 | 26,450 |
| just-clone | 59,867 | 5,916 |
| klona | 138,560 | 18,890 |
| lodash.cloneDeep | 65,620 | 4,988 |
| nano-copy | 48,984 | 7,363 |
| nanoclone | 85,234 | 10,854 |
| rfdc | 52,832 | 5,002 |
| rfdc(circles) | 55,345 | 5,182 |
| structuredClone | 60,182 | 6,782 |

![map-set small](assets\bun/map-set-small.svg)
![map-set large](assets\bun/map-set-large.svg)
