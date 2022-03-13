<template>
  <div>
    <h1>Edit Article</h1>
    <article-form :article="article" action="update"></article-form>
  </div>
</template>

<script>
import ArticleForm from '@/components/ArticleForm.vue'

import { mapGetters } from 'vuex'

export default {
  name: 'AritcleEditView',
  components: { ArticleForm },
  data() {
    return {
      article: {
        pk: this.article.pk,
        title: this.article.title,
        content: this.article.content,
      }
    }
  },
  computed: {
    ...mapGetters(['article']),
  },
}
</script>

<style>

</style>