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
                    <tr v-for="user  in users" :key="user.username">
                        <td> {{ user.username }}</td>
                        <td> {{user.role }}</td>
                        <td>{{ countPurchases(user.purchases) }}</td>
                        <td>
                            <button @click="promoteUser(user.username)">Promote</button>
                            <button @click="deleteUser(user.username)">Delete</button>
                        </td>
                    </tr>    
             </tbody>
        </table>
    </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue';
import NavBarItem from '@/components/NavBarItem.vue';
import { getUsers, promoteUser as promoteUserRequest, deleteUser as deleteUserRequest } from '@/service/AdminService';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { isAdmin } from '@/utils/isAdmin';


interface User {
  username: string;
  role: string;
  purchases?: {
    title: string;
    author: string;
    quantity: string;
  }[];
}

export default defineComponent({
  components: {
    NavBarItem,
  },
  setup() {
    const router = useRouter();

    if (!isAdmin()) {
      router.push('/library/books');
      console.log('Redirected to non-admin page');
    }

    const users = ref<User[]>([]);

    const fetchUsers = async () => {
      try {
        console.log('Sending request to retrieve users...');
        const response = await getUsers();
        console.log('Users retrieved successfully:', response);
        users.value = response.users;
        console.log('Users set in component:', users.value);
      } catch (error) {
        console.error('An error occurred while retrieving users:', error);
      }
    };

    const countPurchases = (purchases?: User['purchases']): number => {
      if (!purchases || purchases.length === 0) {
        return 0;
      }
      return purchases.length;
    };

    const promoteUser = async (username: string) => {
      try {
        console.log(`Promoting user: ${username}`);
        await promoteUserRequest(username);
        console.log(`User ${username} promoted successfully`);
        
        await fetchUsers();
      } catch (error) {
        console.error(`An error occurred while promoting user ${username}:`, error);
      }
    };
    
    const deleteUser = async (username: string) => {
      try {
        console.log(`Deleting user: ${username}`);
        await deleteUserRequest(username);
        console.log(`User ${username} promoted successfully`);
        
        await fetchUsers();
      } catch (error) {
        console.error(`An error occurred while deleting user ${username}:`, error);
      }
    };
    onMounted(fetchUsers)

    return {
         users,
         isAdmin,
         promoteUser,
         deleteUser,
         countPurchases
    };
  },
});
</script>