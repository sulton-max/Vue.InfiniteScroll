<template>

    <!-- Content -->
    <infinite-scroll :scroll-threshold-distance="400"
                    :source="loadNext"
                    :filter="filter"
                    @on-scroll="onScroll"
                    class="grid grid-cols-1 p-20 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-4 place-items-center">

        <!-- Location card -->
        <test-card v-for="i in items" :key="i" ref="contentItems"/>

    </infinite-scroll>

</template>
<script setup lang="ts">
import {onMounted, ref} from "vue";
import {DocumentService} from "@/infrastructure/services/DocumentService";
import InfiniteScroll from "@/common/components/InfiniteScroll.vue";
import TestCard from "@/common/components/TestCard.vue";

const documentService = new DocumentService();

const minimumScrollThresholdDistance = ref<number>(0);
const items = ref<number>(20);
const contentItems = ref<HTMLElement[]>();
const filter = ref<FilterPagination>({
    pageToken: 1,
    pageSize: 20
});

const onScroll = (filter: FilterPagination) => {
    loadNext(filter)
};

onMounted(() => {
    if (contentItems.value?.length > 0) {
        // Compute minimal scroll distance if elements are loaded
        minimumScrollThresholdDistance.value = documentService.getHeight(contentItems.value[0]);
    }
});

const loadNext = (filter: FilterPagination) => {
    items.value += 20;
    console.log('Loading items for page ' + filter.pageToken);
}

</script>