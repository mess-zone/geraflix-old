import { MaybeRefOrGetter, toValue } from "@vueuse/core"
import { ref } from "vue"
import { v4 as uuidV4 } from 'uuid'

interface Toast {
    id?: string,
    message: string,
}

const toasts = ref<Toast[]>([])

export function useToasts() {

    function addToast(toast: MaybeRefOrGetter<Toast>) {
        const t = toValue(toast)
        t.id = uuidV4()
        toasts.value.push(t)

        setTimeout(()=> {
            const index = toasts.value.indexOf(t);

            toasts.value.splice(index, 1);
        }, 7000)
    }

    return {
        toasts,
        addToast,
    }
}