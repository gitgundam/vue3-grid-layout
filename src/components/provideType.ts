import type {ComputedRef, InjectionKey} from 'vue'
import {GridLayoutOptions} from "@/components/type";
import {computed} from "vue";

export const optionsKey = Symbol() as InjectionKey<GridLayoutOptions>

export const colWidthKey = Symbol() as InjectionKey<ComputedRef<number>>

