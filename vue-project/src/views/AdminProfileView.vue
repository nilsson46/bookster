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
                          <button v-if="!isAdminRole(user)" @click="showPromoteModal(user)">Promote</button>
                          <button @click="showDeleteModal(user)">Delete</button>
                        </td>
                    </tr>    
             </tbody>
        </table>
        <ConfirmationModal
      v-if="showModal"
      :modalTitle="modalTitle"
      :modalMessage="modalMessage"
      @proceed="handleProceed"
      @cancel="handleCancel"
    ></ConfirmationModal>
    </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue';
import NavBarItem from '@/components/NavBarItem.vue';
import { getUsers, promoteUser as promoteUserRequest, deleteUser as deleteUserRequest } from '@/service/AdminService';
import ConfirmationModal from '../components/ProccedModal.vue';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { isAdmin } from '@/utils/isAdmin';
import type { User } from '@/model/user';




export default defineComponent({
  components: {
    NavBarItem,
    ConfirmationModal
    
  },
  setup() {
    const router = useRouter();
    //TODO Put this in a service? 
    //Redirecting if user arent admin.
    if (!isAdmin()) {
      router.push('/library/books');
      console.log('Redirected to non-admin page');
    }

    const isAdminRole = (user: User): boolean => {
      return user.role === 'ADMIN';
    };

    const users = ref<User[]>([]);
      const showModal = ref(false);
    const modalTitle = ref('');
    const modalMessage = ref('');
    const userForAction = ref<User | null>(null);

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

    const showPromoteModal = (user: User): void => {
      userForAction.value = user;
      modalTitle.value = `Promote "${user.username}"`;
      modalMessage.value = `Are you sure you want to promote "${user.username}"?`;
      showModal.value = true;
    };

    const showDeleteModal = (user: User): void => {
      userForAction.value = user;
      modalTitle.value = `Delete "${user.username}"`;
      modalMessage.value = `Are you sure you want to delete "${user.username}"?`;
      showModal.value = true;
    };

    const handleProceed = (): void => {
      if (modalTitle.value.startsWith('Promote')) {
        if (userForAction.value) {
          promoteUser(userForAction.value.username);
        }
      } else if (modalTitle.value.startsWith('Delete')) {
        if (userForAction.value) {
          deleteUser(userForAction.value.username);
        }
      }

      showModal.value = false;
      userForAction.value = null;
    };

    const handleCancel = (): void => {
      showModal.value = false;
      userForAction.value = null;
    };
    onMounted(fetchUsers)

    return {
         users,
         isAdmin,
         promoteUser,
         deleteUser,
         countPurchases,
         showModal,
        modalTitle,
        modalMessage,
        showPromoteModal,
        showDeleteModal,
        handleProceed,
        handleCancel,
        isAdminRole
    };
  },
});
</script>
