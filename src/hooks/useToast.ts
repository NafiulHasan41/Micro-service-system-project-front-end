import { useCallback } from "react";
import Swal, { SweetAlertIcon } from "sweetalert2";


const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  showCloseButton: true,
  timer: 2500,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  },
});


const useToast = (): ((icon: SweetAlertIcon, title: string) => void) => {
  const showToast = useCallback((icon: SweetAlertIcon, title: string): void => {
    Toast.fire({ icon, title });
  }, []);

  return showToast;
};

export default useToast;
