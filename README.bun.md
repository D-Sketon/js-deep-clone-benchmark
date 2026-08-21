# JS Deep Clone Benchmark for Bun

This is a benchmark for JS deep clone libraries for Bun.

## Benchmark Results

for Node please refer to [Node](README.md)

cpu: 13th Gen Intel(R) Core(TM) i5-13400F

runtime: bun 1.4.0 (x64-win32)

### json

| Library | small (ops/s) | large (ops/s) |
| -- | --: | --: |
| @ungap/structured-clone | 36,751 | 3,392 |
| clone | 27,559 | 526 |
| clone-deep | 71,551 | 1,087 |
| clone(circular) | 24,673 | 4,163 |
| copy-anything | 36,701 | 633 |
| core-js/structured-clone | 15,894 | 2,079 |
| deepcopy | 13,079 | 1,560 |
| es-toolkit.cloneDeep | 44,437 | 6,825 |
| fast-copy | 61,437 | 15,934 |
| fastest-json-copy | 116,904 | 2,212 |
| JSON.stringify/parse | 49,458 | 891 |
| jsondiffpatch.clone | 96,953 | 1,532 |
| just-clone | 23,774 | 405 |
| klona | 84,990 | 1,490 |
| klona/json | 96,583 | 1,643 |
| klona/lite | 86,722 | 1,461 |
| lodash.cloneDeep | 24,612 | 1,314 |
| nano-copy | 73,484 | 6,697 |
| nanoclone | 79,342 | 8,474 |
| plain-object-clone | 33,649 | 570 |
| ramda.clone | 11,218 | 714 |
| rfdc | 43,499 | 755 |
| rfdc(circles) | 43,260 | 742 |
| structuredClone | 37,456 | 3,621 |

![json small](assets/bun/json-small.svg)
![json large](assets/bun/json-large.svg)

### json-circular

| Library | small (ops/s) | large (ops/s) |
| -- | --: | --: |
| @ungap/structured-clone | 497,764 | 689 |
| clone(circular) | 1,025,870 | 317 |
| core-js/structured-clone | 439,777 | 301 |
| deepcopy | 497,434 | 287 |
| es-toolkit.cloneDeep | 1,794,500 | 1,313 |
| fast-copy | 5,300,263 | 3,077 |
| lodash.cloneDeep | 1,014,870 | 60 |
| nano-copy | 4,233,332 | 2,759 |
| nanoclone | 2,751,828 | 1,950 |
| ramda.clone | 357,821 | 63 |
| rfdc(circles) | 4,131,779 | 1,193 |
| structuredClone | 512,315 | 701 |

![json-circular small](assets/bun/json-circular-small.svg)
![json-circular large](assets/bun/json-circular-large.svg)

### regexp

| Library | small (ops/s) | large (ops/s) |
| -- | --: | --: |
| @ungap/structured-clone | 79,272 | 10,692 |
| clone | 64,828 | 961 |
| clone-deep | 130,782 | 1,233 |
| clone(circular) | 60,648 | 5,719 |
| core-js/structured-clone | 43,051 | 5,032 |
| deepcopy | 34,421 | 3,464 |
| es-toolkit.cloneDeep | 108,703 | 11,362 |
| fast-copy | 120,040 | 11,834 |
| jsondiffpatch.clone | 100,893 | 1,454 |
| just-clone | 85,419 | 1,308 |
| klona | 183,041 | 2,627 |
| klona/lite | 184,274 | 2,630 |
| lodash.cloneDeep | 38,541 | 2,616 |
| nano-copy | 220,459 | 18,005 |
| nanoclone | 261,512 | 19,091 |
| ramda.clone | 43,845 | 4,061 |
| rfdc(with RegExp) | 144,393 | 2,118 |
| structuredClone | 80,026 | 10,893 |

![regexp small](assets/bun/regexp-small.svg)
![regexp large](assets/bun/regexp-large.svg)

### date

