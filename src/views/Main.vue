<template>
  <div id="main">
    <PageHeader />
    <PageSider :theme="this.$store.state.siderStyle" />
    <PageContent>
      <template v-slot:content-bar>
        <ContentBar />
      </template>
      <template v-slot:content-map>
        <router-view />
      </template>
    </PageContent>

    <InfoBox />
    <ModalBox />
    <Popups>
      <HeatmapPopups />
    </Popups>
  </div>
</template>

<script>
import PageHeader from "@/components/content/PageHeader";
import PageSider from "@/components/content/PageSider";
import PageContent from "@/components/content/PageContent";

import InfoBox from "@/components/content/InfoBox";
import ModalBox from "@/components/content/ModalBox";

import Popups from '@/components/common/Popups';
import HeatmapPopups from '@/components/content/HeatmapPopups'

import ContentBar from '@/components/content/ContentBar';

export default {
  name: "Main",
  components: {
    PageHeader,
    PageSider,
    PageContent,

    InfoBox,
    ModalBox,

    Popups,
    HeatmapPopups,

    ContentBar,
  },
};
</script>

<style>
</style>