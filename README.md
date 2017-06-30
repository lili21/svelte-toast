# svelte-toast
> a simple toast wirten by svelte

### Demo

[svelte-toast.surge.sh](https://svelte-toast.surge.sh/)

### Installation

```
yarn add svelte-toast
```

### Usage

```
import Toast from 'svelte-toast'

const toast = new Toast([opts])
toast.show('Hello Svelte'[, opts])
toast.info('Hello Svelte'[, opts])
toast.success('Hello Svelte'[, opts])
toast.error('Hello Svelte'[, opts])
```

### Options

option | description | values | default
------ | ----------- | ------ | -------
position | position of toast | 'top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right' | 'bottom-center'
duration | display time of toast | in millisecond | 2000

### Lisence

MIT