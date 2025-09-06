import { inject, Injector, PLATFORM_ID, runInInjectionContext } from "@angular/core";
import { StorageFacade } from "../facades/storage.facade";
import { LoadingSpinnerFacade } from "../facades/loading.spinner.facade";
import { isPlatformBrowser } from "@angular/common";

export const WithAuthGuard = async (): Promise<boolean> => {
    const injector = inject(Injector);

    return runInInjectionContext(injector, async () => {
        const storageFacade = inject(StorageFacade);
        const loadingSpinnerFacade = inject(LoadingSpinnerFacade);
        const platformId = inject(PLATFORM_ID);

        loadingSpinnerFacade.Show();
        const user = await storageFacade.GetUserData();

        if (user === null && !isPlatformBrowser(platformId))
            return true;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const emailValid = emailRegex.test(user?.email ?? '');

        if (emailValid) {
            return true;
        } else {
            if (isPlatformBrowser(platformId)) {
                window.location.href = 'login';
            }
            return false;
        }
    });
};