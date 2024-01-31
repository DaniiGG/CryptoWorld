import { CanActivateFn } from '@angular/router';

export const segundoguardGuard: CanActivateFn = (route, state) => {

  console.log("puedo pasar?")
  return true;
};
