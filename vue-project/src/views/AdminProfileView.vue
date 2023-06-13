<template>
    <div> 
        <NavBarItem></NavBarItem>
        <table>
            <thead>
                <tr>
                    <th>Username</th>
                    <th>Role</th>
                    <th>Purchases</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                    <tr v-for="user in users" :key="user.username">
                        <td> {{ user.username }}</td>
                        <td> {{user.role }}</td>
                    </tr>    
             </tbody>
        </table>
    </div>
</template>

<script lang="ts">
import NavBarItem from '@/components/NavBarItem.vue';
import { getUsers } from '@/service/AdminService';
import { ref, onMounted } from 'vue';
import { getUserRole } from '@/components/TokenItem.vue';
import { useRouter } from 'vue-router';
import { defineComponent } from 'vue';

interface User {
  username: string;
  role: string;
}

export default defineComponent({
  components: {
    NavBarItem,
  },
  setup() {
    const router = useRouter();
    const isAdmin = getUserRole() === 'ADMIN';

    if (!isAdmin) {
      router.push('/library/books');
      console.log('Redirected to non-admin page');
    }

    const users = ref<User[]>([]);

    const fetchUsers = async () => {
      try {
        console.log('Sending request to retrieve users...');
        const response = await getUsers();
        console.log('Users retrieved successfully:', response);
        users.value = response.data;
        console.log('Users set in component:', users.value);
      } catch (error) {
        console.error('An error occurred while retrieving users:', error);
      }
    };
    const getUsersPromise = new Promise<void>((resolve, reject) => {
      onMounted(async () => {
        try {
          await fetchUsers();
          resolve();
        } catch (error) {
          reject(error);
        }
      });
    });

    return {
         users,
         isAdmin,
         getUsersPromise,
    };
  },
});
</script>