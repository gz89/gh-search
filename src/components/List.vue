<template>
  <div class="user-lists">
    <div class="user-list-item" v-for="user in users" :key="user.login">
      <div class="personal-info">
        <img :src="user.avatarUrl" alt="" srcset="" />
        <section>
          <p class="login">Login: {{ user.login }}</p>
          <p class="login">Name: {{ user.name }}</p>
          <p class="login">Email: {{ user.email }}</p>
        </section>
      </div>
      <div class="other-info">
        <p class="login">Location: {{ user.location }}</p>
        <p class="login">Company: {{ user.company }}</p>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { PropType } from 'vue'
import { UserType } from '../App.vue'
export default {
  props: {
    users: Array as PropType<UserType[]>,
  },
}
</script>
<style lang="scss">
.user-lists {
  .user-list-item {
    position: relative;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    min-height: 150px;
    height: max-content;
    padding: 15px 0;
    cursor: pointer;
    border-top: 1px solid grey;

    &:last-child {
      border-bottom: 1px solid grey;
    }

    .personal-info {
      display: flex;

      & img {
        width: 100px;
        object-fit: cover;
      }

      section {
        margin-left: 50px;
      }
    }

    .other-info {
      text-align: right;
    }
  }
}
</style>
