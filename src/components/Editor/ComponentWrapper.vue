<template>
  <div @click="handleClick">
    111
    <component
      class="component"
      :is="config.component"
      :style="getStyle(config.style)"
      :propValue="config.propValue"
      :element="config"
    />
  </div>
</template>

<script>
import { getStyle } from "@/utils/style";
import runAnimation from "@/utils/runAnimation";
import { mixins } from "@/utils/events";
import { getCurrentInstance, onMounted } from "@vue/runtime-core";

export default {
  props: {
    config: {
      type: Object,
      require: true,
    },
  },
  setup(props) {
    const { ctx } = getCurrentInstance();
    onMounted(() => {
      runAnimation(ctx.$el, props.config.animations);
    });
    const handleClick = () => {
      const events = props.config.events;
      Object.keys(events).forEach((event) => {
        ctx[event](events[event]);
      });
    };
    return {
      getStyle,
      handleClick
    };
  },
  mixins: [mixins],
};
</script>

<style lang="scss" scoped>
.component {
  position: absolute;
}
</style>