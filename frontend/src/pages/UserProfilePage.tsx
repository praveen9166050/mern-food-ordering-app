import { useGetMyUser, useUpdateMyUser } from "@/api/MyUserApi";
import UserProfileForm from "@/forms/user-profile-form/UserProfileForm";

function UserProfilePage() {
  const {currentUser, isLoading: isGetLoading} = useGetMyUser();
  const {updateUser, isLoading: isUpdateLoading} = useUpdateMyUser();
  if (isGetLoading) {
    return <>Loading...</>;
  }
  if (!currentUser) {
    return <>Unable to load user profile</>;
  }
  return (
    <UserProfileForm currentUser={currentUser} onSave={updateUser} isLoading={isUpdateLoading} />
  )
}

export default UserProfilePage;