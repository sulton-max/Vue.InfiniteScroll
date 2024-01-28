## Repository

This repository is demo of how to create infinite scroll in Vue framework from scratch

### What is Infinite Scroll ?

We have different patterns for loading endless data for efficiently without affecting user experience, 
following are 2 most common ones

**Virtual Scroll**



**Infinite Scroll**



## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (which includes [npm](http://npmjs.com/))

### Installing

To get a development environment running, follow these steps:

## Creating Virtual Scroll from scratch

#### Requirements

- infinite scroll component should emit an event when the scroll reaches page bottom
- getting next page of data
- getting minimum height

### Implementation

#### Calculating scroll position

- create `isDocumentScrolledToBottom` method in `DocumentService`
- calculate window scroll position and also minimum space to consider

```TTypescript
    public isDocumentScrolledToBottom(minimumSpace: number = 0) {
        const scrollPosition = window.innerHeight + window.scrollY;
        const threshold = document.body.offsetHeight - (minimumSpace || 0);
        return scrollPosition >= threshold;
    }
```

- add event listeners to calculate scroll position on scroll event

`DocumentService.ts` : 

```TTypescript
    public addEventListener(element: HTMLElement, eventName: string, callback: (event: HTMLElement) => void): void {
        element.addEventListener(eventName, (event: Event) => callback(event.target as HTMLElement));
    }

    public removeEventListener(element: HTMLElement, eventName: string, callback: (event: HTMLElement) => void): void {
        element.removeEventListener(eventName, (event: Event) => callback(event.target as HTMLElement));
    }
```

`InfiniteScroll.vue` : 

```TTypscript
onMounted(() => {
    if (!scrollContainer.value) return;

    documentService.addEventListener(window, "scroll", onScroll);
});

onUnmounted(() => {
    if (!scrollContainer.value) return;

    documentService.removeEventListener(window, "scroll", onScroll);
});
```

#### Getting next page of data

- add `FilterPagination` props to contain filter model inside infinite scroll component

`InfiniteScroll.vue` :

```TTypscript
const props = defineProps({
    filter: {
        type: Object as () => FilterPagination,
        required: true
    },
    scrollThresholdDistance: {
        type: Number as PropType<number>,
        required: false,
        default: 0
    }
});
```

- add scroll event handler

```TTypscript
const onScroll = () => {
    if(documentService.isDocumentScrolledToBottom(props.scrollThresholdDistance))
    {
        props.filter.pageToken++;
        emit("onScroll", props.filter);
    }
};
```

#### Getting minimum height

- we can calculate minimum height from one of the items using `ref`

```HTML
<template>
    <infinite-scroll :scroll-threshold-distance="400"
                     :source="loadNext"
                     :filter="filter"
                     @on-scroll="onScroll"
                     class="mt-[160px] grid grid-cols-1 p-20 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-4 place-items-center">

        <!-- Location card -->
        <test-card v-for="i in items" :key="i" ref="contentItems"/>

    </infinite-scroll>
</template>

<script setup lang="ts">
    import {onMounted, ref} from "vue";
    import InfiniteScroll from "@/common/components/InfiniteScroll.vue";
    import TestCard from "@/common/components/TestCard.vue";
    
    const minimumScrollThresholdDistance = ref<number>(0);
    
    onMounted(() => {
        if (contentItems.value?.length > 0) {
            // Compute minimal scroll distance if elements are loaded
            minimumScrollThresholdDistance.value = documentService.getHeight(contentItems.value[0]);
        }
    });

</script>

```

