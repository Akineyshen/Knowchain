<script setup lang="ts">
  import { useLearnPath } from './LearnPath'
  import LessonNode from "@/components/learn/LessonNode/LessonNode.vue";

  const { computedNodes } = useLearnPath()
</script>

<template>
  <div class="learn-path">
    <svg class="learn-path__svg" width="346" height="1081" viewBox="0 0 346 1081" fill="none" xmlns="http://www.w3.org/2000/svg" >
      <g clip-path="url(#clip0_1653_1597)"> <mask id="mask0_1653_1597" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="346" height="1081" >
        <path d="M346 0H0V1081H346V0Z" fill="white" />
      </mask> <g mask="url(#mask0_1653_1597)">
        <path d="M66 27H186" stroke="#005CF1" stroke-width="6" stroke-linecap="round" stroke-dasharray="16 16" />
        <path d="M133 484H253" stroke="#005CF1" stroke-width="6" stroke-linecap="round" stroke-dasharray="16 16" />
        <path d="M246.274 27H287C304.673 26.9999 319 41.3268 319 59V111C319 128.673 304.673 143 287 143H158" stroke="#005CF1" stroke-width="6" stroke-linecap="square" stroke-dasharray="16 16" />
        <path d="M99 143H38.9999C21.3268 143 7 157.327 7 175V225C7 242.673 21.3269 257 39 257H59.2604" stroke="#005CF1" stroke-width="6" stroke-linecap="square" stroke-dasharray="16 16" />
        <path d="M112 370H168C185.673 370 200 355.673 200 338V289C200 271.327 185.673 257 168 257H112" stroke="#005CF1" stroke-width="6" stroke-linecap="square" stroke-dasharray="12 12" />
        <path d="M120 1054H278C295.673 1054 310 1039.67 310 1022V973C310 955.327 295.673 941 278 941H222" stroke="#005CF1" stroke-width="6" stroke-linecap="square" stroke-dasharray="12 12" />
        <path d="M178 828H234C251.673 828 266 813.673 266 796V747C266 729.327 251.673 715 234 715H178" stroke="#005CF1" stroke-width="6" stroke-linecap="square" stroke-dasharray="12 12" />
        <path d="M53.7536 370H34.9999C17.3269 370 3.00001 384.327 3.00001 402L3 451C3 468.673 17.3269 483 35 483H106" stroke="#005CF1" stroke-width="6" stroke-linecap="round" stroke-dasharray="16 16" />
        <path d="M138.594 828H40.9999C23.3268 828 8.99991 842.327 8.9999 860L8.99988 909C8.99988 926.673 23.3268 941 40.9999 941H196" stroke="#005CF1" stroke-width="6" stroke-linecap="round" stroke-dasharray="16 16" />
        <path d="M293.886 483H311C328.673 483 343 497.327 343 515V568C343 585.673 328.673 600 311 600H191" stroke="#005CF1" stroke-width="6" stroke-linecap="round" stroke-dasharray="16 16" />
        <path d="M128 600H92C74.3269 600 60 614.327 60 632V683C60 700.673 74.3269 715 92 715H128" stroke="#005CF1" stroke-width="6" stroke-linecap="round" stroke-dasharray="16 16" />
      </g> </g>
      <defs>
        <clipPath id="clip0_1653_1597">
          <rect width="346" height="1081" fill="white" />
        </clipPath>
      </defs>
    </svg>

    <div
        v-for="(node, i) in computedNodes"
        :key="i"
        class="learn-path__node"
        :style="{ top: `${node.y}px`, left: `${node.x}px` }"
    >
      <LessonNode
          :status="node.status"
          :course-id="node.courseId"
      >
        {{ node.label }}
      </LessonNode>
    </div>

  </div>
</template>

<style scoped lang="scss" src="./LearnPath.scss" />