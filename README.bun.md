# JS Deep Clone Benchmark for Bun

This is a benchmark for JS deep clone libraries for Bun.

## Benchmark Results

for Node please refer to [Node](README.md)

cpu: 13th Gen Intel(R) Core(TM) i5-13400F

runtime: bun 1.3.0 (x64-win32)

### json

| Library | small (ops/s) | large (ops/s) |
| -- | --: | --: |
| @ungap/structured-clone | 28,345 | 2,747 |
| clone | 31,101 | 308 |
| clone-deep | 150,820 | 826 |
| clone(circular) | 28,250 | 1,790 |
| copy-anything | 43,060 | 408 |
| core-js/structured-clone | 12,245 | 1,474 |
| deepcopy | 11,377 | 1,015 |
| es-toolkit.cloneDeep | 53,749 | 2,887 |
| fast-copy | 160,047 | 4,024 |
| fastest-json-copy | 285,854 | 1,487 |
| JSON.stringify/parse | 38,982 | 759 |
| just-clone | 20,998 | 352 |
| klona | 60,971 | 1,109 |
| klona/json | 74,405 | 1,214 |
| klona/lite | 65,302 | 1,103 |
| lodash.cloneDeep | 19,839 | 2,018 |
| nano-copy | 56,182 | 4,747 |
| nanoclone | 68,364 | 8,319 |
| plain-object-clone | 27,169 | 492 |
| ramda.clone | 9,120 | 595 |
| rfdc | 34,981 | 628 |
| rfdc(circles) | 33,000 | 568 |
| structuredClone | 27,598 | 2,847 |

![json small](assets\bun/json-small.svg)
![json large](assets\bun/json-large.svg)

### json-circular

| Library | small (ops/s) | large (ops/s) |
| -- | --: | --: |
| @ungap/structured-clone | 340,413 | 536 |
| clone(circular) | 437,027 | 213 |
| core-js/structured-clone | 329,170 | 231 |
| deepcopy | 306,931 | 248 |
| es-toolkit.cloneDeep | 798,850 | 1,071 |
| fast-copy | 974,717 | 2,723 |
| lodash.cloneDeep | 497,914 | 520 |
| nano-copy | 1,141,075 | 2,445 |
| nanoclone | 2,002,099 | 1,754 |
| ramda.clone | 247,898 | 52 |
| rfdc(circles) | 1,194,002 | 1,005 |
| structuredClone | 357,232 | 574 |

![json-circular small](assets\bun/json-circular-small.svg)
![json-circular large](assets\bun/json-circular-large.svg)

### regexp

| Library | small (ops/s) | large (ops/s) |
| -- | --: | --: |
| @ungap/structured-clone | 55,564 | 8,829 |
| clone | 60,978 | 762 |
| clone-deep | 50,937 | 554 |
| clone(circular) | 56,620 | 6,108 |
| core-js/structured-clone | 28,614 | 2,935 |
| deepcopy | 21,249 | 2,256 |
| es-toolkit.cloneDeep | 60,935 | 6,766 |
| fast-copy | 65,413 | 7,387 |
| just-clone | 72,801 | 1,076 |
| klona | 68,776 | 1,010 |
| klona/lite | 72,545 | 1,051 |
| lodash.cloneDeep | 24,022 | 2,021 |
| nano-copy | 162,036 | 14,950 |
| nanoclone | 223,762 | 18,544 |
| ramda.clone | 26,346 | 2,403 |
| rfdc(with RegExp) | 64,524 | 956 |
| structuredClone | 59,664 | 8,979 |

![regexp small](assets\bun/regexp-small.svg)
![regexp large](assets\bun/regexp-large.svg)

### date