| Library | small (ops/s) | large (ops/s) |
| -- | --: | --: |
| @ungap/structured-clone | 55,442 | 15,423 |
| clone | 66,139 | 861 |
| clone-deep | 107,117 | 1,107 |
| clone(circular) | 58,993 | 8,296 |
| core-js/structured-clone | 18,881 | 3,114 |
| deepcopy | 19,219 | 3,954 |
| es-toolkit.cloneDeep | 84,621 | 23,453 |
| fast-copy | 148,577 | 18,911 |
| jsondiffpatch.clone | 121,200 | 2,259 |
| just-clone | 48,109 | 971 |
| klona | 80,184 | 1,574 |
| klona/lite | 76,551 | 1,546 |
| lodash.cloneDeep | 26,606 | 2,647 |
| nano-copy | 80,256 | 21,086 |
| nanoclone | 93,377 | 24,021 |
| ramda.clone | 21,093 | 3,870 |
| rfdc | 95,010 | 1,708 |
| rfdc(circles) | 93,953 | 1,707 |
| structuredClone | 54,069 | 15,453 |

![date small](assets/bun/date-small.svg)
![date large](assets/bun/date-large.svg)

### custom-class

| Library | small (ops/s) | large (ops/s) |
| -- | --: | --: |
| clone | 784,777 | 2,317 |
| clone(circular) | 672,830 | 1,373 |
| es-toolkit.cloneDeep | 962,993 | 2,693 |
| fast-copy | 1,377,131 | 3,908 |
| klona | 2,262,869 | 6,792 |
| klona/lite | 2,378,805 | 6,922 |
| lodash.cloneDeep | 656,696 | 366 |
| nano-copy | 2,758,116 | 7,854 |
| ramda.clone | 250,187 | 375 |
| rfdc(with Custom Classes) | 2,052,376 | 4,617 |

![custom-class small](assets/bun/custom-class-small.svg)
![custom-class large](assets/bun/custom-class-large.svg)

### array-buffer

| Library | small (ops/s) | large (ops/s) |
| -- | --: | --: |
| @ungap/structured-clone | 38,074 | 18 |
| core-js/structured-clone | 51,557 | 128 |
| es-toolkit.cloneDeep | 64,906 | 37 |
| fast-copy | 90,922 | 100 |
| klona | 87,165 | 105 |
| nano-copy | 67,713 | 115 |
| rfdc(with ArrayBuffer) | 67,441 | 121 |
| structuredClone | 41,375 | 16 |

![array-buffer small](assets/bun/array-buffer-small.svg)
![array-buffer large](assets/bun/array-buffer-large.svg)

### buffer

| Library | small (ops/s) | large (ops/s) |
| -- | --: | --: |
| clone | 136,153 | 137 |
| clone(circular) | 131,346 | 142 |
| deepcopy | 47,931 | 70 |
| klona | 138,828 | 127 |
| nano-copy | 136,750 | 136 |
| rfdc | 142,955 | 138 |
| rfdc(circles) | 147,757 | 136 |

![buffer small](assets/bun/buffer-small.svg)
![buffer large](assets/bun/buffer-large.svg)

### buffer-zero-copy

| Library | small (ops/s) | large (ops/s) |
| -- | --: | --: |
| es-toolkit.cloneDeep | 782,057 | 821,810 |
| lodash.cloneDeep | 646,036 | 661,158 |

![buffer-zero-copy small](assets/bun/buffer-zero-copy-small.svg)
![buffer-zero-copy large](assets/bun/buffer-zero-copy-large.svg)

### map-set

| Library | small (ops/s) | large (ops/s) |
| -- | --: | --: |
| @ungap/structured-clone | 90,574 | 9,788 |
| clone | 266,253 | 32,864 |
| clone(circular) | 241,599 | 25,775 |
| core-js/structured-clone | 46,099 | 5,230 |
| deepcopy | 49,601 | 5,129 |
| es-toolkit.cloneDeep | 213,890 | 24,154 |
| fast-copy | 337,568 | 33,538 |
| just-clone | 87,981 | 16,714 |
| klona | 232,693 | 40,525 |
| lodash.cloneDeep | 94,685 | 7,124 |
| nano-copy | 139,868 | 13,933 |
| nanoclone | 293,362 | 30,974 |
| rfdc | 78,399 | 9,771 |
| rfdc(circles) | 79,213 | 9,337 |
| structuredClone | 90,130 | 9,737 |

![map-set small](assets/bun/map-set-small.svg)
![map-set large](assets/bun/map-set-large.svg)
