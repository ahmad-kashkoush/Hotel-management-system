import useLogout from "@/features/authentication/useLogout";
import { ButtonIcon, SpinnerMini } from "@/ui";
import { HiArrowRightEndOnRectangle } from "react-icons/hi2";

function Logout() {
  const { logout, isLoading } = useLogout();
  return (
    <ButtonIcon disabled={isLoading} onClick={() => logout()}>
      {isLoading ? <SpinnerMini /> : <HiArrowRightEndOnRectangle />}
    </ButtonIcon>
  );
}
export default Logout;
