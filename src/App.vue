<template>
  <div class="App container">
    <h2>GitHub User Search</h2>
    <div class="search-control">
      <label for="keyword" class="form-label">User name: </label>
      <input type="text" class="form-control" id="keyword" @input="handleSearchUser" />
    </div>
    <div v-if="fetchError">Error occured... try again later!</div>
    <div v-else-if="isLoading">Loading...</div>
    <div v-else>
      <List :users="users" />
    </div>
  </div>
</template>

<script lang="ts">
import List from './components/List.vue'
import UserService from './services/userService'

export type UserType = {
  login: string
  name: string
  location: string
  email: string
  company: string
  avatarUrl: string
}

export type EdgeType = {
  node: UserType
}

export default {
  components: {
    List: List,
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  data() {
    return {
      users: [] as UserType[],
      fetchError: false,
      isLoading: false,
    }
  },
  methods: {
    async handleSearchUser(event: Event): Promise<void> {
      this.isLoading = true
      try {
        const target = <HTMLInputElement>event.target
        const response = await UserService.searchUsers(target.value)
        const { search } = response.data.data
        const filteredUsers: UserType[] = search.edges
          .filter((edge: EdgeType) => {
            return edge.node.login
          })
          .map((edge: { node: UserType }) => {
            return edge.node
          })
        this.users = filteredUsers
        this.fetchError = false
      } catch (error) {
        this.fetchError = true
      } finally {
        this.isLoading = false
      }
    },
  },
}
</script>
<style lang="scss">
html {
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: inherit;
}

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu',
    'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.App {
  padding: 10px;
  &.container {
    width: 80%;
    margin: 0 auto;
  }

  h2 {
    text-align: center;
  }

  .search-control {
    margin: 50px 0;

    input {
      padding: 5px 10px;
      border-radius: 4px;
      width: 100%;
    }
  }
}
</style>
