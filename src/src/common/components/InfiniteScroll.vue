<template>
        <!-- Scroll container -->
        <div ref="scrollContainer">
            <slot v-bind="$attrs"></slot>
        </div>
</template>

<script setup lang="ts">

import {defineProps, defineEmits, onMounted, onUnmounted, ref, watch, type PropType, type Ref} from 'vue';
import {DocumentService} from "@/infrastructure/services/DocumentService";

const documentService = new DocumentService();
const scrollContainer = ref<HTMLDivElement>();

const emit = defineEmits(['onScroll']);

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

onMounted(() => {
    if (!scrollContainer.value) return;

    documentService.addEventListener(window, "scroll", onScroll);
});

onUnmounted(() => {
    if (!scrollContainer.value) return;

    documentService.removeEventListener(window, "scroll", onScroll);
});

const onScroll = () => {
    if(documentService.isDocumentScrolledToBottom(props.scrollThresholdDistance))
    {
        props.filter.pageToken++;
        emit("onScroll", props.filter);
    }
};

</script>