| Library | small (ops/s) | large (ops/s) |
| -- | --: | --: |
| @ungap/structured-clone | 45,279 | 14,323 |
| clone | 51,950 | 761 |
| clone-deep | 62,781 | 933 |
| clone(circular) | 45,270 | 6,206 |
| core-js/structured-clone | 12,436 | 2,287 |
| deepcopy | 14,711 | 3,342 |
| es-toolkit.cloneDeep | 45,229 | 16,481 |
| fast-copy | 68,718 | 17,798 |
| just-clone | 44,538 | 774 |
| klona | 65,251 | 1,232 |
| klona/lite | 61,848 | 1,215 |
| lodash.cloneDeep | 22,361 | 3,833 |
| nano-copy | 62,714 | 18,313 |
| nanoclone | 80,656 | 21,071 |
| ramda.clone | 16,525 | 3,484 |
| rfdc | 71,709 | 1,207 |
| rfdc(circles) | 73,155 | 1,292 |
| structuredClone | 43,298 | 14,307 |

![date small](assets\bun/date-small.svg)
![date large](assets\bun/date-large.svg)

### custom-class

| Library | small (ops/s) | large (ops/s) |
| -- | --: | --: |
| clone | 602,347 | 1,812 |
| clone(circular) | 583,751 | 1,052 |
| es-toolkit.cloneDeep | 764,383 | 1,907 |
| fast-copy | 974,676 | 3,780 |
| klona | 1,855,459 | 5,603 |
| klona/lite | 1,732,505 | 5,195 |
| lodash.cloneDeep | 578,444 | 1,412 |
| nano-copy | 1,651,120 | 6,318 |
| ramda.clone | 198,985 | 340 |
| rfdc(with Custom Classes) | 1,396,857 | 3,479 |

![custom-class small](assets\bun/custom-class-small.svg)
![custom-class large](assets\bun/custom-class-large.svg)

### array-buffer

| Library | small (ops/s) | large (ops/s) |
| -- | --: | --: |
| @ungap/structured-clone | 18,094 | 7 |
| core-js/structured-clone | 28,162 | 31 |
| es-toolkit.cloneDeep | 27,393 | 20 |
| fast-copy | 26,313 | 31 |
| klona | 26,052 | 31 |
| nano-copy | 25,840 | 32 |
| rfdc(with ArrayBuffer) | 25,522 | 31 |
| structuredClone | 17,677 | 7 |

![array-buffer small](assets\bun/array-buffer-small.svg)
![array-buffer large](assets\bun/array-buffer-large.svg)

### buffer

| Library | small (ops/s) | large (ops/s) |
| -- | --: | --: |
| clone | 117,398 | 33 |
| clone(circular) | 116,710 | 33 |
| deepcopy | 40,388 | 17 |
| klona | 125,146 | 34 |
| nano-copy | 120,330 | 34 |
| rfdc | 129,427 | 34 |
| rfdc(circles) | 122,546 | 34 |

![buffer small](assets\bun/buffer-small.svg)
![buffer large](assets\bun/buffer-large.svg)

### buffer-zero-copy

| Library | small (ops/s) | large (ops/s) |
| -- | --: | --: |
| es-toolkit.cloneDeep | 524,217 | 536,371 |
| lodash.cloneDeep | 485,449 | 485,692 |

![buffer-zero-copy small](assets\bun/buffer-zero-copy-small.svg)
![buffer-zero-copy large](assets\bun/buffer-zero-copy-large.svg)

### map-set

| Library | small (ops/s) | large (ops/s) |
| -- | --: | --: |
| @ungap/structured-clone | 63,010 | 6,696 |
| clone | 198,363 | 16,665 |
| clone(circular) | 135,053 | 19,385 |
| core-js/structured-clone | 26,154 | 2,962 |
| deepcopy | 37,311 | 3,983 |
| es-toolkit.cloneDeep | 76,294 | 10,718 |
| fast-copy | 178,477 | 27,736 |
| just-clone | 50,541 | 6,005 |
| klona | 140,922 | 18,944 |
| lodash.cloneDeep | 64,660 | 5,060 |
| nano-copy | 49,433 | 7,785 |
| nanoclone | 83,704 | 15,162 |
| rfdc | 51,149 | 5,001 |
| rfdc(circles) | 54,419 | 4,791 |
| structuredClone | 59,779 | 7,111 |

![map-set small](assets\bun/map-set-small.svg)
![map-set large](assets\bun/map-set-large.svg)
